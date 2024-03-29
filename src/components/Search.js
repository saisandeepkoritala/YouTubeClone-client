import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeSelectedItem,setDataMore,setdataToken} from "./store"; 
import "../styles/Search.css";
import { RotatingLines } from "react-loader-spinner";
import axios from "axios";

const Search = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const Info = useSelector((store) => store.user.data);
    const {dataToken,searchTerm} = useSelector((store)=>store.user);

    const render = Info?.map((item, i) => (
        <div className="list">
            <img
        src={item.thumbnails[1]?.url}
        alt=""
        key={i}
        onClick={() => {
            dispatch(changeSelectedItem(item));
            navigate(`/detail/${item.video_id}`);
        }}
        />
        <p>{item.title}</p>
        </div>
        
    ));

    

    const bottomDivRef = useRef(null);

    // Debounce function
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
        };
    };

    const handleScroll = debounce(() => {
        if (
        bottomDivRef.current &&
        window.innerHeight + window.scrollY >= bottomDivRef.current.offsetTop
        ) {
        // Load more data when user reaches the bottom
        axios.post(`${process.env.REACT_APP_PRODUCTION }/getDataMore`,{
            searchTerm,token:dataToken
        }).then((res)=>{
            
        dispatch(setDataMore(res?.data?.data?.videos))
        dispatch(setdataToken(res?.data?.data?.continuation_token))
    })
        .catch(()=>console.log("error"))

        }
    }, 200); // Adjust the delay as needed

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
        window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]); // Include handleScroll in the dependency array

    return (
        <div className="search">
        {render}
        <div className="load_more" ref={bottomDivRef}>
            {(
            <RotatingLines
                visible={true}
                height="96"
                width="96"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
            )}
        </div>
        </div>
    );
};

export default Search;
