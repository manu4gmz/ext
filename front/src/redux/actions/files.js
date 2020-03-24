import axios from "axios"
import { LOGGED } from "../constants"
import firebase from "../firebase";

const storage = firebase.storage();

//firebase.storage().ref('/your/path/here').child('file_name')
//.putString(your_base64_image, ‘base64’, {contentType:’image/jpg’});