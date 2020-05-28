const router = require('express').Router()
const db = require("../services/firebase").admin.firestore();

const { validateUser, validateAdmin } = require("../authenticate");

const dataTypes = {
  visible: "boolean",
  neighborhood: "string",
  province: "string",
  type: "string",
  street: "string",
  streetNumber: "string",
  size: "string",
  capacity: "string",
  price: "string",
  cleanup: "string",
  rules: "string",
  observations: "string",
  description: "string",
  title: "string",
  floor: "string",
  apt: "string",
  services: "object",
  photos: "object"
};

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
});

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
});

//* buscar todos los espacios de un usuario
router.get("/userSpaces", validateUser(false), (req, res, next) => {
  const id = req.userId;
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
});

//* buscar un solo espacio
router.get("/singleSpace/:id", (req, res, next) => {
  const id = req.params.id
  db.collection("properties").doc(id).get()
    .then((data) => {
      const final = data.data()
      final.id = data.id
      res.status(200)

        .json(final)
    })
    .catch(next)
});

//* crear un espacio
router.post("/createSpace", validateUser(false), (req, res, next) => {
  const body = req.body;
  const obj = { enabled: false, comments: [], userId: req.userId, createdAt: new Date().getTime(), updatedAt: new Date().getTime() };
  let error = "";


  Object.keys(dataTypes).forEach(key => {
    if (body[key] == undefined) return;
    else if (typeof body[key] == dataTypes[key]) obj[key] = body[key];
    else error = `Error: ${key} no corresponde al tipo de dato "${dataTypes[key]}"`;
  })
  
  if (error) return res.status(400).send({ msg: error });
  if (!Object.values(obj).length) return res.status(400).send({ msg: "Mal el formato del body" });

  db.collection("properties").add(obj)
    .then((data) => {
      res
        .status(201)
        .json(data.id)
    })
    .catch(next)
})


//* eliminar un espacio 
/*

router.delete("/deleteSpace/:id", (req, res, next) => {
  const id = req.params.id
  db.collection("properties").doc(id).delete()
    .then(() => {
      res.sendStatus(200)
    })
    .catch(next)
})*/


router.put("/verify/:id", validateAdmin(), (req, res) => {
  db.collection('properties').doc(req.params.id).update({verified: true})
  .then(()=>{
    res.send({ msg: "Verificado correctamente"});
  })
  .catch(()=>{
    res.status(500).send({ msg: "Hubo un error interno actualizando ese espacio. " })
  })
})

router.put("/unverify/:id", validateAdmin(), (req, res) => {
  db.collection('properties').doc(req.params.id).update({verified: false})
  .then(()=>{
    res.send({ msg: "Puesto como no verificado correctamente"});
  })
  .catch(()=>{
    res.status(500).send({ msg: "Hubo un error interno actualizando ese espacio. " })
  })
})

router.put("/enable/:id", validateAdmin(), (req, res) => {
  db.collection('properties').doc(req.params.id).update({enabled: true, rejected: false})
  .then(()=>{
    res.send({ msg: "Habilitado correctamente"});
  })
  .catch(()=>{
    res.status(500).send({ msg: "Hubo un error interno actualizando ese espacio. " })
  })
})

router.put("/disable/:id", validateAdmin(), (req, res) => {
  db.collection('properties').doc(req.params.id).update({enabled: false, rejected: true})
  .then(()=>{
    res.send({ msg: "Deshabilitado correctamente"});
  })
  .catch(()=>{
    res.status(500).send({ msg: "Hubo un error interno actualizando ese espacio. " })
  })
})

//* updatear un espacio 
router.put('/update/:id', validateUser(false), (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  const update = { enabled: false, updatedAt: new Date().getTime(), rejected: false };

  //res.header('Access-Control-Allow-Origin', req.header('origin') );



  let error = "";
  console.log(body);
  
  db.collection('properties').doc(id).get()
  .then(space => space.data())
  .then((space) => {
    
    console.log(req.userId)
    if (space.userId != req.userId) return res.status(401).send({msg: "This's not your property!"});
    
    
    Object.keys(dataTypes).forEach(key => {
      if (body[key] == undefined) return;
      else if (typeof body[key] == dataTypes[key]) update[key] = body[key];
      else error = `Error: ${key} no corresponde al tipo de dato "${dataTypes[key]}"`;
    })
    
    if (error) return res.status(400).send({ msg: error });
    if (!Object.values(update).length) return res.status(400).send({ msg: "Mal el formato del body" });
    //if (!body.uid) return res.status(401).send({ msg: "Error: tenes que pasar el uid del usuario" });

    console.log(update);

    db.collection('properties').doc(id).update(update)
      .then(() => {
        res.status(200).send({ msg: "Editado correctamente" })
      })
      .catch(err => {
        res.status(500).send({ msg: "Error: hubo un error actualizando la propiedad" });
      })    
  })
  .catch(err => {
    res.status(500).send({ msg: "Error: hubo un error buscando la propiedad" });
      
  })
})

router.put('/coordenadas/:id', validateUser(false), (req, res, next) => {
  const id = req.params.id
  const propiedad = req.body
  db.collection('properties').doc(id).get()
    .then(rta => rta.data())
    .then(prop => {
      if (prop.userId != req.userId) return res.status(401).send({msg: "This's not your property!"});

      db.collection('properties').doc(id).update({ location: propiedad })
        .then(data => {
          res.sendStatus(200)
        })

    })

    .catch(next)
})



router.get('/comments/:id', (req, res, next) => {
  const id = req.params.id
  db.collection("properties").doc(id).get()
    .then(data => {
      let comentarios = data.data().comments;
      // let habilitado = true

      // //Si el user ya comento va a devolverle un se
      // comentarios.forEach(elemento => {
      //   if (elemento.userId === req.body.userId) habilitado = false
      // })
      res.status(200)
        // .json({ comentarios, habilitado })
        .json(comentarios)
    })
    .catch(next)
})

// RUTA PARA INGRESAR NUEVO COMENTARIO
router.put('/comments/:id', (req, res, next) => {

  const id = req.params.id

  db.collection("properties").doc(id).get()
    .then(data => {
      let comentarios = data.data().comments;
      let newComment = {
        "userId": req.body.userId,
        "comment": req.body.comment,
        "nombre": req.body.nombre,
        "habilitado": true
      }
      comentarios.push(newComment)
      db.collection('properties').doc(id).update({ comments: comentarios })
        .then(data => {

          db.collection("properties").doc(id).get()
            .then(data => {
              let comentarios = data.data().comments;
              res.status(200).send(comentarios)
            })

        })
        .catch(next)
    })
})

//Respuesta del dueño, pasa el id de la propiedad por propertyId, y el indice del comment por commentIndex
router.put('/response', (req, res, next) => {
  let { propertyId, commentIndex } = req.query

  db.collection("properties").doc(propertyId).get()
    .then(data => {

      let comentarios = data.data().comments;

      comentarios[commentIndex].response = req.body.response

      db.collection('properties').doc(propertyId).update({ comments: comentarios })
        .then(data => {

          db.collection("properties").doc(propertyId).get()
            .then(data => {
              let comentarios = data.data().comments;
              res.status(200).send(comentarios)
            })

        })
    })
    .catch(next)
  // res.send({ 'La propiedad en la que esta el comment': propertyId, 'El comment al que se quiere responder': commentIndex })
})


router.get("/:page", (req, res) => {
  const pagesCount = 10;

  const condicion = req.query

  if (isNaN(req.params.page)) res.status(401).json({ msg: "Page must be a number" })

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
          && ((propiedad.enabled == true && !condicion.enabled) || (!propiedad.enabled && (condicion.enabled || condicion.rejected )))
          && ((!propiedad.rejected && !condicion.rejected) || (propiedad.rejected && condicion.rejected))
      })
      if (condicion.enabled) return filtrado.sort((a,b) => (b.updatedAt || 0 ) - (a.updatedAt || 0 ));
      return filtrado.sort((a, b) => (a.verified === b.verified) ? 0 : a.verified ? -1 : 1 )
     
    })
    .then(properties => {
      const maxPage = Math.ceil(properties.length / pagesCount);
      let page = ((req.params.page - 1) % maxPage) + 1;

      const spaces = properties
      .slice(pagesCount * (page - 1), pagesCount * (page - 1) + pagesCount)
      .map(space => ({
        title: space.title,
        photos: space.photos,
        id: space.id,
        price: space.price,
        size: space.size,
        neighborhood: space.neighborhood,
        province: space.province,
        createdAt: space.createdAt,
        updatedAt: space.updatedAt
      }))

      res.status(200).json({
        properties: spaces,
        pages: maxPage,
        total: properties.length,
        markers: properties.filter(a => a.location && a.location[0]).map(a => ({...a.location[0], id: a.id})),
      })

    })

    .catch(err => {
      res.send(`
          <h1>Internal server error</h1>
          <pre>${err}</pre>

        `)
    })
})


module.exports = router;