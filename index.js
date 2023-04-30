const express = require('express');
const app = express();
const PORT = process.env.PORT || 3047;
const cors= require('cors');
const fileupload= require("express-fileupload")


//alllow static files
app.use(express.static(__dirname + "uploads"))

// Enable file upload using express-fileupload
app.use(fileupload({createParentPath: true }));

//connect to database
const connectDB = require('./config/connection');
connectDB();

//allowed origin
const allowed_origins = [
    'http://localhost:3000',
    'http://localhost:3001',
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
app.use("/api/image-upload", require("./routes/file_upload"))
app.use("/api/check-status", require("./routes/online_offline_status"))
app.use("/api/contact", require("./routes/contact"))
app.use("/api/logout", require("./routes/logout"));



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
