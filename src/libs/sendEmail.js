const nodemailer = require("nodemailer");

async function sendEmailHandler(email, subject, text){
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hback1218@gmail.com",
        pass: "dnfrxlsymhdbskbh",
      },
    });

    const sendEmail = transporter.sendMail({
        from: "hback1218@gmail.com",
        to: email,
        subject: subject,
        text: text,
    })

    console.log("email berhasil dikirim");
}

export default sendEmailHandler