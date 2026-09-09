import { useState } from "react";
import {  useDispatch } from "react-redux";
import axios from 'axios';
import UserCard from "./UserCard";
const EditProfile = ({user}) => {
     const [firstName, setFirstName] = useState(user.firstName);
      const [lastName, setLastName] = useState(user.lastName);
      const [age, setAge] = useState(user.age);
      const [gender, setgender] = useState(user.gender);
      const [bio, setBio] = useState(user.bio);
      const [profilePicture, setProfilePicture] = useState(user.profilePicture);
      const [error, setError] = useState('');
      const [showToast, setShowToast] = useState(false);

      console.log("Inside EditProfile: " + user?.firstName);
      const dispatch = useDispatch();
      const handleUpdatedData = async() => {
        try{
            dispatch({type: 'user/request'})
            const res = await axios.patch(import.meta.env.VITE_API + '/profile/edit',
                 {firstName, lastName, age, gender, profilePicture, bio},{
                withCredentials: true,
            })
            console.log(res.data);
            dispatch({type: 'user/success', payload: res.data.data})
            setShowToast(true); 
             setTimeout(() => {
              setShowToast(false);
            }, 3000);

        }catch(err) {
            console.log(err);
            setError(err.response?.data || "Something went wrong");
        }
      }
  return (
   <>
   <div className="flex items-center justify-center py-5 gap-10">
     <div className="flex justify-center mt-20">
      <div className="card bg-base-300 w-90 shadow-xl rounded-lg">
        <div className="card-body">
          <h2 className="card-title text-lg font-bold justify-center">Edit Profile</h2>
          <div className="form-control">
            <fieldset className="fieldset">
            <legend className="fieldset-legend">FirstName</legend>
            <input type="email"  value={firstName} 
            className="input" placeholder="Type here" 
            onChange={(e) => setFirstName (e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset mt-3">
            <legend className="fieldset-legend">LastName</legend>
            <input type="text"  value={lastName} 
            className="input" placeholder="Type here" 
            onChange={(e) => setLastName(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset mt-3">
            <legend className="fieldset-legend">ProfilePicture</legend>
            <input type="text"  value={profilePicture} 
            className="input" placeholder="Type here" 
            onChange={(e) => setProfilePicture (e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset mt-3">
            <legend className="fieldset-legend">Age</legend>
            <input type="number"  value={age} 
            className="input" placeholder="Type here" 
            onChange={(e) => setAge(Number(e.target.value))}
            />
          </fieldset>
          <fieldset className="fieldset mt-3">
            <legend className="fieldset-legend">Gender</legend>
            <input type="text"  value={gender} 
            className="input" placeholder="Type here" 
            onChange={(e) => setgender(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset mt-3">
            <legend className="fieldset-legend">Bio</legend>
            <input type="text"  value={bio} 
            className="input" placeholder="Type here" 
            onChange={(e) => setBio(e.target.value)}
            />
          </fieldset>
          </div>
          <p className='text-red-500'>{error}</p>
          <div className="card-actions m-auto">
            <button className="btn btn-primary rounded-xl" onClick={handleUpdatedData}>Save</button>
          </div>
        </div>
      </div>
    </div>
    <UserCard user = {{
      ...user,
    firstName,
    lastName,
    age,
    gender,
    profilePicture,
    bio
    }} />
   </div>
   {showToast && (<div className="toast toast-bottom toast-center">
  <div className="alert alert-success">
    <span>Profile saved successfully.</span>
  </div>
</div>)}
   </>
  )
}

export default EditProfile
