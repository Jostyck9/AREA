const nodemailer = require('nodemailer')
const validator = require('validator')

/**
 * Send an email to the given dest
 * 
 * @param {string} to - Destination
 * @param {string} subject - Subject of the email
 * @param {string} message - Message of the email
 * @throws Can throw an error with a message field
 */
exports.sendMail = async (to, subject, message) => {
    if (!subject || !message) {
        throw new Error("Invalid null parameter")
    }
    if (!to || to.length == 0 || !validator.isEmail(to)) {
        throw new Error("Invalid destinations : " + to)
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

/**
 * Use the appropriate reaction of the mail controller
 * 
 * @param {JSON} actionResult - Result of the triggered action
 * @param {JSON} area - The area configuration
 * @throws - Error with a message field
 */
exports.useReaction = (actionResult, area) => {
    this.sendMail(area.parameters_reaction.to, area.parameters_reaction.subject, area.parameters_reaction.message)
}