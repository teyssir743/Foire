const express = require('express');
const router = express.Router();
const Admin = require('../Models/Admin');



// Route pour créer un nouveau  Admin
router.post('/createAdmin', async (req, res) => {
    const user = new Admin(req.body);
    try {
        const newAdmin= await Admin.save();
        res.status(201).json(newAdmin);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


//liste  Admin
router.get('/listeAdmin',(req,res)=>
      {User.find({}).then((result)=>{res.json({data: result});
    });
       });

//rechercher  Admin by id
router.get("/listeAdmin/:id",(req,res)=>
{  Admin.findById(req.params.id)
  .then((result)=>{
    if(result){res.json({data:result});}
    else{res.json({error:"veuillez verifier l'id"});
  }
  });
});


// mise a jour du stand
router.put("/updateAdmin/:id",(req,res)=>{
    Admin.findByIdAndUpdate(req.params.id, req.body)
    .then(()=>{res.json({msg:"mise a jour bien avec succes !"});
    });
    });


// Route pour supprimer un stand
router.delete("/delete Admin/:id",(req,res)=>{
    Admin.findByIdAndDelete(req.params.id).then(()=>{
      res.json({msg: "stand supprimée avec succes "})
    });
  });


module.exports = router;
