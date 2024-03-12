const express = require('express');
const router = express.Router();

const User = require('../Models/User');


// Route pour créer un nouveau User
router.post('/createUser', async (req, res) => {
    const user = new User(req.body);
    try {
        const newUser= await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


//liste utulisateur
router.get('/listeUser',(req,res)=>
      {User.find({}).then((result)=>{res.json({data: result});
    });
       });

//rechercher  by User
router.get("/listeUser/:id",(req,res)=>
{ User.findById(req.params.id)
  .then((result)=>{
    if(result){res.json({data:result});}
    else{res.json({error:"veuillez verifier l'id"});
  }
  });
});


// mise a jour du User
router.put("/updateUser/:id",(req,res)=>{
   User.findByIdAndUpdate(req.params.id, req.body)
    .then(()=>{res.json({msg:"mise a jour bien avec succes !"});
    });
    });


// Route pour supprimer un User
router.delete("/deleteUser/:id",(req,res)=>{
    User.findByIdAndDelete(req.params.id).then(()=>{
      res.json({msg: "User supprimée avec succes "})
    });
  });

  router.post('/register' , (req,res)=>{


    let newUser = new User (req.body)
    newUser.save().then (()=>{res.json({msg:"compte creer avec succes"});
    });
    
    });
    


module.exports = router;
