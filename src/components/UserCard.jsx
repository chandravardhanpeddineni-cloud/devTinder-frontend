const UserCard = ({ user }) => {
    const {firstName, lastName, bio, age, gender, profilePicture} = user;
    console.log(user);
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
        <button className="btn btn-primary">Ignore</button>
        <button className="btn btn-secondary">Interested</button>
        </div>
    </div>
    </div>
  )
}

export default UserCard
