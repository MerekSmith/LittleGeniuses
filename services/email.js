const nodemailer = require("nodemailer");

module.exports = sendContactEmail = async (req, res) => {
  const { name, email, phone, address, message } = req.body;

  const output = `
		<p>You have a new contact message from your website</p>
		<h3>Contact Details</h3>
		<ul>
			<li>Name: ${name}</li>
			<li>Email: ${email}</li>
			<li>Phone: ${phone}</li>
			<li>Address: ${address}</li>
		</ul>
		<h3>Message</h3>
		<p>${message}</p>
		`;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.mailgun.org",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "postmaster@sandbox82184c276df34e8b91b32a11560ff75e.mailgun.org", // generated ethereal user
      pass: "11912fd0decf8b411ff463256a1a9212-3939b93a-1d6e73c4" // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from:
      '"Little Geniuses Contact Form" <postmaster@sandbox82184c276df34e8b91b32a11560ff75e.mailgun.org>', // sender address
    to: "mereksmith@hotmail.com", // list of receivers
    subject: `Website Message from ${name}`, // Subject line
    // text: 'Hello world?', // plain text body
    html: output // html body
  });

  res.json({ mailSent: true });

  // console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
