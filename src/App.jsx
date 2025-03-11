import { useState } from 'react'
import { ProfileData } from './components/ProfileData'
import './App.css'

const FECTH_OPTIONS = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': import.meta.env.VITE_API_KEY,
    'x-rapidapi-host': import.meta.env.VITE_API_URL
  }
}

const DEFUALT_USER_DATA = {
  id: 0,
  name: '',
  icon: '',
  followers: 0,
  following: 0,
  bio: '',
  category: '',
  verified: true,
  stories: [{
    mediaUrl: '',
    isAVideo: false
  }]
}

export function App () {
  const [userData, setUserData] = useState(() => {
    const userDataFromStorage = window.localStorage.getItem('userData')
    return userDataFromStorage ? JSON.parse(userDataFromStorage) : DEFUALT_USER_DATA
  })
  // Get the user data and stories from the api
  const searchUserData = () => {
    const userInput = document.getElementById('userInput').value
    if (!userInput) { return }
    const newUserData = { ...userData }
    const fetchData = async () => {
      const userUrl = `https://real-time-instagram-scraper-api1.p.rapidapi.com/v1/user_info?username_or_id=${userInput}&nocors=true`
      const sotriesUrl = `https://real-time-instagram-scraper-api1.p.rapidapi.com/v1/user_stories?username_or_id=${userInput}&nocors=true`
      const userDataResponse = await fetch(userUrl, FECTH_OPTIONS)
      const userDataResult = await userDataResponse.json()
      const storiesResponse = await fetch(sotriesUrl, FECTH_OPTIONS)
      const storiesDataResult = await storiesResponse.json()
      // console.log(userDataResult)
      newUserData.name = userDataResult.data.full_name
      newUserData.bio = userDataResult.data.biography
      newUserData.followers = userDataResult.data.follower_count
      newUserData.following = userDataResult.data.following_count
      newUserData.icon = userDataResult.data.hd_profile_pic_url_info.url
      newUserData.id = userDataResult.data.pk
      newUserData.category = userDataResult.data.category
      newUserData.stories = getStoriesFromUser(storiesDataResult.data)
      setUserData(newUserData)
      window.localStorage.setItem('userData', JSON.stringify(newUserData))
    }
    fetchData()
  }

  // Get the data of every story and return it
  const getStoriesFromUser = (storiesJson) => {
    const storiesDict = []
    const storiesItems = storiesJson.reel.items
    storiesItems.forEach(story => {
      const isAVideo = !!story.video_duration
      console.log(isAVideo)
      if (isAVideo) {
        storiesDict.push({
          mediaUrl: story.video_versions[0].url,
          isAVideo: true
        })
      } else {
        storiesDict.push({
          mediaUrl: story.image_versions2.candidates[0].url,
          isAVideo: false
        })
      }
    })
    return storiesDict
  }

  return (
    <main>
      <nav className='navigation-menu'>
        <section className='search-user'>
          <div>
            <input id='userInput' type='text' placeholder='Search for a user' />
            <button className='search-button' onClick={searchUserData}><i className='ri-search-line' /></button>
          </div>
        </section>
      </nav>
      <ProfileData userData={userData} />
    </main>
  )
}
