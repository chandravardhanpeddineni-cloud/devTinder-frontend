import {useState} from 'react';
import axios from 'axios';
const Login = () => {

  const [emailId, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
      try{
        const res = await axios.post('http://localhost:3000/login', {
        emailId,
        password
      },{ withCredentials: true });
      console.log(res.data);
    }catch(err){
      console.log(err);
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
