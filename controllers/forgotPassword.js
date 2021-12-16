const User = require("../models/User");
const jwt = require("jsonwebtoken");
const transporter = require("../modules/mailer.js");
const fs = require("fs")
const handlebars = require("handlebars")

async function forgotPassword(req, res) {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(200).send({ error: "usuario não cadastrado" });

    const token = generateToken({ id: user.id });

    await User.findByIdAndUpdate(user.id, {
      $set: { passwordResetToken: token },
    });

    const html = fs.readFileSync("./resources/mail/index.html", "utf8");
    const template = handlebars.compile(html)
    const htmlToSend = template({token: "https://notesforcoders.vercel.app/forgot_password/pass?token="+token, name: user.name})

    await transporter.sendMail({
      to: email,
      from: "noteforcoders@gmail.com",
      context: { },
      subject: "Redefinir Senha",
      html: htmlToSend,
      attachments: [{
        filename: "eu.png",
        path: "./resources/images/eu.png",
        cid: "eu"
      },
      {
        filename: "logo.png",
        path: "./resources/images/logo.png",
        cid: "logo"
      }]
    });

    res.send({ ok: token });
  } catch (err) {
    console.log(err);
    res.send({ error: "Erro on forgot password. Try again" });
  }
}

module.exports = { forgotPassword };

function generateToken(params = {}) {
  return jwt.sign(params, process.env.HASH_SECRET, {
    expiresIn: 900,
  });
}
