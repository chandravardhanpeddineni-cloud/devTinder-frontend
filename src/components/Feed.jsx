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
        dispatch({type: 'feed/feedRequest'});
      const getData = await axios.get(import.meta.env.VITE_API + '/user/feed', {
        withCredentials: true,
      });
      console.log(getData.data.usersData);
      dispatch({type: 'feed/feedSuccess', payload: getData.data.usersData })
    }catch(err) {
      console.log(err?.response?.message || "Error getting feed data");
      dispatch({type: 'feed/feedFail', payload: err?.response?.message});
    }
  }
  useEffect(() => {
    getFeed();
  }, []);
  console.log(feed);
  if(!feed) return;
  if(feed.length === 0) return <h1 className='text-center text-2xl font-bold my-10'>There is NO feed data</h1>
  return feed && (
    <div className='flex justify-center my-20'>
      <UserCard user = {feed[0]}/>
    </div>
  )
}

export default Feed
