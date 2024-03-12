const express = require('express');
const router = express.Router();
const Paiement = require('../Models/Paiement');



// Route pour créer un nouveau Paiement
router.post('/createPaiement', async (req, res) => {
    const paiement = new Paiement(req.body);
    try {
        const newPaiement= await paiement.save();
        res.status(201).json(newPaiement);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


//liste Paiement
router.get('/listePaiement',(req,res)=>
      {Paiement.find({}).then((result)=>{res.json({data: result});
    });
       });

//rechercher Paiement by id
router.get("/listePaiement/:id",(req,res)=>
{ Paiement.findById(req.params.id)
  .then((result)=>{
    if(result){res.json({data:result});}
    else{res.json({error:"veuillez verifier l'id"});
  }
  });
});

// mise a jour du Paiement
router.put("/updatePaiement/:id",(req,res)=>{
    Paiement.findByIdAndUpdate(req.params.id, req.body)
    .then(()=>{res.json({msg:"mise a jour bien avec succes !"});
    });
    });

// Route pour supprimer un Paiement
router.delete("/deletePaiement/:id",(req,res)=>{
    Paiement.findByIdAndDelete(req.params.id).then(()=>{
      res.json({msg: "Paiement supprimée avec succes "})
    });
  });


module.exports = router;
