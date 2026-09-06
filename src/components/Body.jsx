import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"
import Footer from "./Footer"
import { useDispatch, useSelector } from "react-redux"
import axios from 'axios'
import { loginFailure } from "../utils/userSlice"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.user.user);
  const fetchUser = async () =>{
      try{
        dispatch({type: 'user/loginRequest'});
        const user = await axios.get(import.meta.env.VITE_API + '/profile/view', {
          withCredentials: true,
        });
      dispatch({type: 'user/loginSuccess', payload: user.data})
      }catch(err) {
          if(err.response?.status === 401) {
              navigate('/login');
          }
          dispatch(loginFailure(err));
      }
  };

  useEffect(() => {
    if(!userData) {
      fetchUser(); 
    }
  },[]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">
        <Outlet />
     </main>
      <Footer />
    </div>
  )
}

export default Body
