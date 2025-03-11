import PostContainer from './PostContainer'

export function ProfileData ({ userData }) {
  console.log(userData)
  const formatLargeNumbers = (number) => {
    let numberFormated = number
    if (number > 1000000) {
      numberFormated = `${(number / 1000000).toFixed(1)}M`
    } else if (number > 1000) {
      numberFormated = `${(number / 1000).toFixed(1)}k`
    }
    return numberFormated
  }

  if (!userData || userData.id === 0) return

  // Format the followers and following numbers to be more readable
  const followers = formatLargeNumbers(userData.followers)
  const following = formatLargeNumbers(userData.following)

  const isVerified = userData.verified ? '' : 'hidden'
  return (
    <section className='profile-data'>
      <div className='user-data-container'>
        <div className='user-data'>
          <img className='user-icon' src={userData.icon} alt={userData.name + "'s profile picture"} width={128} />
          <div className='user-info'>
            <h2>{userData.name}<span className={isVerified}><i style={{ color: '#0095F6' }} className='ri-verified-badge-fill' /></span></h2>
            <h4>{userData.stories.length} <span>Stories</span></h4>
            <h4>{followers} <span>Followers</span></h4>
            <h4>{following} <span>Following</span></h4>
          </div>
        </div>
        <p>{userData.bio}</p>
      </div>
      <section className='stories-container'>
        {userData.stories.map((story, index) => {
          return (
            <PostContainer key={index} mediaData={story} />
          )
        })}
      </section>
    </section>
  )
}
