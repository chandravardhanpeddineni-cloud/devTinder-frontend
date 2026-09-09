import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const NavBar = () => {

  const user = useSelector((store) => store.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async() => {
    try{
       await axios.post(import.meta.env.VITE_API + '/logout',{}, {
        withCredentials: true,
      });
      dispatch({type: 'user/logout'});
      return navigate('/login');
    }catch(err) {
      console.log(err);
    }
  }

  return (
    <div className="navbar bg-base-300 shadow-sm px-6">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">👨‍💻DevTinder</Link>
        </div>
          { user && 
          <div className="flex gap-2 items-center">
            <div className="font-bold text-lg px-4">Welcome, {user.firstName}</div>
            <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar"> 
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src={user?.profilePicture ? user.profilePicture : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
                </li>
              <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>
        </div>
    }     
      </div>
  )
}

export default NavBar;
