import { useSelector } from "react-redux"
import EditProfile from "./EditProfile"

const Profile = () => {
  const user = useSelector((store) => store.user.user);  
  return user && (
    <div>
      <EditProfile user = {user}/>
    </div>
  )
}

export default Profile
