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