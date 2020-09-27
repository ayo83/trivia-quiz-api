import express from 'express';
import bodyParser from 'body-parser';
import config from './src/config';
import connectDB from './src/database/mongoose';
import routes from './src/routes/index';


// Initializing Express Framework
const app = express();

// Connecting DB
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Defining Port
const { PORT } = process.env;

// My Routers
app.use(config.api.prefix, routes());

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        errors: {
            message: err.message,
        },
    });
});


app.listen(PORT, ((err) => {
    if (err) throw new Error(err);
    console.log(`Server started on port ${PORT}`);
}));



