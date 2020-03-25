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
        propiedad.zone.includes(condicion.z) && propiedad.city.includes(condicion.c) && propiedad.type.includes(condicion.t)
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
      res
        .status(200)
        .json(data.docs.map(userProperties => {
          const data = userProperties.data()
          return {
            ...data,
            id: userProperties.id
          }
        }
        ))
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
  db.collection("properties").set(body)
    .then(() => res.sendStatus(201))
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


module.exports = router