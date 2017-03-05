import sendgrid, { mail as helper } from 'sendgrid'
import dotEnv from 'dotenv';
dotEnv.config()

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
const sendMail = ({
    fromEmail = 'no-reply@hugethoughts.com',
    toEmail,
    subject,
    content,
    contentType = 'text/html'
}) => {
    fromEmail = new helper.Email(fromEmail)
    toEmail = new helper.Email(toEmail)
    content = new helper.Content(contentType, content)
    const mail = new helper.Mail(fromEmail, subject, toEmail, content)
    const sg = sendgrid(SENDGRID_API_KEY)
    const request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    })

    return sg.API(request)
}

export default sendMail;
