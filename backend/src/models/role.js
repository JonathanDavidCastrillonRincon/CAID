import { Schema, model } from 'mongoose';

const roleSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        unique:true
    }
},{
    timestamps:true,
    versionKey: false,
});

module.exports = model('Role', roleSchema);