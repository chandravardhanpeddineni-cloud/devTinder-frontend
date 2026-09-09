import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { failure } from "../utils/requestSlice";
import { useEffect } from "react";
const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.request.requests);
    console.log(requests);
    const getRequests = async () => {
       try{
         dispatch({type: 'request/loading'})
        const res = await axios.get(import.meta.env.VITE_API + '/user/requests/received',{
            withCredentials: true
        });
        dispatch({type: 'request/success', payload: res.data.data});
       }catch(err) {
        console.log(err?.response?.message);
        dispatch(failure(err?.response?.message));
       }
    }
    const handleReviewRequest = async(status, connectionRequest) => {
        try{
            console.log(connectionRequest);
            const res = await axios.post(import.meta.env.VITE_API + `/request/review/${status}/${connectionRequest}`,{},{
            withCredentials: true
        })
        console.log(res);
        dispatch({type: 'request/removeRequest', payload: connectionRequest});
        }catch(err){
            console.log(err?.response?.message);
            dispatch({type: 'request/failure', payload: err?.response?.message});
        }
    }
    useEffect(() => {
        getRequests();
    }, []);

    if(!requests) return ;
    if(requests.length === 0) return <h1 className="text-center ">There is no incoming requests</h1>
  return (
    <div className="text-center my-10">
     <h1 className="text-bold text-4xl text-white">Requests</h1>
    {
        requests.map((request) => {
            const {firstName, lastName, profilePicture, age, gender, bio} = request.fromUserId;
            const connectionRequest = request._id
            return (
            <div className="m-4 p-4 border rounded-2xl bg-base-300 flex max-w-250 mx-auto">
                <div className="flex-1">
                    <img alt="photo" className="w-20 h-20 rounded-full" src={profilePicture}/>
                </div>
                <div className="text-left mx-4 w-180">
                    <h2 className="font-bold text-xl">{firstName +" "+lastName}</h2>
                    {age && gender && <p>{age + ", " + gender}</p>}
                    <p>{bio}</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                    <button onClick={() => handleReviewRequest('accepted', connectionRequest)} className="btn btn-primary">Accept</button>
                    <button onClick={() => handleReviewRequest('rejected', connectionRequest)} className="btn btn-secondary">Reject</button>
                </div>
            </div>
        )})
    }
    </div>
  )
}

export default Requests
