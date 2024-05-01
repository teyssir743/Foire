
const express = require('express');
const router = express.Router(); 
const eventModel=require('../Models/Event');
const upload = require('../middlewares/multer-config');

router.get('/listeEvent1', (req, res) => {
  eventModel.find({}).then((result) => {
    res.json(result); // Envoyez directement les données sans les envelopper dans un objet
  }).catch((error) => {
    res.status(500).json({ error: error.message });
  });
});

//liste event
router.get('/listeEvent',(req,res)=>
      {eventModel.find({}).then((result)=>{res.json({data: result});
    });
       });



// recherche by id 
router.get("/listeEvent/:id",(req,res)=>
{ //eventModel.find({_id: req.params.id})
  eventModel.findById(req.params.id)
  .then((result)=>{
    if(result){res.json({data:result});}
    else{res.json({error:"veuillez verifier l'id"});
  }
  });
});
 

// create event 
router.post('/createEvent',upload,async(req,res)=>
    {
   const newEvent = new eventModel({...req.body,image:`${req.file.filename}`});
   await newEvent.save().then(()=>{res.json({msg : "event enregistré avec success"});
}).catch((err)=>{console.log(err);
});
});



// update event : mise a jour 
router.put("/updateEvent/:id",(req,res)=>{
eventModel.findByIdAndUpdate(req.params.id, req.body)
.then(()=>{res.json({msg:"mise a jour bien avec succes !"});
});
});



// delete event 
router.delete("/deleteEvent/:id",(req,res)=>{
  eventModel.findByIdAndDelete(req.params.id).then(()=>{
    res.json({msg: "event supprimée avec succes "})
  });
});



module.exports = router ;


