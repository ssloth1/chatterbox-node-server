import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

// Middleware to log requests
app.use((req, res, next) => {
	console.log(`${req.method} ${req.url}`);
	next();
});

// Import routes
import Test from './Test/index.js';
Test(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));
