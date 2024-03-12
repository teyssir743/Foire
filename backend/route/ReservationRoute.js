const express = require('express');
const router = express.Router();
const Reservation = require('../Models/Reservation');



// Route pour créer un nouveau Reservation
router.post('/createReservation', async (req, res) => {
    const reservation = new Reservation(req.body);
    try {
        const newReservation= await reservation.save();
        res.status(201).json(newReservation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


//liste Reservation
router.get('/listeReservation',(req,res)=>
      {Reservation.find({}).then((result)=>{res.json({data: result});
    });
       });

//rechercher reservation by id
router.get("/listeReservation/:id",(req,res)=>
{ Reservation.findById(req.params.id)
  .then((result)=>{
    if(result){res.json({data:result});}
    else{res.json({error:"veuillez verifier l'id"});
  }
  });
});

// mise a jour reservation
router.put("/updateReservation/:id",(req,res)=>{
    Reservation.findByIdAndUpdate(req.params.id, req.body)
    .then(()=>{res.json({msg:"mise a jour bien avec succes !"});
    });
    });

// Route pour supprimer reservation
router.delete("/deleteReservation/:id",(req,res)=>{
    Reservation.findByIdAndDelete(req.params.id).then(()=>{
      res.json({msg: "reservation supprimée avec succes "})
    });
  });


module.exports = router;
