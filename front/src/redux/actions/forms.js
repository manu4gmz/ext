import { SET_FORM } from "../constants";

export default function saveForm (name, form) {
	return {
		type: SET_FORM,
		form,
		name
	}
}