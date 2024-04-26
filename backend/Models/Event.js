const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');


const eventModel= mongoose.Schema({
    titre: {type:String , required:true},
    date_debut: {type:Date , required:true},
    date_fin: {type:Date, required:true},
    description: {type:String , required:true},
    image:{type: String},

  
    
});  

   


module.exports = mongoose.model('event',eventModel);



  