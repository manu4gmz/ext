import axios from "axios";

export const fetchProvincias = (val) => dispatch => {
    return axios.get(`https://apis.datos.gob.ar/georef/api/provincias${val ? "?nombre="+val:""}`)
	    .then(response => response.data)
	    .then(data => {
	        return data.provincias.map(p => ({ label: p.nombre.toLowerCase(), id: p.id }));
	    })
}

export const fetchLocalidades = (val, id) => dispatch => {
    return axios.get(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${id}${val ? "&nombre="+val:""}&max=10`)
	    .then(response => response.data)
	    .then(data => {
	        return data.localidades.map(p => ({ label: p.nombre.toLowerCase(), id: p.id }));
	    })
}