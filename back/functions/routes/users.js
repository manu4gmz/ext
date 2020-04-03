const router = require('express').Router()
const db = require("../services/firebase").admin.firestore();

//* buscar todos los usuarios
router.get('/', (req, res, next) => {
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

//* promover un user
router.put('/update/:id', (req, res, next) => {
  const id = req.params.id
  const data = req.body
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

router.get('/info/:id', async (req, res, next) => {
  const id = req.params.id
  const data = await db.collection('users').doc(id).get()
  res
    .status(200)
    .json(data.data())
})

//* agregar favoritos
router.put('/fav/:id', (req, res, next) => {
  console.log(req.body)
  const id = req.params.id
  const dataaa = req.body.id
  db.collection('users').doc(id).get()
  .then((data)=>{
    const newdata= data.data()
    newdata.favoritos.push(dataaa)
    const favfinal = [... new Set(newdata.favoritos)]
    db.collection("users").doc(id).update({favoritos: favfinal})
    
  })
  .then(() => {
  res.status(201)
  })
  .catch(next)
  })

//*buscar favoritos
router.get("/favs/:id",(req,res,next)=>{
  const id = req.params.id
  db.collection("users").doc(id).get()
    .then((data)=>data.data())
    .then((data)=>res.status(201).send(data))
    .catch(next)
})

module.exports = router