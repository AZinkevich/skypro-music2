import axios from "axios"
import { BASE_URL } from "../costants"
import { SelectionTrackType, TrackType } from "@/sharedTypes/sharedTypes";

export const getTracks = (): Promise<TrackType[]> => {
    return axios(BASE_URL +'/catalog/track/all/').then((res) => {
return res.data.data;
    })
} 

export const getSelectionTracks = async (
  selectionId: string,
): Promise<SelectionTrackType> => {
  return await axios(BASE_URL + `/catalog/selection/${selectionId}/`).then(
    (res) => {
      return res.data.data;
        
    },
  );
};

export const addLike = async (access: string, id: number) => {
  return await axios.post(
    BASE_URL + `/catalog/track/${id}/favorite/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    },
  );
};

export const removeLike = async (access: string, id: number) => {
  return await axios.delete(BASE_URL + `/catalog/track/${id}/favorite/`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
};

export const getFavoriteTracks = async (
  access: string,
): Promise<TrackType[]> => {
  return await axios(BASE_URL + '/catalog/track/favorite/all/', {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  }).then((res) => {
    return res.data.data;
  });
};
