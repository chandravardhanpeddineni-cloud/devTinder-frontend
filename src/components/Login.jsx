import {useState} from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Login = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
      try{
        const res = await axios.post(import.meta.env.VITE_API + '/login', {
        emailId,
        password
      },{ withCredentials: true });

      dispatch({type: 'user/success', payload: res.data});
      return navigate('/');

    }catch(err){
      setError(err?.response?.data || "Something went wrong");
      dispatch({type: 'user/failure', payload: err.response.data}); 
    }
  }
  const handleSignUp = async () => {
    try{
      const res = await axios.post(import.meta.env.VITE_API + '/signup', {
        firstName, lastName, emailId, password, confirmPassword, age, gender, bio
      },{
        withCredentials: true
      })
      console.log(res.data);
      dispatch({type: 'user/success', payload: res.data.data });
      return navigate('/');
    }catch(err) {
        setError(err?.response?.data || "Something went wrong");
      dispatch({type: 'user/failure', payload: err.response.data}); 
    }
  }
  return (
    <div className="flex justify-center mt-20">
      <div className="card bg-base-300 w-90  shadow-xl rounded-lg">
        <div className="card-body">
          <h2 className="card-title text-lg font-bold justify-center">{isLoginForm ? "Login" : "SignUp"}</h2>
          <div className="form-control">
            {!isLoginForm && <>
                <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name:</legend>
                <input type="text"  value={firstName} 
                className="input" placeholder="Type here" 
                onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset mt-3">
                <legend className="fieldset-legend">Last Name:</legend>
                <input type="text"  value={lastName} 
                className="input" placeholder="Type here" 
                onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
              </>
            }
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
          {!isLoginForm && <>
                <fieldset className="fieldset">
                <legend className="fieldset-legend">Confirm Password: </legend>
                <input type="password"  value={confirmPassword} 
                className="input" placeholder="Type here" 
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset mt-3">
                <legend className="fieldset-legend">Age:</legend>
                <input type="number"  value={Number(age)} 
                className="input" placeholder="Type here" 
                onChange={(e) => setAge(e.target.value)}
                />
                </fieldset>
                <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender:</legend>

                <div className="dropdown dropdown-right">
                  <input
                    type="text"
                    value={gender}
                    placeholder="Select Gender"
                    readOnly
                    tabIndex={0}
                    role="button"
                    className="input input-bordered w-full"
                  />

                  <ul
                    tabIndex={-1}
                    className="dropdown-content menu bg-base-100 rounded-box z-1 w-full p-2 shadow-sm"
                  >
                    <li>
                      <button type="button" onClick={() => setGender("male")}>
                        Male
                      </button>
                    </li>

                    <li>
                      <button type="button" onClick={() => setGender("female")}>
                        Female
                      </button>
                    </li>

                    <li>
                      <button type="button" onClick={() => setGender("others")}>
                        Others
                      </button>
                    </li>
                  </ul>
                </div>
              </fieldset>
                <fieldset className="fieldset">
                <legend className="fieldset-legend">Your bio</legend>
                <textarea className="textarea h-24" placeholder="Bio" 
                value={bio}
                onChange={(e) => setBio(e.target.value)}></textarea>
                <div className="label">Optional</div>
              </fieldset>
              </>
            }
          </div>
          <p className="text-end cursor-pointer my-2" onClick={() => setIsLoginForm((value) => !value)}>{isLoginForm ? "New User? Signup here" : "Existing User? Login here"}</p>
          <p className='text-red-500'>{error}</p>
          <div className="card-actions m-auto">
            <button className="btn btn-primary rounded-xl" onClick={isLoginForm ? handleLogin : handleSignUp}>{isLoginForm ? "Login" : "Sign Up"}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
 