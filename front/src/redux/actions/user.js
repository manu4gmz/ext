import axios from "axios"
import { LOGGED } from "../constants"


export const logUser = (user) => ({
    type: LOGGED,
    user
});