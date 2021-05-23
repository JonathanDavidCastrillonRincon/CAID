import mongoose from 'mongoose';

const URI = process.env.MONGODB_URI;
//conexion a base de datos
mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
});

const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('DB is connected');
});