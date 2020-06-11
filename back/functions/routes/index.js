const express = require('express');
const router = express.Router();
const fb = require("../services/firebase").admin;
const db = fb.firestore();
const path = require("path");
const fs = require("fs");
const Bluebird = require("bluebird");

function getHtml(view) {
    return new Bluebird((res,rej)=>{
        fs.readFile(path.join(__dirname, "../views/"+view+".html"), "utf8", function (err, html) {
            if (err) {
                console.error(err);
                rej(err);
            }
            res(html);
        });
    })
}

router.get("/verify-email/:uid/:hash",(req,res) => {
    db.collection("users").doc(req.params.uid).get()
    .then(rta => rta.data())
    .then(user => {
        if (user && user.emailHash == req.params.hash) {
            if (!user.emailVerified) db.collection("users").doc(req.params.uid).set({emailVerified: true}, { merge: true });

            getHtml("confirmed-email")
            .then(html => res.send(html.replace("{{title}}", !user.emailVerified ? `¡Gracias ${user.firstName} por verificar tu mail!` : `Tu email ya ha sido verificado`)))
            .catch(()=>res.status(500).send("Hubo un error encontrando esta página"))

        } else {
            getHtml("error")
            .then(html => res.send(
                html
                .replace("{{title}}","Link de la página incorrecto")
                .replace("{{description}}","Parece que has intentado ingresar a esta página por un URL equivocado.")
            ))
            .catch(()=>res.status(500).send("Hubo un error encontrando esta página"))

        }
    });
});

// router.get("/verify-email/:token",(req,res) => {

//     const uid = retrieveUserFromToken(req.params.token);

//     db.collection("users").doc(uid).get()
//     .then(rta => rta.data())
//     .then(user => {
//         if (!user.emailVerified) db.collection("users").doc(uid).set({emailVerified: true}, { merge: true });

//         res.send(`<center>
//             <div style="max-width:500px; margin-top:60px; font-family: Sans-Serif;">
//                 <h3>Hola, ${user.firstName}!</h3>
//                 <h4>${user.email}</h4>
//                 <p>Muchas gracias por verificar tu email!</p>
//             </div>
//         </center>`)
//     })

// })

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
                        rating: req.query.rating || undefined,
                        date: (new Date()).getTime()
                    });
                }
                
                res.send(`<center>
                    <div style="max-width:500px; margin-top:60px; font-family: Sans-Serif;">
                        <h3>Muchas gracias por compartir tu  experiencia</h3>
                    </div>
                </center>`);
                    
            } else {
                db.collection("users").doc(req.params.uid).update({ 
                    confirmHash: user.confirmHash.filter(h=>h!=req.params.hash) 
                });

                res.send(`<center>
                    <div style="max-width:500px; margin-top:60px; font-family: Sans-Serif;">
                        <h3>Muchas gracias.</h3>
                        <p>Has confimado que no asististe a <strong>${space.title}</strong></p>
                    </div>
                </center>`);
            }



            
        
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