const router = require('express').Router()
const db = require("../services/firebase").admin.firestore();

//* buscar todos los espacios por filtros
router.get("/spaces", (req, res, next) => {
  const condicion = req.query

  db.collection("properties").get()
    .then((data) => {
      const arr = data.docs.map(lugar => {
        const propiedad = lugar.data()
        propiedad.id = lugar.id
        return {
          ...propiedad
        }
      })

      const filtrado = arr.filter(propiedad => {
        return ((condicion.z && propiedad.neighborhood == condicion.z)
          && (condicion.c && propiedad.province == condicion.c)
          && (condicion.t && propiedad.type == condicion.t)
          && (condicion.v && propiedad.verified == condicion.v))
      })

      res
        .status(200)
        .json(filtrado)
    })
    .catch(next)
})

//* buscar todos los espacios 
router.get("/allSpaces", (req, res, next) => {
  db.collection("properties").get()
    .then((data) => {
      res
        .status(200)
        .json(data.docs.map(propiedad => {
          const data = propiedad.data()
          return {
            ...data,
            id: propiedad.id
          }
        }))
    })
    .catch(next)
})

//* buscar todos los espacios de un usuario
router.get("/userSpaces/:id", (req, res, next) => {
  const id = req.params.id
  db.collection("properties").where('userId', '==', id).get()
    .then((data) => {
      const arr = data.docs.map(userProperties => {
        const data = userProperties.data()
        data.id = userProperties.id

        return {
          ...data
        }
      })

      res
        .status(200)
        .json(arr)
    })
})

//* buscar un solo espacio
router.get("/singleSpace/:id", (req, res, next) => {
  const id = req.params.id
  db.collection("properties").doc(id).get()
    .then((data) => {
      res.status(200)
        .json(data.data())
    })
    .catch(next)
})

//* crear un espacio
router.post("/createSpace", (req, res, next) => {
  const body = req.body
  db.collection("properties").add(body)
    .then((data) => {
      res
        .status(200)
        .json(data.id)
    })
    .catch(next)
})


//* eliminar un espacio 
router.delete("/deleteSpace/:id", (req, res, next) => {
  const id = req.params.id
  db.collection("properties").doc(id).delete()
    .then(() => {
      res.sendStatus(200)
    })
    .catch(next)
})


//* updatear un espacio 
router.put('/update/:id', (req, res, next) => {
  const id = req.params.id
  const body = req.body
  db.collection('properties').doc(id).update({ photos: body.photos })
    .then(data => {
      res.sendStatus(201)
    })
    .catch(next)
})

router.get('/comments/:id', (req, res, next) => {
  const id = req.params.id
  db.collection("properties").doc(id).get()
    .then(data => {
      let comentarios = data.data().comments;
      let habilitado = true

      //Si el user ya comento va a devolverle un se
      comentarios.forEach(elemento => {
        if (elemento.userId === req.body.userId) habilitado = false
      })

      // let habilitado = comments.forEach(elemento => {
      //   let resultado = true;
      //   if (elemento.userId === req.body.userId) {
      //     resultado =  false
      //   }
      //   return resultado
      // })

      res.status(200)
        .json({ comments, habilitado })
    })
    .catch(next)
})

router.put('/comments/:id', (req, res, next) => {

  const id = req.params.id

  db.collection("properties").doc(id).get()
    .then(data => {
      let comentarios = data.data().comments;

      //que no se pueda pedir un put si un comment con ese userId existe
      comentarios.forEach(elemento => {
        if (elemento.userId === req.body.userId) res.sendStatus(400)
      })

      let newComment = {
        "userId": req.body.userId,
        "comment": req.body.comment,
        "rating": req.body.rating,
        "habilitado": true
      }
      comentarios.push(newComment)

      db.collection('properties').doc(id).update({ comments: comentarios })
        .then(data => {
          res.sendStatus(201)
        })
    })
    // .then(() => { db.collection('properties').doc(id).update({ comments: comments }) })
    .catch(next)
})

module.exports = router