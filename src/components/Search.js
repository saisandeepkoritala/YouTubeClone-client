import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector } from "react-redux";
import { changeSelectedItem} from "./store";
import "../styles/Home.css";

const Search=()=> {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const Info = useSelector((store)=>store.user.data);

    const render=Info?.map((item,i)=>{
        if(i<15){
            return <img src={item.thumbnails[1]?.url} alt="" key={i} 
        onClick={()=>{
            dispatch(changeSelectedItem(item))
            navigate(`/detail/${item.video_id}`)
        }}/>
        }
        else{
            return ""
        }
    }
    )
    return <div className="home">{render}</div>
}

export default Search;
