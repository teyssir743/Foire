const express = require('express');
const router = express.Router();
const Client = require('../Models/Client');



// Route pour créer un nouveau Client
router.post('/createClient', async (req, res) => {
    const client = new Client(req.body);
    try {
        const newClient= await client.save();
        res.status(201).json(newClient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


//liste Client
router.get('/listeClient',(req,res)=>
      {Client.find({}).then((result)=>{res.json({data: result});
    });
       });

//rechercher Client by id
router.get("/listeClient/:id",(req,res)=>
{ Client.findById(req.params.id)
  .then((result)=>{
    if(result){res.json({data:result});}
    else{res.json({error:"veuillez verifier l'id"});
  }
  });
});


// mise a jour du Client
router.put("/updateClient/:id",(req,res)=>{
    Client.findByIdAndUpdate(req.params.id, req.body)
    .then(()=>{res.json({msg:"mise a jour bien avec succes !"});
    });
    });


// Route pour supprimer un Client
router.delete("/deleteClient/:id",(req,res)=>{
    Client.findByIdAndDelete(req.params.id).then(()=>{
      res.json({msg: "Client supprimée avec succes "})
    });
  });


module.exports = router;
