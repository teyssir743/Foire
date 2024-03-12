const express = require('express');
const router = express.Router();
const Foire = require('../Models/Foire');



// Route pour créer un nouveau Foire
router.post('/createFoire', async (req, res) => {
    const foire = new Foire(req.body);
    try {
        const newFoire= await foire.save();
        res.status(201).json(newFoire);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


//liste Foire
router.get('/listeFoire',(req,res)=>
      {Foire.find({}).then((result)=>{res.json({data: result});
    });
       });

//rechercher Foire by id
router.get("/listeFoire/:id",(req,res)=>
{ Foire.findById(req.params.id)
  .then((result)=>{
    if(result){res.json({data:result});}
    else{res.json({error:"veuillez verifier l'id"});
  }
  });
});


// mise a jour du Foire
router.put("/updateFoire/:id",(req,res)=>{
    Foire.findByIdAndUpdate(req.params.id, req.body)
    .then(()=>{res.json({msg:"mise a jour bien avec succes !"});
    });
    });


// Route pour supprimer un stand
router.delete("/deleteFoire/:id",(req,res)=>{
    Foire.findByIdAndDelete(req.params.id).then(()=>{
      res.json({msg: "Foiresupprimée avec succes "})
    });
  });


module.exports = router;
