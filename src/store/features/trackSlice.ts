import { TrackType } from "@/sharedTypes/sharedTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
    currentTrack: null | TrackType;
    isPlay: boolean;
    currentTime: number;
    playList: TrackType[];
    shuffledPlayList: TrackType[];
    isSuffle: boolean;
    titlePlaylist: string;
    allTracks: TrackType[];
    errorMessage: string;
    collectionTracks: TrackType[];
    favoriteTracks: TrackType[];
};

const initialState: initialStateType = {
    currentTrack: null,
    isPlay: false,
    currentTime: 0,
    playList: [],
    shuffledPlayList: [],
    isSuffle: false,
    titlePlaylist: '',
    allTracks: [],
    errorMessage: '',
    collectionTracks: [],
    favoriteTracks: [],
};

const trackSlice = createSlice ({
    name: 'tracks',
    initialState,
    reducers: {
        setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
            state.currentTrack = action.payload
        },
        setIsPlay: (state, action: PayloadAction<boolean>) => {
            state.isPlay = action.payload
        },
        setCurrentTime: (state, action: PayloadAction<number>) => {
        state.currentTime = action.payload;
         },
        setCurrentPlaylist: (state, action: PayloadAction<TrackType[]>) => {
        state.playList = action.payload;
        state.shuffledPlayList = [...state.playList].sort(() => Math.random() - 0.5)
        },
        toggleShuffle: (state) => {
        state.isSuffle = !state.isSuffle;
        },
        setTitlePlaylist: (state, action: PayloadAction<string>) => {
        state.titlePlaylist = action.payload;
         },
        setNextTrack: (state) => {
            const playList = state.isSuffle ? state.shuffledPlayList : state.playList;
            const currentIndex = playList.findIndex(
                    (el) => el._id === state.currentTrack?._id
                    )
            const nextIndexTrack = currentIndex + 1;
                if (nextIndexTrack >= playList.length) {
                    return;
                    }
                state.currentTrack = playList[nextIndexTrack]
            
        },
        setPrevTrack: (state) => {
            const playList = state.isSuffle ? state.shuffledPlayList : state.playList;
            const currentIndex = playList.findIndex(
                    (el) => el._id === state.currentTrack?._id
                    )
            const prevIndexTrack = currentIndex - 1;
                if (prevIndexTrack < 0) {
                    return;
                    }
                state.currentTrack = playList[prevIndexTrack]
            
        },
        setAllTracks: (state, action: PayloadAction<TrackType[]>) => {
        state.allTracks = action.payload;
        },
        setCollectionTracks: (state, action: PayloadAction<TrackType[]>) => {
        state.collectionTracks = action.payload;
        },
        setErrorMessage: (state, action: PayloadAction<string>) => {
        state.errorMessage = action.payload;
        },
        setFavoriteTracks: (state, action: PayloadAction<TrackType[]>) => {
        state.favoriteTracks = action.payload;
         },
         addLikedTracks: (state, action: PayloadAction<TrackType>) => {
        state.favoriteTracks = [...state.favoriteTracks, action.payload];
        },
        removeLikedTracks: (state, action: PayloadAction<TrackType>) => {
        state.favoriteTracks = state.favoriteTracks.filter(
        (track) => track._id !== action.payload._id,
        );
        },
        }
})

export const {addLikedTracks, removeLikedTracks, setCollectionTracks, setAllTracks, setErrorMessage, setTitlePlaylist, setCurrentTrack, setIsPlay, setCurrentTime, setCurrentPlaylist, setNextTrack, setPrevTrack, toggleShuffle, setFavoriteTracks}  = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;