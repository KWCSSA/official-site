const nodemailer = require('nodemailer');
const winston = require('winston');

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.combine(
		winston.format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss'
		}),
		winston.format.errors({ stack: true }),
		winston.format.splat(),
		winston.format.json()
	),
	defaultMeta: { service: 'KWCSSA-Official-Site' },
	transports: [
		new winston.transports.File({ filename: './logs/contact-message-error.log', level: 'error' }),
		new winston.transports.File({ filename: './logs/contact-message-combined.log' })
	]
});

module.exports = app => {
	app.post('/api/contact/message', (req, res) => {
		var userMessage = {
			name: req.body.name,
			email: req.body.email.toLowerCase(),
			phone: req.body.phone || '-',
			subject: req.body.subject,
			message: req.body.message
		};

		const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var emailValid = emailRegex.test(userMessage.email);
		if (!emailValid) {
			return res.send({ success: false, message_ch: '发送失败，邮件格式错误！', message_en: 'Error, please enter a valid email!' });
		}

		var transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.MESSAGE_EMAIL,
				pass: process.env.MESSAGE_PASSWORD
			}
		});

		var now = new Date();
		var date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
		var time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
		var timeStamp = `${date} ${time}`;

		var emailHTML = `<h3>姓名：${userMessage.name}</h3><h3>邮箱：${userMessage.email}</h3><h3>电话：${userMessage.phone}</h3><h3>日期：${timeStamp}</h3><h3>主题：${userMessage.subject}</h3><h3>内容：</h3><p>${userMessage.message}</p>`;

		const mailOptions = {
			from: process.env.MESSAGE_EMAIL, // sender address
			to: process.env.MESSAGE_RECIPIENTS.split(','), // list of recipients
			subject: `【官网新消息】 ${userMessage.subject} | ${timeStamp}`, // subject line
			html: emailHTML // plain text body
		};

		transporter.sendMail(mailOptions, (err, info) => {
			if (err) {
				var log = {
					message: userMessage,
					timeStamp,
					error: err
				};
				logger.error('New message', log);
				return res.send({ success: false });
			} else {
				var log = {
					message: userMessage,
					timeStamp,
					info: info
				};
				logger.info('New message', log);
				return res.send({ success: true });
			}
		});
	});
};
