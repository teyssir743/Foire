
const express = require('express');
const router = express.Router(); 
const upload = require('../middlewares/multer-config');
const eventController = require('../Controller/eventController')

router.get('/listeEvent1',eventController.listEvents1 );

//liste event
router.get('/listeEvent',eventController.listEvent);



// recherche by id 
router.get("/listeEvent/:id",eventController.getEventById);
 

// create event 
router.post('/createEvent',upload,eventController.createEvent);



// update event : mise a jour 
router.put("/updateEvent/:id",eventController.updateEvent);



// delete event 
router.delete("/deleteEvent/:id",eventController.deleteEvent);

router.get('/events',eventController.getEvents );

// Route to get event by ID
router.get('/events/:id',eventController.getEventById2);




module.exports = router ;


