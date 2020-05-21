import nodemailer from 'nodemailer';

const sendMail = async (destinatario:string, titulo:string, htmlMessage:string)=> {
    
    let transporter = nodemailer.createTransport({
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
      from: '"Valorar" <contactovalorar@gmail.com>', // sender address
      to: destinatario, // list of receivers
      subject: titulo, // Subject line
      //text: "Hello world?", // plain text body
      html: htmlMessage, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  export default sendMail;