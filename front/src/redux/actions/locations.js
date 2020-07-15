import axios from "axios";
import { DATA } from "react-native-dotenv"
import { SET_CENTROIDE } from "../constants";
import api from "../api";
import Promise from "bluebird";

// export const fetchProvincias = (val) => dispatch => {
// 	return api.get(`https://apis.datos.gob.ar/georef/api/provincias${val ? "?nombre=" + val : ""}`, {withCredentials:false})
// 		.then(response => response.data)
// 		.then(data => {
// 			return data.provincias.map(p => ({ label: p.nombre.toLowerCase(), id: p.id, coordenadas: p.centroide }));
// 		})
// }

// export const fetchLocalidades = (val, id) => dispatch => {
// 	return api.get(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${id}${val ? "&nombre=" + val : ""}&max=10`, {withCredentials:false})
// 		.then(response => response.data)
// 		.then(data => {
// 			return data.localidades.map(p => ({ label: p.nombre.toLowerCase(), id: p.id, coordenadas: p.centroide }));
// 		})
// }



export const fetchCoords = (dir) => dispatch => {
	return api.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${dir.n},${dir.s} ${dir.sn},${dir.p}&key=${DATA}`, {withCredentials:false})
		.then((res) => {
			const coordenadas = res.data.results[0].geometry.location
			const arreglo = [coordenadas];
			return arreglo;
			//return api.put(`/properties/coordenadas/${idSpace}`, arreglo)
		})
}

import neighborhoodsList from "../../public/lib/comunas";

export const fetchCentroide = (neighborhoods) => dispatch => {

	if (!neighborhoods.length) return null;
	return Promise.all(neighborhoods.map(n => (
		axios.get(`https://apis.datos.gob.ar/georef/api/departamentos?provincia=2&max=1&nombre=Comuna%20${neighborhoodsList.indexOf(n)+1}`)
		.then(rta => rta.data)	
		.then(data => {
				return data.departamentos[0] ?
					data.departamentos[0].centroide
					: null
			})
	)))
	.then(centroids => centroids.filter(a => a))
	.then(centroids => {
		const avgLat = centroids.reduce((acc, {lat}) => acc + lat, 0)/centroids.length;
		const avgLon = centroids.reduce((acc, {lon}) => acc + lon, 0)/centroids.length;

		// const maxLonDelta = Math.max(...centroids.map(c => Math.abs(avgLon - c.lon)));
		// const maxLatDelta = Math.max(...centroids.map(c => Math.abs(avgLat - c.lat)));

		dispatch(setCentroide({ 
			lat: avgLat, 
			lon: avgLon, 
			lng: avgLon,
			// latitudeDelta: maxLatDelta*10,
			// longitudeDelta: maxLonDelta*10,
		}));
	})
}

export const setCentroide = (centroide) => ({
	type: SET_CENTROIDE,
	centroide
})