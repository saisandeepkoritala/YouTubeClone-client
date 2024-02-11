import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"User",
    initialState:{
        isUser:false,
        userInfo:[],
        searchTerm:"",
        data:[],
        dataToken:"",
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
        setsideBar(state,action){
            state.sideBar = action.payload;
        },
        setisUser(state,action){
            state.isUser = action.payload;
        },
        setuserInfo(state,action){
            state.userInfo = action.payload;
        },
        changeSearchTerm(state,action){
            state.searchTerm = action.payload;
        },
        setData(state,action){
            state.data = action.payload;
        },
        setDataMore(state,action){
            state.data=[...state.data,...action.payload]
        },
        setdataToken(state,action){
            state.dataToken = action.payload;
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
export const {setisUser,changeSearchTerm,setData,changeSelectedItem,setsearchHistory,setwatchHistory,setchannelData,setvideoDetails,setvideoComments,setvideoCommentsToken,setMore,setvideoRecomend,setvideoRecomendToken,setdataToken ,setDataMore ,setuserInfo} = userSlice.actions;