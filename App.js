import "dotenv/config";
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import Test from './Test/index.js';
import UserRoutes from './Users/routes.js';
import TopicRoutes from './Topics/routes.js';
import PostRoutes from './Posts/routes.js';
import CommentRoutes from './Comments/routes.js';

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/chatterbox";

// Connect to MongoDB
mongoose.connect(CONNECTION_STRING, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => console.log("Connected to MongoDB successfully"))
	.catch(err => console.error("Failed to connect to MongoDB:", err));

const app = express();

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use(
	cors({
		credentials: true,
		origin: (origin, callback) => {
			console.log("Origin:", origin);
			callback(null, process.env.NETLIFY_URL || "http://localhost:3000");
		}
	})
);

// Session options
const sessionOptions = {
	secret: process.env.SESSION_SECRET || "chatterbox",
	resave: false,
	saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
	sessionOptions.proxy = true;
	sessionOptions.cookie = {
		sameSite: "none",
		secure: true,
		domain: process.env.NODE_SERVER_DOMAIN,
	};
}

app.use(session(sessionOptions));

// Middleware to log requests
app.use((req, res, next) => {
	console.log(`${req.method} ${req.url}`);
	next();
});

// Import routes
Test(app);
UserRoutes(app);

TopicRoutes(app);
PostRoutes(app);
CommentRoutes(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));
