const passport = require('passport');
const LocalStrat = require('passport-local').Strategy;
const Session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(Session);
const redisClient = redis.createClient();

passport.use(
	new LocalStrat((username, password, callback) => {
		if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
			return callback(null, false);
		}
		const user = {
			id: process.env.ADMIN_USERNAME
		};
		return callback(null, user);
	})
);

passport.serializeUser((user, callback) => {
	callback(null, user.id);
});

passport.deserializeUser((id, callback) => {
	if (id === process.env.ADMIN_USERNAME) {
		const user = {
			id: process.env.ADMIN_USERNAME
		};
		return callback(null, user);
	} else {
		return callback('UserID not found');
	}
});

module.exports = app => {
	app.set('trust proxy', 1);
	app.use(
		Session({
			store: new RedisStore({ client: redisClient }),
			secret: process.env.SESSION_SECRET,
			resave: false,
			saveUninitialized: false,
			cookie: {
				maxAge: 1000 * 60 * 60,
				httpOnly: true,
				domain: 'kwcssa.com',
				sameSite: true,
				secure: true
			}
		})
	);
	app.use(passport.initialize());
	app.use(passport.session());

	app.get('/admin/status', (req, res) => {
		res.send(req.user);
	});

	app.post('/admin/login', passport.authenticate('local'), (req, res) => {
		res.send(req.user);
	});

	app.get('/admin/logout', (req, res) => {
		req.logout();
		res.redirect('/admin');
	});
};
