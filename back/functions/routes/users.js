const router = require('express').Router()
const fb = require("../services/firebase").admin;

const db = fb.firestore();

const validateUser = require("../authenticate");

const Promise = require("bluebird");
//* buscar todos los usuarios


router.get("/authenticate", validateUser(), (req,res,next) => {
  res.json(req.user)
})
router.get("/only-logged", validateUser(false), (req,res,next) => {
  res.json(req.userId)
})

//* agregar un user
router.post('/register', (req, res, next) => {
  const data = req.body
  db.collection('users').doc(data.id).set(data)
    .then((data) =>
      res
        .status(201)
        .json(data.id)
    )
    .catch(next)
})


router.put('/update/:id', validateUser(false), (req, res, next) => {
  const id = req.params.id;
  const data = req.body;



  db.collection('users').doc(id).set(data)
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

router.get('/info/:id', validateUser(false), async (req, res, next) => {
  const id = req.params.id
  const data = await db.collection('users').doc(id).get()
  res
    .status(200)
    .json(data.data())
})

//* agregar favoritos
router.put('/fav/:id', validateUser(false), (req, res, next) => {
  const id = req.params.id
  const dataaa = req.body.id
  db.collection('users').doc(id).get()
    .then((data) => {
      const newdata = data.data()
      newdata.favoritos.push(dataaa)
      const favfinal = [... new Set(newdata.favoritos)]
      db.collection("users").doc(id).update({ favoritos: favfinal })

    })
    .then(() => {
      res.sendStatus(201)
    })
    .catch(next)
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
router.put("/favs/:id", validateUser(false), (req, res, next) => {

  const id = req.params.id
  const fav = req.body.id
  db.collection("users").doc(id).get()
    .then((data) => {
      const newdata = data.data().favoritos.filter((favorito) => {
        return favorito !== fav
      })
      // const newdata = data.data()
      // const index = newdata.favoritos.indexOf(fav);
      // newdata.favoritos.splice(index, 1)
      const favfinal = [... new Set(newdata)]
      db.collection("users").doc(id).update({ favoritos: favfinal })
        .then(() => db.collection("users").doc(id).get()
          .then((data) => data.data())
          .then((data) => res.status(201).send(data))
          .catch(next))
    })
})

router.put("/ownerForm/:id", validateUser(false), (req, res, next) => {
  const id = req.params.id
  db.collection("users").doc(id).update(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address
    })
    .then((data) => {
      res.status(201).send({msg: "Editado perfectamente"})

    })
    .catch(next)

})


router.get('/favorites/:id', validateUser(false), (req, res, next) => {
  const id = req.params.id;
  db.collection('users').doc(id).get()
    .then((data) => {
      const user = data.data()
      
      Promise.all(user.favoritos.map(uid =>
        db.collection("properties").doc(uid).get()
        .then(data => data.data())

      )).then(arr =>{
        res.json(arr);
      })

    })
    .catch(next)
})

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
})

router.get('/', validateUser(false), (req, res, next) => {
  db.collection('users').get()
    .then(usuarios => {
      res
        .status(200)
        .json(usuarios.docs.map(user => {
          const data = user.data()
          return {
            ...data,
            id: user.id
          }
        }))
    })
    .catch(next)
})



module.exports = router