const router = require('express').Router()
const fb = require("../services/firebase").admin;
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const db = fb.firestore();

const { validateUser, validateAdmin } = require("../authenticate");

const Promise = require("bluebird");
//* buscar todos los usuarios
const transporter = require("./nodemailer");

router.get("/authenticate", validateUser(), (req,res,next) => {
  res.json(req.user)
})
router.get("/only-logged", validateUser(false), (req,res,next) => {
  res.json(req.userId)
})


function getUserToken(uid) {
  return (new Buffer(uid)).toString('base64');
}

function getHtml(view) {
    return new Promise((res,rej)=>{
        fs.readFile(path.join(__dirname, "../views/"+view+".html"), "utf8", function (err, html) {
            if (err) {
                console.log(err);
                rej(err);
            }
            res(html);
        });
    })
}

//* agregar un user
router.post('/register', (req, res, next) => {
  const data = req.body;
  db.collection('users').doc(data.id).set(data)
    .then(() => {
      res
      .status(201)
      .json(data.id)
    })
    .catch(next)
})

router.post('/get-token', (req, res, next) => {
  const data = req.body;
  res.send(getUserToken(data.id))
})


router.put('/update/:id', validateUser(), (req, res, next) => {
  const id = req.params.id;
  const data = req.body;

  if (req.user.id !== id) return res.status(401).send({msg:"Not your user"});

  db.collection('users').doc(id).set(data, {merge: true})
    .then(() => res.sendStatus(200))
})

//* eliminar un user
router.delete('/delete/:id', (req, res, next) => {
  const id = req.params.id
  db.collection('users').doc(id).delete()
    .then(() => res.status(200))
    .catch(next)
})

//* traer un user por su id

router.get('/info/:id', validateUser(false), (req, res, next) => {
  const id = req.params.id
  db.collection('users').doc(id).get()
  .then(data => {
      res
      .status(200)
      .json(data.data())
  })
})



//*buscar favoritos
router.get("/favs/:id", validateUser(false), (req, res, next) => {
  const id = req.params.id
  db.collection("users").doc(id).get()
    .then((data) => data.data())
    .then((data) => res.status(201).send(data))
    .catch(next)
})

//*eliminar favoritos
router.put("/favs/:id", validateUser(true), (req, res, next) => {

  const fav = req.params.id
  const user = req.user;

  console.log(user);

  let newData;

  if (!user.favoritos || !user.favoritos.length) newData = [fav];
  else if (user.favoritos.includes(fav)) newData = user.favoritos.filter((favorito) =>  favorito !== fav );
  else newData = [ ...user.favoritos, fav ];

  const favfinal = [... new Set(newData)];

  db.collection("properties").doc(fav).get()
  .then(rta => {
    if (rta.data() || !favfinal.includes(rta.id)) {

      db.collection("users").doc(user.id).update({ favoritos: favfinal })
      .then(() => {
        res.status(201).send({msg: "Puesto como favorito correctamente"})
      })
    }
    else {

      res.status(401).send({msg: "Esa propiedad no existe"})
    }
  })
  .catch(err => {
    res.status(401).send({msg: "Esa propiedad no existe"})
  })
})

router.put("/ownerForm/:id", validateUser(true), (req, res, next) => {
  const id = req.params.id
  
  const data= req.body;

  if (req.user.id !== id) return res.status(401).send({msg:"Not your user"});

  if (data.email && data.email !== req.user.email) {
    data.emailVerified = false;

    data.emailHash = crypto.randomBytes(3).toString('hex').toUpperCase();

    console.log("lo cambio jeje");

    getHtml("confirm-email")
    .then(html=> {
      const mailOptions = {
        from: process.env.EMAIL,
        to: data.email,
        subject: 'Bienvenido a Espacio por Tiempo',
        html: html.replace("{{link}}", `http://ext-api.web.app/verify-email/${req.user.id}/${data.emailHash}`)
      }; 
      
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) return res.status(401).send({msg:"Invalid email"})

        db.collection("users").doc(id).update(data)
        .then((data) => {
          res.status(201).send({msg: "Editado perfectamente"});
        })
        .catch(next)
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({msg: "No se pudo generar el contenido del mail"});
    })
  }
  else {
    db.collection("users").doc(id).update(data)
        .then((data) => {
          res.status(201).send({msg: "Editado perfectamente"});
        })
        .catch(next)
  }



})


router.get('/favorites/:id', validateUser(false), (req, res, next) => {
  const id = req.params.id;
  db.collection('users').doc(id).get()
    .then((data) => {
      const user = data.data()
      
      Promise.all(user.favoritos.map(uid =>
        db.collection("properties").doc(uid).get()
        .then(data => ({...data.data(), id: data.id}))

      )).then(arr =>{
        res.json(arr);
      })

    })
    .catch(next)
})

router.get('/by-email', validateUser(false), (req, res, next) => {
  const query = (req.query.s || "").toLowerCase();
  //return res.status(500).send({msg:"hey"})
  if (query.length < 4) return res.status(401).send({msg:"Query muy breve"})

  db.collection('users').get()
    .then(rta => rta.docs)
    .then(usersData => {
      for (let userData of usersData) {
        const user = userData.data();

        if (user.email.split("@")[0].toLowerCase() == query ||
         (
           user.email.slice(0,query.length) == query && query.includes("@")
         )) {
          return res
          .status(200)
          .json({ ...user, uid: user.id})
        }
      }
      return res
          .status(200)
          .json({ msg: "Any user with that mail was found"})
    })
    .catch(next)
})

/*
//* traer un user
router.get('/:mail', (req, res, next) => {
  const mail = req.params.mail
  db.collection('users').where('email', '==', mail).get()
    .then(usuario => {
      if (usuario) {
        res
          .status(200)
          .json(
            usuario.forEach(user => {
              const data = user.data()
              res.json({
                data,
                id: user.id
              })
            }))
      }
      else {
        res.sendStatus(404)
      }
    })
    .catch(next)
})*/


router.get('/', validateAdmin(), (req, res, next) => {
  const query = req.query.s.toLowerCase();

  db.collection('users').get()
    .then(rta => rta.docs)
    .then(users => {
      const result = users.map(userData => {
        const user = userData.data();
        if (!query) return {...user, id: user.id}
        const full = (user.firstName + " " + user.lastName).toLowerCase();



        if (user.firstName.slice(0,query.length).toLowerCase() == query) return { ...user, uid: user.id, match:"firstName"};
        if (user.lastName.slice(0,query.length).toLowerCase() == query) return { ...user, uid: user.id, match:"lastName"};
        if (full.slice(0,query.length).toLowerCase() == query.trim()) return { ...user, uid: user.id, match:"fullName"};
        if (user.email.slice(0,query.length).toLowerCase() == query) return { ...user, uid: user.id, match:"email"};
        if (full.includes(query)) return { ...user, uid: user.id, match:"name"};


        return false;
      }).filter(a=>a);


      res
        .status(200)
        .json(result)
    })
    .catch(next)
})



module.exports = router