import axios from "axios";

export const fetchProvincias = (val) => dispatch => {
	return axios.get(`https://apis.datos.gob.ar/georef/api/provincias${val ? "?nombre=" + val : ""}`)
		.then(response => response.data)
		.then(data => {
			return data.provincias.map(p => ({ label: p.nombre.toLowerCase(), id: p.id }));
		})
}

export const fetchLocalidades = (val, id) => dispatch => {
	return axios.get(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${id}${val ? "&nombre=" + val : ""}&max=10`)
		.then(response => response.data)
		.then(data => {
			return data.localidades.map(p => ({ label: p.nombre.toLowerCase(), id: p.id, coordenadas: p.centroide }));
		})
}



export const fetchCoords = (dir, idSpace) => dispatch => {
	return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${dir.n},${dir.s} ${dir.sn},${dir.p}&`)
		.then((res) => {
			console.log("llegue a google")
			const coordenadas = res.data.results[0].geometry.location
			return axios.put(`http://localhost:5000/ext-api/us-central1/app/api/properties/coordenadas/${idSpace}`, coordenadas)
		})
}