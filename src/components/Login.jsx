import {useState} from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Login = () => {

  const [emailId, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
      try{
        const res = await axios.post(import.meta.env.VITE_API + '/login', {
        emailId,
        password
      },{ withCredentials: true });
      // console.log(res.data);
      dispatch({type: 'user/loginSuccess', payload: res.data});
      navigate('/');

    }catch(err){
      // console.log(err);
      dispatch({type: 'user/loginFailure', payload: err.response.data}); 
    }
  }

  return (
    <div className="flex justify-center mt-20">
      <div className="card bg-base-300 w-90 h-90 shadow-xl rounded-lg">
        <div className="card-body">
          <h2 className="card-title text-lg font-bold justify-center">Login</h2>
          <div className="form-control">
            <fieldset className="fieldset">
            <legend className="fieldset-legend">Email:</legend>
            <input type="email"  value={emailId} 
            className="input" placeholder="Type here" 
            onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset mt-3">
            <legend className="fieldset-legend">Password</legend>
            <input type="password"  value={password} 
            className="input" placeholder="Type here" 
            onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          </div>
          <div className="card-actions m-auto">
            <button className="btn btn-primary rounded-xl" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
