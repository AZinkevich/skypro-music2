export type TrackType = {
    _id: number;
    name: string;
    author: string;
    release_date: string;
    genre: string[];
    duration_in_seconds: number;
    album: string;
    logo: null | string;
    track_file: string;
    stared_user: string[];
}

export type userReturn = {
    email: string;
    username:string;
    _id: number;
}
export type UserType = {
  email: string;
  username: string;
  _id: number;
};

export type SelectionTrackType = {
  _id: number;
  name: string;
  items: number[];
};