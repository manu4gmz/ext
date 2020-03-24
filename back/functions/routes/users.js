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
  db.collection('users').set(data)
    .then(() => res.sendStatus(201))
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


module.exports = router