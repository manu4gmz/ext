
const functions = require('firebase-functions');
const express = require('express');
const app = express();

/*const firebaseConfig = {
    apiKey: "AIzaSyCWv3QVEnTirYnhPN-xgN7pFSMPQHhr15c",
    authDomain: "ext-api.firebaseapp.com",
    databaseURL: "https://ext-api.firebaseio.com",
    projectId: "ext-api",
    storageBucket: "ext-api.appspot.com",
    messagingSenderId: "910305767737",
    appId: "1:910305767737:web:3afc21eda6944cf2ef38e8",
    measurementId: "G-HE5RQQ8N5Y"
}
*/

//firebase.initializeApp(firebaseConfig);
//
const db = require("./services/firebase").admin.firestore();




app.get("/api/users/:id/users", (req,res)=>{
	const id = req.params.id;
	db.collection("propietarios").doc(id).collection("users").get()
	.then(users => {
		res.send(users.docs.map(a=>a.data()))
	})
	//.then(_=>res.send("todo piola"))
})

app.post("/api/users/:id/users", (req,res)=>{
	const id = req.params.id;
	db.collection("propietarios").doc(id).collection("users").add(req.body)
	.then(user => {
		res.send(user)
	})
	//.then(_=>res.send("todo piola"))
})

//buscar uuno
app.get("/api/users/:id", (req,res)=>{
	const id = req.params.id;
	db.collection("propietarios").doc(id).get()
	.then(user => {
		res.send(user.data())
	})
	//.then(_=>res.send("todo piola"))
})


//buscar muchos
app.get("/api/users", (req,res)=>{
	db.collection("propietarios").get()
	.then(users => {
		res.send(users.docs.map((doc)=>{
			const data = doc.data()
			return { 
				...data,
				id: doc.id
			};
		}))
	})
	//.then(_=>res.send("todo piola"))
})




app.get('/api/timestamp', (req, res) => {
  res.send(`${Date.now()}`);
})
app.post('/api/getUser', (req, res) => {
  console.log(req.body)
  return res.send('succes')
})

app.get('/api', (req, res) => res.send('App On'))

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.app = functions.https.onRequest(app);
