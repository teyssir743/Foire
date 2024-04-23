const express = require('express');
const router = express.Router();
const Stand = require('../Models/Stand'); 
const upload = require('../middlewares/multer-config');


//tlawej 3al event mel base de donne w tjibou w yaffichi kan fema erreur 
router.get('/listeStand',(req,res)=>
      {Stand.find({}).then((result)=>{res.json({data: result});
    });
       });

//rechercher stand by id
router.get("/listeStand/:id",(req,res)=>
{ //eventModel.find({_id: req.params.id})
    Stand.findById(req.params.id)
  .then((result)=>{
    if(result){res.json({data:result});}
    else{res.json({error:"veuillez verifier l'id"});
  }
  });
});






// Route pour créer un nouveau stand
router.post('/createStand',upload, async (req, res) => {
    const stand = new Stand({...req.body,image:`${req.file.filename}`});
    try {
        const newStand = await stand.save();
        res.status(201).json(newStand);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// mise a jour du stand
router.put("/updateStand/:id",(req,res)=>{
   Stand.findByIdAndUpdate(req.params.id, req.body)
    .then(()=>{res.json({msg:"mise a jour bien avec succes !"});
    });
    });


// Route pour supprimer un stand
router.delete("/deleteStand/:id",(req,res)=>{
    Stand.findByIdAndDelete(req.params.id).then(()=>{
      res.json({msg: "stand supprimée avec succes "})
    });
  });


module.exports = router;
