import { TrackType } from "@/sharedTypes/sharedTypes";
import { applyFilters } from "@/utils/applyFilters";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type initialStateType = {
    currentTrack: null | TrackType;
    isPlay: boolean;
    currentTime: number;
    playList: TrackType[];
    shuffledPlayList: TrackType[];
    isSuffle: boolean;
    titlePlaylist: string;
    allTracks: TrackType[];
    filteredTracks: TrackType[];
    errorMessage: string;
    collectionTracks: TrackType[];
    favoriteTracks: TrackType[];
    filters: {
    authors: string[];
    genres: string[];
    years: string;
    };
    searchTrack: string;
    pagePlaylist: TrackType[];
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
    filteredTracks: [],
    errorMessage: '',
    collectionTracks: [],
    favoriteTracks: [],
    filters: {
    authors: [],
    genres: [],
    years: 'По умолчанию',
    },
    searchTrack: '',
    pagePlaylist: [],
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
        setFilterAuthors: (state, action: PayloadAction<string>) => {
        const author = action.payload;

        if (state.filters.authors.includes(author)) {
            state.filters.authors = state.filters.authors.filter((item) => {
            return item !== author; 
            });
        } else {
            state.filters.authors = [...state.filters.authors, author];
        }
        state.filteredTracks = applyFilters(state);
        },
        setFilterGenres: (state, action: PayloadAction<string>) => {
        const genres = action.payload;
        if (state.filters.genres.includes(genres)) {
            state.filters.genres = state.filters.genres.filter((item) => {
            return item !== genres;
            });
        } else {
            state.filters.genres = [...state.filters.genres, genres];
        }
        state.filteredTracks = applyFilters(state);
        },
        setSortingYears: (state, action: PayloadAction<string>) => {
        state.filters.years = action.payload;
        const filtered = applyFilters(state);
        state.filteredTracks = filtered;
        state.pagePlaylist = filtered;
        },
        setPagePlaylist: (state, action: PayloadAction<TrackType[]>) => {
        state.pagePlaylist = action.payload;
        },
        resetFilters: (state) => {
        state.filters.authors = [];
        state.filters.genres = [];
        state.filters.years = 'По умолчанию';
        },
        setSearchTrack: (state, action: PayloadAction<string>) => {
        state.searchTrack = action.payload;
        },
        }
})

export const {setSearchTrack, setFilterGenres, setSortingYears, resetFilters, setPagePlaylist, setFilterAuthors, addLikedTracks, removeLikedTracks, setCollectionTracks, setAllTracks, setErrorMessage, setTitlePlaylist, setCurrentTrack, setIsPlay, setCurrentTime, setCurrentPlaylist, setNextTrack, setPrevTrack, toggleShuffle, setFavoriteTracks}  = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;