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
        return ((!condicion.n || propiedad.neighborhood == condicion.n)
          && (!condicion.p || propiedad.province == condicion.p)
          && (!condicion.t || propiedad.type == condicion.t)
          && (condicion.v == true ? propiedad.verified == true : true))
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
        .status(201)
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
  console.log(body)
  const update = {};

  const dataTypes = {
    photos: "object",
    visible: "boolean",
    title: "string",
    description: "string",
  }

  Object.keys(dataTypes).forEach(key => {
    if (dataTypes[key] == "boolean") update[key] = (body[key] == "true" || body[key] == true);
    else if (typeof body[key] == dataTypes[key]) update[key] = body[key];
  })

  db.collection('properties').doc(id).update(update)
    .then(data => {
      res.status(200).send({msg:"Editado correctamente"})
    })
    .catch(next)
})



router.get("/:page", (req, res) => {
  const pagesCount = 10;

  const condicion = req.query

  if (isNaN(req.params.page)) res.status(401).json({msg: "Page must be a number"})

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
        return ((!condicion.n || propiedad.neighborhood == condicion.n)
          && (!condicion.p || propiedad.province == condicion.p)
          && (!condicion.t || propiedad.type == condicion.t)
          && (!condicion.max || Number(propiedad.price) <= Number(condicion.max))
          && (!condicion.min || Number(propiedad.price) >= Number(condicion.min))
          && (!condicion.v || propiedad.verified == true)
          && (!condicion.photos || (propiedad.photos || []).length > 0))
          && (propiedad.visible != false)
      })

      return filtrado.sort((a,b)=> ((a.verified==true) && (b.verified==false)) ? -1 : 1);
    })
    .then(properties => {
      const maxPage = Math.ceil(properties.length/pagesCount);
      let page = ((req.params.page-1) % maxPage)+1;
      res.status(200).json({
        properties: properties.slice(pagesCount*(page-1), pagesCount*(page-1) + pagesCount),
        pages: maxPage,
        total: properties.length,
      })
      
    })

    .catch(err => {
      res.send(`
          <h1>Internal server error</h1>
          <pre>${err}</pre>

        `)
    })
})


module.exports = router