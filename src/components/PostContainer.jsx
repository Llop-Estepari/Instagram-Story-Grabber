const PostContainer = ({ mediaData }) => {
  const ImagePlayer = () => {
    return (
      <img
        src={mediaData.mediaUrl}
        alt='Post'
        width={400}
      />
    )
  }
  const VideoPlayer = () => {
    return (
      <video controls width={400}>
        <source
          src={mediaData.mediaUrl}
          type='video/mp4'
        />
        Tu navegador no soporta el elemento de video.
      </video>
    )
  }
  return (
    <article className='post-container'>
      {mediaData.isAVideo ? <VideoPlayer /> : <ImagePlayer />}
    </article>
  )
}

export default PostContainer
