const mongoose = require('mongoose');
const StudentDetail = mongoose.Schema(
    {
        username:{type:String,required:true},
        name:{type:String,required:true},
        email:{type:String,required:true},
        password:{type:String,required:true},
        phonenum:{type:String,required:true},

    },
    {collection:'StudentDetail'}
)

const model = mongoose.model('StudentDetail',StudentDetail);
module.exports = model;