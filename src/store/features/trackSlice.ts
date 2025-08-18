import { TrackType } from "@/sharedTypes/sharedTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

type initialStateType = {
    currentTrack: null | TrackType;
    isPlay: boolean;
    currentTime: number;
    playList: TrackType[];
    shuffledPlayList: TrackType[];
    isSuffle: boolean;
};

const initialState: initialStateType = {
    currentTrack: null,
    isPlay: false,
    currentTime: 0,
    playList: [],
    shuffledPlayList: [],
    isSuffle: false,
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
            
        }

    }
})

export const {setCurrentTrack, setIsPlay, setCurrentTime, setCurrentPlaylist, setNextTrack, setPrevTrack, toggleShuffle}  = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;