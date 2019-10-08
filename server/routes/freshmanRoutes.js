const fs = require('fs');
const path = require('path');

const freshmanDataFilePath = path.join(__dirname, '../data/freshman.json');

module.exports = app => {
	app.get('/api/freshman', async (req, res) => {
		const freshman = JSON.parse(await fs.readFileSync(freshmanDataFilePath));
		res.send(freshman);
	});
};
