// const mongoose = require('mongoose')
// const validator = require('validator')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')

// const userSchema = mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         lowercase: true,
//         validate: value => {
//             if (!validator.isEmail(value)) {
//                 throw new Error({ error: 'Invalid Email address' })
//             }
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         minLength: 7
//     },
//     tokens: [{
//         token: {
//             type: String,
//             required: true
//         }
//     }]
// })

// userSchema.pre('save', async function (next) {
//     // Hash the password before saving the user model
//     const user = this
//     if (user.isModified('password')) {
//         user.password = await bcrypt.hash(user.password, 8)
//     }
//     next()
// })

// userSchema.methods.generateAuthToken = async function () {
//     // Generate an auth token for the user
//     const user = this
//     const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY)
//     user.tokens = user.tokens.concat({ token })
//     await user.save()
//     return token
// }

// userSchema.statics.findByCredentials = async (email, password) => {
//     // Search for a user by email and password.
//     const user = await User.findOne({ email })
//     if (!user) {
//         throw new Error({ error: 'Invalid login credentials' })
//     }
//     const isPasswordMatch = await bcrypt.compare(password, user.password)
//     if (!isPasswordMatch) {
//         throw new Error({ error: 'Invalid login credentials' })
//     }
//     return user
// }

// const User = mongoose.model('User', userSchema)

// module.exports = User

//MYSQL 

const sql = require("./db.js");

// constructor
const User = function (user) {
    this.email = user.email;
    this.name = user.name;
    this.password = user.password;
};

User.create = async (newUser, result) => {
    newUser.password = await bcrypt.hash(newUser.password, 8)
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};

User.findByEmail = (userEmail, result) => {
    sql.query(`SELECT * FROM users WHERE email = ${userEmail}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found User with the id
        result({ kind: "not_found" }, null);
    });
};

User.remove = (id, result) => {
    sql.query("DELETE FROM user WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found user with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted user with id: ", id);
        result(null, res);
    });
};

//update name or password but not email
User.updateById = async (id, user, result) => {
    user.password = await bcrypt.hash(newUser.password, 8)
    sql.query(
        "UPDATE users SET name = ?, password = ? WHERE id = ?",
        [user.name, user.password, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found User with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated user: ", { id: id, ...user });
            result(null, { id: id, ...user });
        }
    );
};

User.removeAll = result => {
    sql.query("DELETE * FROM users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} users`);
        result(null, res);
    });
};

module.exports = User