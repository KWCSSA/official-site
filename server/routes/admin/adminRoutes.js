const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CRYPTR_KEY);
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');

const homeDataFilePath = path.join(__dirname, '../../data/home.json');

module.exports = app => {
	app.use(fileUpload());

	app.use('/api/admin', (req, res, next) => {
		if (req.query.password === cryptr.decrypt(process.env.ADMIN_PASSWORD)) {
			return next();
		}
		return res.status(403).end();
	});

	app.post('/api/admin/login', (req, res) => {
		var password = req.body.password;
		if (password === cryptr.decrypt(process.env.ADMIN_PASSWORD)) {
			return res.status(200).send(true);
		} else {
			return res.status(200).send(false);
		}
	});

	require('./adminEventRoutes')(app);

	require('./adminAboutRoutes')(app);

	require('./adminFreshmanRoutes')(app);

	app.put('/api/admin/home', async (req, res) => {
		var newHomeData = req.body;
		await fs.writeFileSync(homeDataFilePath, JSON.stringify(newHomeData));
		res.send(newHomeData);
	});
};
