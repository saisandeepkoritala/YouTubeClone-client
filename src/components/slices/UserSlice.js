import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"User",
    initialState:{
        searchTerm:"",
        data:[],
        trendingData:[],
        selectedItem:"",
        searchHistory:[],
        watchHistory:[],
        channelData:[],
        videoDetails:[],
        videoComments:[],
        videoCommentsToken:"",
        videoRecomend:[],
        videoRecomendToken:"",
    },
    reducers:{
        changeSearchTerm(state,action){
            state.searchTerm = action.payload;
        },
        setData(state,action){
            state.data = action.payload;
        },
        setchannelData(state,action){
            state.channelData = action.payload;
        },
        settrendingData(state,action){
            state.trendingData = action.payload;
        },
        changeSelectedItem(state,action){
            state.selectedItem = action.payload;
        },
        setsearchHistory(state,action){
            state.searchHistory = [action.payload,...state.searchHistory];
        },
        setwatchHistory(state,action){
            state.watchHistory = [action.payload,...state.watchHistory];
        },
        setvideoDetails(state,action){
            state.videoDetails = action.payload;
        },
        setvideoComments(state,action){
            state.videoComments = action.payload;
        },
        setvideoCommentsToken(state,action){
            state.videoCommentsToken = action.payload;
        },
        setMore(state,action){
            state.videoComments=[...state.videoComments,...action.payload]
        },
        setvideoRecomend(state,action){
            state.videoRecomend=action.payload;
        },
        setvideoRecomendToken(state,action){
            state.videoRecomendToken= action.payload;
        }
    }
})

export const UserReducer = userSlice.reducer;
export const {changeSearchTerm,setData,changeSelectedItem,setsearchHistory,setwatchHistory,setchannelData,setvideoDetails,setvideoComments,setvideoCommentsToken,setMore,setvideoRecomend,setvideoRecomendToken} = userSlice.actions;