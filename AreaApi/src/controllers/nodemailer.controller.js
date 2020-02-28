const nodemailer = require('nodemailer')
const validator = require('validator')

exports.sendMail = async (to, subject, message) => {
    
    if (!to || to.length == 0 || !validator.isEmail(to)) {
        throw new Error("Invalid destinations")
    }

    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        tls: {
            ciphers: 'SSLv3'
        },
        auth: {
            user: "areax.epitech@hotmail.com",
            pass: "'t\\LgcAxe-EK588"
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '<areax.epitech@hotmail.com>', // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: message, // plain text body
        html: "<b>" + message + "</b><br><br><br>This is an automatic message, do not respond" // html body
    });

    console.log("Message sent: %s to %s", info.messageId, to);
}