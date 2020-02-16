//MYSQL

const validator = require('validator')
const bcrypt = require('bcryptjs')
const sql = require("./db.js");

// constructor
const User = function (user) {
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
};

// NOTE OK working
User.create = async (newUser, result) => {
    try {
        if (!validator.isEmail(newUser.email))
            throw new Error('Invalid Email address');
        if (newUser.password.length < 7)
            throw new Error('Invalid password size, min 7');

        console.log('create user')
        newUser.password = await bcrypt.hash(newUser.password, 8)
        var resRequest = await sql.query("INSERT INTO users(username,email,password) VALUES (?,?,?)", [newUser.username, newUser.email, newUser.password], (err, res) => {
            if (err) {
                console.log('Error: ', err)
                result(err, null)
                return
            }
        });
        console.log("created user: ", { ...newUser });
        result(null, { message: "created user :" + newUser.username, id: resRequest[0].insertId })
    } catch (err) {
        console.log(err)
        result(err, null)
    }
};

// NOTE OK working
User.findByCredentials = async (email, password, result) => {
    var isPasswordMatch = false;

    try {
        // console.log(password)
        // password = await bcrypt.hash(password, 'OK')
        console.log("Check by request : ", email, password)

        var resRequest = await sql.query(`SELECT * FROM users WHERE email = ?`, [email], (err, res) => {
            if (err) {
                console.log('Error: ', err)
                result(err, null)
                return
            }
        });
        for (const user of resRequest[0]) {
            isPasswordMatch = await bcrypt.compare(password, user.password)
            if (isPasswordMatch) {
                console.log("user: ", user)
                result(null, { id: user.id, username: user.username, email: user.email })
            }
        }
        if (!isPasswordMatch) {
            console.log('No users')
            result(null, null)
        }
    } catch (err) {
        console.log(err)
        result(err, null)
    }
}

// NOTE OK working
User.findByEmail = async (userEmail, result) => {
    try {
        console.log('Search by email : ', userEmail)
        var resRequest = await sql.query(`SELECT * FROM users WHERE email = ?`, [userEmail], (err, res) => {
            if (err) {
                console.log('Error: ', err)
                result(err, null)
                return
            }
        });
        if (resRequest[0].length < 1) {
            console.log('No users')
            result(null, null)
            return
        }
        console.log("users: ", resRequest[0])
        result(null, resRequest[0][0])

    } catch (err) {
        console.log(err)
        result(err, null)
    }
};

// NOTE ok working
User.findById = async (userId, result) => {
    try {
        var resRequest = await sql.query(`SELECT * FROM users WHERE id = ?`, [userId], (err, res) => {
            if (err) {
                console.log('Error: ', err)
                result(err, null)
                return
            }
        });
        if (resRequest[0].length < 1) {
            console.log('No users')
            result(null, null)
            return
        }
        console.log("users: ", resRequest[0])
        result(null, resRequest[0][0])

    } catch (err) {
        console.log(err)
        result(err, null)
    }
};

// NOTE ok working
User.findByName = async (userName, result) => {
    try {
        var resRequest = await sql.query(`SELECT * FROM users WHERE username = ?`, [userName], (err, res) => {
            if (err) {
                console.log('Error: ', err)
                result(err, null)
                return
            }
        });
        if (resRequest[0].length < 1) {
            console.log('No users')
            result(null, null)
            return
        }
        console.log("users: ", resRequest[0])
        result(null, resRequest[0])
    } catch (err) {
        console.log(err)
        result(err, null)
    }
};

// NOTE OK working
User.remove = async (id, result) => {
    try {
        var resRequest = await sql.query("DELETE FROM users WHERE id = ?", [id], (err, res) => {
            if (err) {
                console.log('Error: ', err)
                result(err, null)
                return
            }
        });
        if (resRequest[0].affectedRows == 0) {
            console.log('Not found: ', id)
            result({ message: "not_found " + id }, null);
            return;
        }
        console.log("Delete: ", id)
        result(null, { message: 'User deleted ' + id })
    } catch (err) {
        console.log(err)
        result(err, null)
    }
};

// NOTE Ok working
User.updateUsername = async (id, userName, result) => {
    try {
        if (userName.length == 0)
            throw new Error("Username must not be null")
        var resRequest = await sql.query("UPDATE users SET username = ? WHERE id = ?", [userName, id], (err, res) => {
            if (err) {
                console.log('Error: ', err)
                result(err, null)
                return
            }
        });
        if (resRequest[0].affectedRows == 0) {
            console.log('Not found: ', id)
            result({ message: "not_found" + id }, null);
            return;
        }
        console.log("Update: ", id)
        result(null, { message: 'User updated' })
    } catch (err) {
        console.log(err)
        result(err, null)
    }
};

// NOTE Ok working
User.updatePassword = async (id, password, result) => {
    try {
        if (password.length < 7)
            throw Error('Invalid password size, min 7');
        password = await bcrypt.hash(password, 8)

        var resRequest = await sql.query("UPDATE users SET password = ? WHERE id = ?", [password, id], (err, res) => {
            if (err) {
                console.log('Error: ', err)
                result(err, null)
                return
            }
        });
        if (resRequest[0].affectedRows == 0) {
            console.log('Not found: ', id)
            result({ message: "not_found" }, null);
            return;
        }
        console.log("Update: ", id)
        result(null, { message: 'Password updated'})
    } catch (err) {
        console.log(err)
        result(err, null)
    }
};

module.exports = User