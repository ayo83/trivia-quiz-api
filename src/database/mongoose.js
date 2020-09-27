import mongoose from 'mongoose';
import config from '../config/index';


const connectDB = async () => {
    try {
        await mongoose.connect(config.databaseURL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected....');
    } catch (err) {
        console.error(err.message);

        //Exit process with failure
        process.exit(1);
    }
}

export default connectDB;
