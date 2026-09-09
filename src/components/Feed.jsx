import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserCard from './UserCard';
const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed.feedData);
  const getFeed = async() => {
    try{
        if(feed) return;
        dispatch({type: 'feed/feedSuccess'});
      const getData = await axios.get(import.meta.env.VITE_API + '/user/feed', {
        withCredentials: true,
      });
      dispatch({type: 'feed/feedSuccess', payload: getData.data })
    }catch(err) {
      console.log(err?.response?.message || "Error getting feed data");
      dispatch({type: 'feed/feedFail', payload: err?.response?.message});
    }
  }
  useEffect(() => {
    getFeed();
  }, []);
  return feed && (
    <div className='flex justify-center my-20'>
      <UserCard user = {feed.usersData[0]}/>
    </div>
  )
}

export default Feed
