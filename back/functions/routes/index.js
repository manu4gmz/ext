const express = require('express');
const router = express.Router();
const fb = require("../services/firebase").admin;
const db = fb.firestore();



function retrieveUserFromToken(text) {
  return (new Buffer(text, "base64")).toString('ascii');
}

router.get("/verify-email/:token",(req,res) => {

    const uid = retrieveUserFromToken(req.params.token);

    db.collection("users").doc(uid).get()
    .then(rta => rta.data())
    .then(user => {
        if (!user.emailVerified) db.collection("users").doc(uid).set({emailVerified: true}, { merge: true });

        res.send(`<center>
            <div style="max-width:500px; margin-top:60px; font-family: Sans-Serif;">
                <h3>Hola, ${user.firstName}!</h3>
                <h4>${user.email}</h4>
                <p>Muchas gracias por verificar tu email!</p>
            </div>
        </center>`)
    })

})

module.exports = router;