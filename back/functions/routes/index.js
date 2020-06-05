const express = require('express');
const router = express.Router();
const fb = require("../services/firebase").admin;
const db = fb.firestore();
const path = require("path");


function retrieveUserFromToken(text) {
  return (new Buffer(text, "base64")).toString('ascii');
}

router.get("/verify-email/:uid/:hash",(req,res) => {
    db.collection("users").doc(req.params.uid).get()
    .then(rta => rta.data())
    .then(user => {
        if (user.emailHash == req.params.hash) {

            if (!user.emailVerified) db.collection("users").doc(req.params.uid).set({emailVerified: true}, { merge: true });

            res.send(`<center>
            <div style="max-width:500px; margin-top:60px; font-family: Sans-Serif;">
                <h3>Hola, ${user.firstName}!</h3>
                <h4>${user.email}</h4>
                <p>${user.emailVerified ? "Tu email ya está verificado" : "Muchas gracias por verificar tu email!"}</p>
            </div>
        </center>`)
        }else {
            res.send(`<center>
            <div style="max-width:500px; margin-top:60px; font-family: Sans-Serif;">
                <h3>Hola, desconocido</h3>
                <h4>¿Que flasheaste?</h4>
                <p>Sali de aca papu</p>
            </div>
        </center>`)
        }
    });
});

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

router.get("/confirm-stay/:spaceid/:uid/:hash",(req,res,next) => {
    db.collection("users").doc(req.params.uid).get()
    .then(rta => rta.data())
    .then((user)=>{
        return db.collection("properties").doc(req.params.spaceid).get()
        .then(rta => rta.data())
        .then((space)=>{

            if ((space.rents || []).includes(req.params.uid)) return res.send(`
            <center>
                <div style="max-width:500px; margin-top:60px; font-family: Sans-Serif;">
                    <p>Ya confirmaste tu estadia</p>
                </div>
            </center>
            `);


            if (!user.confirmHash.includes(req.params.hash)) return res.send(`
            <center>
                <div style="max-width:500px; margin-top:60px; font-family: Sans-Serif;">
                    <p>Mepa que flasheaste</p>
                </div>
            </center>
            `);

            
            // /!\ esto hay que descomentar
            //db.collection("users").doc(req.params.uid).update({ confirmHash: user.confirmHash.filter(h=>h!=req.params.hash) });

            if (req.query.beenthere == "true") {
                db.collection("properties").doc(req.params.spaceid).update({ rents: [...(space.rents || []), req.params.uid] });

                db.collection("users").doc(req.params.uid).update({ 
                    rented: [...(user.rented || []), req.params.spaceid], 
                    confirmHash: user.confirmHash.filter(h=>h!=req.params.hash) 
                });

                if (req.query.comment) {

                    db.collection("properties").doc(req.params.spaceid).collection("comments").add({
                        author: req.params.uid,
                        comment: req.query.comment,
                        date: (new Date()).getTime()
                    });
                }
                    
            } else {
                db.collection("users").doc(req.params.uid).update({ 
                    confirmHash: user.confirmHash.filter(h=>h!=req.params.hash) 
                });
            }


            
            res.send(`<center>
                <div style="max-width:500px; margin-top:60px; font-family: Sans-Serif;">
                    <h3>Muchas gracias por compartir tu  experiencia</h3>
                </div>
            </center>`);

            
        
        })
    })
    .catch((err)=>{
        console.log(err);
        res.send(`<center>
            <div style="max-width:500px; margin-top:60px; font-family: Sans-Serif;">
                <p>Hubo un erro rarisimo</p>
            </div>
        </center>`);
    })


})

//router.get("/admin",(req,res) => res.redirect("/admin"))


router.get("/admin/*", (req, res) => {
    res.sendFile(path.join(__dirname, "/../public/", "index.html"));
});


module.exports = router;