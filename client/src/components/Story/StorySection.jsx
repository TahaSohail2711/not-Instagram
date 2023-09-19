import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Story from './Story'

const StorySection = ({ userId }) => {
  const [story, setStory] = useState([])

  const fetchImages = async () => {
    try {
      const result = await axios.get(
        'http://localhost:8080/api/images/story/all'
      )
      setStory(result.data)
    } catch (error) {
      console.error('Error fetching images:', error)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [])

  return (
    <div className='story'>
      <div className='story-sec w-70vw h-70vh'>
        <Carousel
          showArrows={true}
          infiniteLoop={true}
          showThumbs={false}
          className='p-2 w-full h-full'
        >
          {story.map((image) => (
            <Story
              key={image.story?.id}
              userId={userId}
              image={image}
              story={image.story}
              user={image.story?.user}
            />
          ))}
        </Carousel>
      </div>
    </div>
  )
}

export default StorySection
