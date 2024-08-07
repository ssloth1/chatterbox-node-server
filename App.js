import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

import Test from './Test/index.js';

Test(app);

app.listen(process.env.PORT || 4000, () => console.log('Server running on port 4000!'));