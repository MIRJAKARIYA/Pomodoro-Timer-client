import { useDispatch, useSelector } from "react-redux";
import { fetchStreakData } from "../redux-toolkit/Slices/streakData";
import { fetchFocusData } from "../redux-toolkit/Slices/FocusData";
import { useEffect } from "react";

const useFocusAndStreakData = () =>{
    const { user } = useSelector((state) => state?.userData);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchFocusData(user?._id));
      }, [user?._id]); 
      useEffect(()=>{
        dispatch(fetchStreakData(user?._id))
      },[user?.id])
}

export default useFocusAndStreakData;