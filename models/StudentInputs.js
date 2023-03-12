const mongoose = require('mongoose');
const StudentInputs = mongoose.Schema(
    {
        studentusername:{type:String,required:true},
        masterusername:{type:String,required:true},
        message:{type:String,required:true},
        parameter1:{type:String,required:true},
        parameter2:{type:String,required:true},
        operator:{type:String,required:true},

    },
    {collection:'StudentInputs'}
)

const model = mongoose.model('StudentInputs',StudentInputs);
module.exports = model;