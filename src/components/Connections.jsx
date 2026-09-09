
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";

const Connections = () => {
     const dispatch = useDispatch();
     const connections = useSelector((store) => store.connection.connections);
    const getConnections = async() => {
        try{
            const res = await axios.get(import.meta.env.VITE_API + '/user/connections', {
                withCredentials: true,
            })
            console.log(res.data);
            dispatch({type: 'connection/success', payload: res.data});
        }catch(err) {
            dispatch({type: 'connection/failure', payload: err?.response?.message})
        }
    }

    useEffect(() => {
        getConnections();
    },[]);

    if(!connections) return;
    if(connections.length === 0) return <h1> No Connections Found!!</h1>

  return (
    <div className="text-center my-10">
     <h1 className="text-bold text-4xl text-white">Connections</h1>
    {
        connections.map((connection) => {
            const {firstName, lastName, profilePicture, age, gender, bio} = connection;
            return (
            <div className="m-4 p-4 border rounded-2xl bg-base-300 flex max-w-1/2 mx-auto">
                <div>
                    <img alt="photo" className="w-20 h-20 rounded-full" src={profilePicture}/>
                </div>
                <div className="text-left mx-4">
                    <h2 className="font-bold text-xl">{firstName +" "+lastName}</h2>
                    {age && gender && <p>{age + ", " + gender}</p>}
                    <p>{bio}</p>
                </div>
            </div>
        )})
    }
    </div>
  )
}

export default Connections
