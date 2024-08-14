import "dotenv/config";
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import CourseRoutes from "./Kanbas/Posts/routes.js";
import Test from './Test/index.js';
import UserRoutes from './Users/routes.js';

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
mongoose.connect(CONNECTION_STRING);

const app = express();

app.use(
	cors({
		credentials: true,
		origin: (origin, callback) => {
			console.log("Origin:", origin);
			// Allow requests from the specified origin or localhost
			callback(null, process.env.NETLIFY_URL || "http://localhost:3000");
		}
	})
);
// Session options, including secret and resave and saveUninitialized settings
// this is required for the session to work
const sessionOptions = {
	secret: process.env.SESSION_SECRET || "chatterbox",
	resave: false,
	saveUninitialized: false,
};

// If we are in production, set the cookie to secure and sameSite none,
// turns on the proxy setting, and sets the domain to the server domain
if (process.env.NODE_ENV !== "development") {
	sessionOptions.proxy = true;
	sessionOptions.cookie = {
		sameSite: "none",
		secure: true,
		domain: process.env.NODE_SERVER_DOMAIN,
	};
}

// Middleware to parse JSON bodies
app.use(session(sessionOptions));

// Middleware to log requests
app.use((req, res, next) => { console.log(`${req.method} ${req.url}`); next(); });


// Import routes
Test(app);
UserRoutes(app);
CourseRoutes(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));
