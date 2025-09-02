import axios from "axios"
import { BASE_URL } from "../costants"
import { AxiosResponse } from 'axios';
import { accessTokenType, tokenTypes, userReturn } from "@/sharedTypes/sharedTypes";

type loginProps = {
    email: string;
    password: string;
}

// export const login = (data: loginProps): Promise<userReturn> => {
//     return axios.post(BASE_URL+'/user/login/', data, 
//         {headers: {
//     "content-type": "application/json",
//     }})
// }

export const login = (data: loginProps): Promise<AxiosResponse<userReturn>> => {
  return axios.post<userReturn>(BASE_URL + '/user/login/', data, {
    headers: {
      "content-type": "application/json",
    }
  });
};

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

export const getTokens = async (data: loginProps): Promise<tokenTypes> => {
  return await axios.post(BASE_URL + '/user/token/', data).then((res) => {
    return res.data;
  });
};

export const refreshToken = async (
  refresh: string,
): Promise<accessTokenType> => {
  return await axios
    .post(BASE_URL + '/user/token/refresh/', { refresh })
    .then((res) => {
      return res.data;
    });
};