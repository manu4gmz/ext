const router = require('express').Router()
const db = require("../services/firebase").admin.firestore();
const transporter = require("./nodemailer");
const { validateUser, validateAdmin } = require("../authenticate");
const crypto = require("crypto");
const Promise = require("bluebird");

const fs = require("fs");
const path = require("path");

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

const dataTypes = {
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

router.put("/confirm-stay/:id", validateUser(true), (req,res,next) => {
  console.log(req.params.id, req.body.uid)

  db.collection("users").doc(req.body.uid).get()
  .then(rta => rta.data())
  .then(user => {
    db.collection("properties").doc(req.params.id).get()
    .then(rta => rta.data())
    .then(space => {
      if (space.userId !== req.user.uid) return res.status(403).send({msg:"Not your property!"});
      
      const confirmHash = crypto.randomBytes(3).toString('hex').toUpperCase();
      
      return db.collection("users").doc(req.body.uid).update({confirmHash: [...(user.confirmHash || []), confirmHash]})
      .then(()=> {
        getHtml("confirm-stay")
        .then(html => {
          const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Confirmar estadía',
            html: html
              .replace("{{title}}", space.title)
              .replace("{{link}}", `https://ext-api.web.app/confirm-stay/${req.params.id}/${req.body.uid}/${confirmHash}`)
          }; 
        

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) return res.status(401).send({msg:"Invalid email"})
          else {
            res.status(200).send({msg:"Confirmación enviada correctamente"});
            
          }
        });
      });
    })
    .catch(err => res.status(500).send({msg:"Error getting user"}) )
  })
})
})

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
router.post("/createSpace", validateUser(true), (req, res, next) => {
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

      getHtml("created-space")
      .then(html => {
        const mailOptions = {
          from: process.env.EMAIL,
          to: "manuel4gmz@gmail.com",
          subject: 'Nuevo Espacio',
          html: html
            .replace("{{title}}", obj.title)
            .replace("{{name}}", `${req.user.firstName} ${req.user.lastName}`)
            .replace("{{images}}", (obj.photos || []).map(src => `<img style="height: 240px;margin: 6px; border-radius: 3px;" src="${src}">`))
            .replace("{{imagesLength}}", (obj.photos || []).length)
            .replace("{{link}}", `https://ext-api.web.app/admin/spaces/details/${data.id}`)
        }; 
  
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) return res.status(401).send({msg:"Invalid email"})
        });

      })

      res
        .status(201)
        .json(data.id)

    })
    .catch(next);
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
  db.collection("properties").doc(req.params.id).get()
  .then(rta => rta.data())
  .then((space)=>{
    db.collection('properties').doc(req.params.id).update({enabled: true, rejected: false})
    .then(()=>{
      db.collection("users").doc(space.userId).get()
        .then(rta => rta.data())
        .then(user => {
          const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Espacio por Tiempo',
            text: `Hola ${req.user.firstName}, \
Tu espacio "${space.title}" ha sido habilitado!\

${!space.verified ? "Recuerda que para mejorar la visibilidad de tu publicación puedes verificar el mismo. Consulta por contacto@espacioportiempo.com":""}
  `
        }; 
    
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) return res.status(401).send({msg:"Invalid email"})
          });
          
        })
      res.send({ msg: "Habilitado correctamente"});
    })
    .catch(()=>{
      res.status(500).send({ msg: "Hubo un error interno actualizando ese espacio. " })
    })
  })
})

router.put("/disable/:id", validateAdmin(), (req, res) => {
  db.collection("properties").doc(req.params.id).get()
  .then(rta => rta.data())
  .then((space)=>{
    return db.collection('properties').doc(req.params.id).update({enabled: false, rejected: true, reason: req.body.reason})
    .then(()=>{
      
      db.collection("users").doc(space.userId).get()
      .then(rta => rta.data())
      .then(user => {
        const mailOptions = {
          from: process.env.EMAIL,
          to: user.email,
          subject: 'Espacio por Tiempo',
          text: `Hola ${req.user.firstName}, \
  \n${req.body.reason}\n
Solicitamos que se realicen los cambios correspondientes para poder aprobar el espacio.

Saludos,
Equipo de Espacio por Tiempo\
  `
        }; 
  
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) return res.status(401).send({msg:"Invalid email"})
        });
      })
  
      res.send({ msg: "Deshabilitado correctamente"});
    })

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
  const updateData = {};
  //res.header('Access-Control-Allow-Origin', req.header('origin') );

  if (body.visible != undefined) update.visible = body.visible;

  let error = "";
  console.log(body);
  
  db.collection('properties').doc(id).get()
  .then(space => space.data())
  .then((space) => {
    
    console.log(req.userId)
    if (space.userId != req.userId) return res.status(401).send({msg: "This's not your property!"});
    
    
    Object.keys(dataTypes).forEach(key => {
      if (body[key] == undefined) return;
      else if (typeof body[key] == dataTypes[key]) updateData[key] = body[key];
      else error = `Error: ${key} no corresponde al tipo de dato "${dataTypes[key]}"`;
    })
    
    if (error) return res.status(400).send({ msg: error });
    if (!Object.values(update).length || !Object.values(updateData).length) return res.status(400).send({ msg: "Mal el formato del body" });
    //if (!body.uid) return res.status(401).send({ msg: "Error: tenes que pasar el uid del usuario" });

    console.log(update, updateData);

      console.log({ ...update, updateData});
    db.collection('properties').doc(id).update({ ...update, updateData})
      .then(() => {
        res.status(200).send({ msg: "Editado correctamente" })
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({ msg: "Error: hubo un error actualizando la propiedad" });
      })    
  })
  .catch(err => {
    console.log(err);
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

//Respuesta del dueño, pasa el id de la propiedad por propertyId, y el indice del comment por commentIndex
router.post('/comments/:propid/:commentid', validateUser(false), (req, res, next) => {
  //let { propertyId, commentIndex } = req.query

  const { propid, commentid } = req.params;

  db.collection("properties").doc(propid).get()
    .then(rta => rta.data())
    .then(space => {
      if (space.userId != req.userId) return res.status(401).send({msg: "No es tu espacio"});
      if (!req.body.comment)  return res.status(400).send({msg: "No hay comentario"});

      return db.collection("properties").doc(propid).collection("comments").doc(commentid).get()
      .then(comment=>{
        console.log(comment.data())
        if (!comment.data()) return res.status(400).send({msg:"Ese comentario no existe"});
       
        db.collection("properties").doc(propid).collection("comments").doc(commentid).update({response: req.body.comment}, {merge: true})
          .then(()=>{
            res.send({
              msg: "respuesta añadida correctamente"
            })
          })
      })


    })
    .catch(next)
  
//   .collection("comments").doc(commentid).get()
// //  db.collection("properties").doc(propertyId).get()
//     .then(data => {

//       let comentarios = data.data().comments;

//       comentarios[commentIndex].response = req.body.response

//       db.collection('properties').doc(propertyId).update({ comments: comentarios })
//         .then(data => {

//           db.collection("properties").doc(propertyId).get()
//             .then(data => {
//               let comentarios = data.data().comments;
//               res.status(200).send(comentarios)
//             })

//         })
//     })
//     .catch(next)
  // res.send({ 'La propiedad en la que esta el comment': propertyId, 'El comment al que se quiere responder': commentIndex })
})


router.get('/comments/:id', (req, res, next) => {
  const id = req.params.id
  db.collection("properties").doc(id).collection("comments").get()
    .then(data => data.docs)
    .then(comments => {
      //let comentarios = data.data().comments;
      return Promise.all(
        comments
          .filter(a=>a.data().author)
          .map(commentData => {
            const comment = commentData.data();
            return db.collection("users").doc(comment.author).get()
              .then(rta => rta.data())
              .then(user => ({ name: user.firstName + " " + user.lastName, ...comment, id: commentData.id }) )
          })
      )
      .then(comments => {
      
        res.status(200).json(comments.sort((a,b) => b.date - a.date))
      })
    })
    .catch(next)
})

// RUTA PARA INGRESAR NUEVO COMENTARIO
router.post('/comments/:id', validateUser(false), (req, res, next) => {

  const id = req.params.id;

  db.collection("properties").doc(id).get()
    .then(rta => rta.data())
    .then(space => {
      //console.log(space.rents,)
      if (!(space.rents || []).includes(req.userId)) return res.status(401).send({msg:"No alquilaste aca"});

      if (!req.body.comment) return res.status(400).send({ msg: "No hay comentario" });
      if (!req.body.rating) return res.status(400).send({ msg: "No hay rating" });
      const rating = Number(req.body.rating);
      if (isNaN(rating) || rating > 5 || rating < 1) return res.status(400).send({ msg: "Rating invalido" });

      db.collection("properties").doc(req.params.id).collection("comments").where("author","==",req.userId).get()
      .then((data)=>data.docs)
      .then((comments) => {
        if (comments && comments.length) {
          console.log(comments);
          return res.status(401).send({ msg: "Ya comentaste en este lugar" });
        }
        db.collection("properties").doc(req.params.id).collection("comments").add({
          author: req.userId,
          comment: req.body.comment,
          rating: req.body.rating,
          date: (new Date()).getTime()
        })
        .then(()=>{
          res.send({
            msg: "Agregado tu comentario correctamente"
          })
        })
        .catch(()=>{
          res.status(500).send({
            msg: "hubo un error interno"
          })
        })
      })      

      
      // comentarios.push(newComment)
      // db.collection('properties').doc(id).update({ comments: comentarios })
      //   .then(data => {

      //     db.collection("properties").doc(id).get()
      //       .then(data => {
      //         let comentarios = data.data().comments;
      //         res.status(200).send(comentarios)
      //       })

      //   })
      //   .catch(next)
    })
})

const fields = [
  "Casa",
  "Quinta",
  "Depósito",
  "Habitación",
  "Oficina",
  "Salón",
  "Terreno" 
]

function fromQuery(num) {
  const valid = [];        
  for (let n = num, i = 0; n > 0; i++, n = Math.floor(n/2)) if (n%2 == 1) valid.push(fields[i]);
  return valid;
}

// Props to Chuck for this awesome equation found in Stack Overflow

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

router.get("/from-distance", (req, res) => {
  const maxDistance = req.body.maxDistance;
  const location = req.body.location;

  console.log(maxDistance, location);

  return res.send({ msg: "Yay!" });
})

router.get("/:page", (req, res) => {
  const pagesCount = 10;

  const condicion = req.query;

  /****************
   * 
   *   Temporal
   * 
   ****************/

  condicion.type = condicion.t;

  if (isNaN(req.params.page)) res.status(401).json({ msg: "Page must be a number" })

  db.collection("properties")
    .where("enabled","==", !condicion.rejected)
    .where("visible","==",true)
    .get()
    .then((data) => {
      const arr = data.docs.map(lugar => {
        const propiedad = lugar.data()
        propiedad.id = lugar.id
        return {
          ...propiedad
        }
      })

      if (condicion.t) {
        condicion.type = fromQuery(condicion.t);
        console.log(condicion.type);
      }

      const suggested = [];

      const filtrado = arr.filter(propiedad => {
        //if (((!condicion.n      || propiedad.neighborhood == condicion.n))
        if (true
          && (!condicion.type   || (typeof condicion.type == "object" && condicion.type.includes(propiedad.type)))
          && (!condicion.max    || Number(propiedad.price) <= Number(condicion.max))
          && (!condicion.min    || Number(propiedad.price) >= Number(condicion.min))
          && (!condicion.v      || propiedad.verified == true)
          && (propiedad.visible == true || propiedad.visible == "true")
          && ((propiedad.enabled == true && !condicion.enabled) || (!propiedad.enabled && (condicion.enabled || condicion.rejected )))
          && ((!propiedad.rejected && !condicion.rejected) || (propiedad.rejected && condicion.rejected)))
            return true;
        else if (
          !condicion.enabled && !condicion.rejected && propiedad.visible != false && propiedad.enabled == true
          && (!condicion.type   || (typeof condicion.type == "object" && condicion.type.includes(propiedad.type))) && Object.keys(condicion).length
        ) suggested.push(propiedad);
        else return false;
      })
      if (condicion.enabled) return [filtrado.sort((a,b) => (b.updatedAt || 0 ) - (a.updatedAt || 0 ))];
      return [
        filtrado.sort((a, b) => (a.verified === b.verified) ? 0 : a.verified ? -1 : 1 ),
        suggested.sort((a, b) => (a.verified === b.verified) ? 0 : a.verified ? -1 : 1 ),
      ]
      
    })
    .then(results => {
      return db.collection("advertisements").get()
      .then(rta => rta.docs.map(data => data.data()))
      .then(ads => {
        return ads.map(ad => {
          let scoring = 0;

          if (ad.tags && typeof ad.tags == "object") {
            Object.keys(ad.tags).forEach((key)=>{
              console.log(key, condicion[key], ad.tags[key])
              if (condicion[key] == ad.tags[key] || 
                (typeof condicion[key] == "object" && 
                  condicion[key]
                  .some(val => val == ad.tags[key] || (typeof ad.tags == "object" && ad.tags[key].includes(val))))
                ) scoring += 1;
              console.log (scoring == 1)
            })
          }

          return { ...ad, scoring };
        })
        
      })
      .then(ads => {
        console.log(ads);
        return ads;
        //return ads.sort((a,b) => a.scoring - b.scoring);
      })
      .then(ads => [...results, ads])

    })
    .then(([properties, suggested, ads]) => {
      const maxPage = Math.ceil(properties.length / pagesCount);
      let page = req.params.page || 1;
      
      // const spaces = properties
      // .slice(pagesCount * (page - 1), pagesCount * (page - 1) + pagesCount)
      // .map(space => ({
      //   title: space.title,
      //   photos: space.photos,
      //   id: space.id,
      //   price: space.price,
      //   size: space.size,
      //   neighborhood: space.neighborhood,
      //   province: space.province,
      //   createdAt: space.createdAt,
      //   updatedAt: space.updatedAt
      // }))

      function mapReducedSpace (space) {
        return {
          title: space.title,
          photos: space.photos,
          id: space.id,
          verified: space.verified,
          size: space.size,
          neighborhood: space.neighborhood,
          province: space.province,
          createdAt: space.createdAt,
          updatedAt: space.updatedAt,
          type: space.type
        }
      }

      Promise.all(
        properties
          .slice(pagesCount * (page - 1), pagesCount * (page - 1) + pagesCount)
          .map((space)=>{
      //console.log(space.type);

            return db.collection("properties").doc(space.id).collection("comments").get()
              .then(comments => comments.docs)
              .then(comments => {
                return {
                  ...mapReducedSpace(space),
                  rating: Math.round(comments.filter(c => !isNaN(c.data().rating)).reduce((acc, c) => acc+Number(c.data().rating), 0) / comments.length) || undefined
                }
              })
          })
        
      )
      .then(spaces => {
        //console.log(suggested)

        if (spaces.length >= pagesCount || suggested.length == 0) return [spaces, [], [ads[(page*2) % ads.length], ads[(page*2 + 1) % ads.length]]];
        let complement = pagesCount - (properties.length % pagesCount);
        console.log(complement);

        const x = (page - 1 - Math.ceil(properties.length/pagesCount))*pagesCount + complement;

        //if (Math.ceil((properties.length+suggested.length)/pagesCount) < page) return [[], []];
        console.log(x, x+pagesCount)

        return [
          spaces, 
          suggested.slice(x > 0 ? x : 0, x+pagesCount).map(mapReducedSpace),
          [ads[(page*2) % ads.length], ads[(page*2 + 1) % ads.length]]
        ]

      })
      .then(([spaces, suggestions, ads]) => {

        
        res.status(200).json({
          properties: spaces,
          suggestions,
          ads,
          pages: Math.ceil((properties.length+suggested.length)/pagesCount),
          total: properties.length,
          markers: properties.filter(a => a.location && a.location[0]).map(a => ({...a.location[0], id: a.id})),
        })
        
      })
    })

    .catch(err => {
      res.send(`
          <h1>Internal server error</h1>
          <pre>${err}</pre>

        `)
    })
})

router.get("/", (req, res) => {
  res.redirect("1");
});

module.exports = router;