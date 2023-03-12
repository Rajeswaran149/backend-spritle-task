const mongoose = require('mongoose');
const Question = mongoose.Schema(
    {
        masterusername:{type:String,required:true},
        studentusername:{type:String,required:true},
        message:{type:String,required:true},

    },
    {collection:'Question'}
)

const model  = mongoose.model('Question',Question);
module.exports = model;