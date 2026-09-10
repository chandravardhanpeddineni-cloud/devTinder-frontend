import axios from 'axios';
import { useDispatch } from 'react-redux';
const UserCard = ({ user }) => {

    const { _id ,firstName, lastName, bio, age, gender, profilePicture} = user;
    const dispatch = useDispatch();
    const handleSendRequest = async(status, userId) => {
      try{
        const res = await axios.post(import.meta.env.VITE_API + `/request/send/${status}/${userId}`, {},{
          withCredentials: true
        })
        console.log(res);
        dispatch({type: 'feed/removeFeed', payload: userId})
      }catch(err) {
          console.log(err.response?.data);
      }
    }

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
    <figure>
        <img
        src={profilePicture ? profilePicture :
                 gender === 'male' ? "https://i.pinimg.com/474x/0b/97/6f/0b976f0a7aa1aa43870e1812eee5a55d.jpg" : 
                "https://i.pinimg.com/474x/2e/b7/e2/2eb7e22d15315c2f2b79e7432dff1536.jpg"}
        alt="Photo" />
    </figure>
    <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{age + ", " + gender}</p>
        <p>{bio}</p>
        <div className="card-actions justify-center gap-4">
        <button className="btn btn-primary" onClick={()=> handleSendRequest("ignore", _id)}>Ignore</button>
        <button className="btn btn-secondary" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
        </div>
    </div>
    </div>
  )
}

export default UserCard
