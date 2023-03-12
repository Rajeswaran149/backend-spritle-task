const mongoose = require('mongoose');
const ActivityDetail = mongoose.Schema(
    {
        studentusername:{type:String,required:true},
        masterusername:{type:String,required:true},
        message:{type:String,required:true},
        parameter1:{type:String,required:true},
        parameter2:{type:String,required:true},
        operator:{type:String,required:true},
        result:{type:String,require:true}

    },
    {collection:'ActivityDetail'}
)

const model = mongoose.model('ActivityDetail',ActivityDetail);
module.exports = model;