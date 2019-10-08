const fs = require('fs');
const path = require('path');

const homeDataFilePath = path.join(__dirname, '../data/home.json');

module.exports = app => {
	app.get('/api/home', async (req, res) => {
		const homeData = JSON.parse(await fs.readFileSync(homeDataFilePath));
		res.send(homeData);
	});
};
