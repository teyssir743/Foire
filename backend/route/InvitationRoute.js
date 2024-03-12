const express = require('express');
const router = express.Router();
const Invitation = require('../Models/Invitation');


// Route pour créer une nouvelle invitation
router.post('/createInvitation',async(req,res)=>
    {
   const invitation = req.body;
   const newInvitation = Invitation(req.body);
   await newInvitation.save().then(()=>{res.json({msg : "invitation enregistré avec success"});
}).catch((err)=>{console.log(err);
});
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
