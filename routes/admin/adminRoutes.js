const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');

const homeDataFilePath = path.join(__dirname, '../../data/home.json');

module.exports = app => {
	app.use(fileUpload());

	require('./adminAuthRoutes')(app);

	require('./adminEventRoutes')(app);

	require('./adminAboutRoutes')(app);

	require('./adminFreshmanRoutes')(app);

	app.put('/api/admin/home', async (req, res) => {
		var newHomeData = req.body;
		await fs.writeFileSync(homeDataFilePath, JSON.stringify(newHomeData));
		res.send(newHomeData);
	});
};
