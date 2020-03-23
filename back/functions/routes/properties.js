const router = require('express').Router()
const db = require("../services/firebase").admin.firestore();

//? buscar todos los espacios 
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

//TODO: buscar todos los espacios de un usuario
router.get("/userSpaces/:id", (req, res, next) => {
  const id = req.params.id
  db.collection("properties").where('userId', '==', id).get()
    .then((data) => {
      res.status(200)
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

//? buscar un solo espacio !! 
router.get("/singleSpace/:id", (req, res, next) => {
  const id = req.params.id
  db.collection("properties").doc(id).get()
    .then((data) => {
      res.status(200)
        .json(data.data())
    })
    .catch(next)
})

//TODO: crear un espacio!!
router.post("/createSpace", (req, res, next) => {
  const body = req.body
  db.collection("properties").set(body)
    .then(() => res.sendStatus(201))
    .catch(next)
})

//? eliminar un espacio !!
router.delete("/deleteSpace/:id", (req, res, next) => {
  const id = req.params.id
  db.collection("properties").doc(id).delete()
    .then(() => {
      res.sendStatus(200)
    })
    .catch(next)
})


module.exports = router