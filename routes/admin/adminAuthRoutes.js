const passport = require('passport');
const LocalStrat = require('passport-local').Strategy;
// const Session = require('express-session');
const Session = require('cookie-session');
const path = require('path');

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
	app.set('views', path.join(__dirname, '../../views'));
	app.set('view engine', 'hbs');

	app.use(passport.initialize());
	app.use(passport.session());
	app.set('trust proxy', 1);
	// app.use(
	// 	Session({
	// 		secret: process.env.SESSION_SECRET,
	// 		resave: false,
	// 		saveUninitialized: false,
	// 		cookie: {
	// 			maxAge: 1000 * 60 * 60
	// 			// httpOnly: true,
	// 			// domain: 'kwcssa.com',
	// 			// path: '/admin',
	// 			// sameSite: true
	// 			// secure: true
	// 		}
	// 	})
	// );
	app.use(
		Session({
			keys: [ process.env.SESSION_SECRET ],
			resave: false,
			saveUninitialized: false,
			cookie: {
				maxAge: 1000 * 60 * 60
				// httpOnly: true,
				// domain: 'kwcssa.com',
				// path: '/admin',
				// sameSite: true
				// secure: true
			}
		})
	);

	app.get('/admin/login', (req, res) => {
		res.render('login');
	});

	app.get('/admin/status', (req, res) => {
		console.log(req.user);
		res.send(req.user);
	});

	app.post('/admin/login', passport.authenticate('local', { failureRedirect: '/admin/login' }), (req, res) => {
		res.redirect('/admin');
	});

	app.get('/admin/logout', (req, res) => {
		req.logout();
		res.redirect('/login');
	});
};
