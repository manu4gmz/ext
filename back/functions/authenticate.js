const fb = require("./services/firebase").admin;

const db = fb.firestore();
const auth = fb.auth();

function validateUser(fetchUser = true) {
    return function (req,res,next) {
      const idToken = req.headers.authorization //req.query.idToken;
      
      if (!idToken) return res.status(401).send({msg:"Not logged in"});
  
      auth.verifyIdToken(idToken)
      .then(function(decodedToken) {
        let uid = decodedToken.uid;
        req.userId = uid; 
  
        if (fetchUser) {
          db.collection("users").doc(uid).get()
            .then(userData => {
              const user = userData.data();
  
              delete user.id;

              req.user = { 
                ...user, 
                uid: uid,

              };

              
              next();
            })
        }
        else next();
      }).catch(function(error) {
        res.status(401).send({msg:"Not valid idToken"})
      });
    }
  }

  
module.exports = validateUser;