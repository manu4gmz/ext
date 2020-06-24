import axios from "axios";
import { DATA } from "react-native-dotenv"
import { SET_CENTROIDE } from "../constants";
import api from "../api";

export const fetchProvincias = (val) => dispatch => {
	return api.get(`https://apis.datos.gob.ar/georef/api/provincias${val ? "?nombre=" + val : ""}`, {withCredentials:false})
		.then(response => response.data)
		.then(data => {
			return data.provincias.map(p => ({ label: p.nombre.toLowerCase(), id: p.id, coordenadas: p.centroide }));
		})
}

export const fetchLocalidades = (val, id) => dispatch => {
	return api.get(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${id}${val ? "&nombre=" + val : ""}&max=10`, {withCredentials:false})
		.then(response => response.data)
		.then(data => {
			return data.localidades.map(p => ({ label: p.nombre.toLowerCase(), id: p.id, coordenadas: p.centroide }));
		})
}



export const fetchCoords = (dir) => dispatch => {
	return api.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${dir.n},${dir.s} ${dir.sn},${dir.p}&key=${DATA}`, {withCredentials:false})
		.then((res) => {
			const coordenadas = res.data.results[0].geometry.location
			const arreglo = [coordenadas];
			return arreglo;
			//return api.put(`/properties/coordenadas/${idSpace}`, arreglo)
		})
}

export const setCentroide = (centroide) => ({
	type: SET_CENTROIDE,
	centroide
})