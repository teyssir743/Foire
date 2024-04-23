const express = require('express');
const router = express.Router();
const Invitation = require('../Models/Invitation');







// create invitation

router.post('/createInvitation', async (req, res) => {
  const invitation = new Invitation(req.body);
  try {
      const newInvitation= await invitation.save();
      res.status(201).json(newInvitation);


  } catch (err) {
      res.status(400).json({ message: err.message });
  }
});



// afficher liste d'invitation
router.get('/listeInvitation',(req,res)=>
      {Invitation.find({}).then((result)=>{res.json({data: result});
    });
    });


//rechercher invitation by id
router.get("/listeInvitation/:id",(req,res)=>
{ 
    Invitation.findById(req.params.id)
  .then((result)=>{
    if(result){res.json({data:result});}
    else{res.json({error:"veuillez verifier l'id"});
  }
  });
});




// Route pour mettre à jour le statut d'une invitation
router.put("/updateInvitation/:id",(req,res)=>{
    Invitation.findByIdAndUpdate(req.params.id, req.body)
     .then(()=>{res.json({msg:"mise a jour bien avec succes !"});
     });
     });



router.delete("/deleteInvitation/:id",(req,res)=>{
    Invitation.findByIdAndDelete(req.params.id).then(()=>{
      res.json({msg: "invitation supprimée avec succes "})
    });
  });

module.exports = router;
