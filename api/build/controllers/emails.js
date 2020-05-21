"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendMail = async (destinatario, titulo, htmlMessage) => {
    let transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "contactovalorar@gmail.com",
            pass: "valorar05",
        },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Valorar" <contactovalorar@gmail.com>',
        to: destinatario,
        subject: titulo,
        //text: "Hello world?", // plain text body
        html: htmlMessage,
    });
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer_1.default.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
exports.default = sendMail;
//# sourceMappingURL=emails.js.map