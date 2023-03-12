const mongoose = require('mongoose');
const MasterDetail = mongoose.Schema(
    {
        username:{type:String,required:true},
        name:{type:String,required:true},
        email:{type:String,required:true},
        password:{type:String,required:true},
        phonenum:{type:String,required:true},

    },
    {collection:'MasterDetail'}
)

const model = mongoose.model('MasterDetail',MasterDetail);
module.exports = model;