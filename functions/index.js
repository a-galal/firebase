const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.testConnection = functions.https.onRequest((req,res)=>{
    res.send("You are connected :)" );
})

exports.users = functions.https.onRequest((req, res) => {
    var query = 'users/';
    const params = req.url.split("/");
    const userId = params[1];
    
    if(userId!=undefined)
    query = 'users/' + userId;

    return admin.database().ref(query).once('value').then(function(snapshot) {
        if(!snapshot)
            res.json({message : "Error happened ,contact our support team."})
        else if(snapshot==null)
            res.json({message : "We does not fond any data for this id."})
        else
            res.send(snapshot);
      });
});