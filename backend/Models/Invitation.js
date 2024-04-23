const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
    senderName: {
        type: String,
        required: true // Le sujet de l'invitation est requis
      },
    invitationMessage: {
        type: String,
        required: true
      },
      sentDate: {
        type: Date,
        default: Date.now
      }
    });


const Invitation = mongoose.model('Invitation', invitationSchema);
module.exports = Invitation;
