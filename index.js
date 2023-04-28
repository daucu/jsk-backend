const express = require('express');
const app = express();
const PORT = process.env.PORT || 3047;
const cors= require('cors');



//connect to database
const connectDB = require('./config/connection');
connectDB();

//allowed origin
const allowed_origins = [
    'http://localhost:3000',
    'http://localhost:3002',
    'http://localhost:3047',
    "http://127.0.0.1:5500",
    "https://admin-jan-seva-kendra.vercel.app",
    "https://jan-seva-kendra.vercel.app",
    "https://react-jsk-harshaaweb.vercel.app",
    "https://react-jsk.vercel.app"
]

//cors
app.use(cors({
    origin: allowed_origins,
    credentials: true
    }));

//allow json to parsed
app.use(express.json());



//routes
app.use('/api/register', require('./routes/register'));
app.use('/api/login', require('./routes/login'));
app.use('/api/service', require('./routes/service'));



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
