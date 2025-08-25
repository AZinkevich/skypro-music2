import axios from "axios"
import { BASE_URL } from "../costants"
import { userReturn } from "@/sharedTypes/sharedTypes";

type loginProps = {
    email: string;
    password: string;
}

export const login = (data: loginProps): Promise<userReturn> => {
    return axios.post(BASE_URL+'/user/login/', data, 
        {headers: {
    "content-type": "application/json",
    }})
}

type regProps = {
    email: string;
  password: string;
  username: string;
}

export const registr = (data: regProps): Promise<userReturn> => {
    return axios.post(BASE_URL+'/user/signup/', data, 
        {headers: {
    "content-type": "application/json",
    }}).then((res) => {
        return res.data.result;
    })
}
