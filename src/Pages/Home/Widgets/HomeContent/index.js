import React from 'react'
import './style.css'

// Import Widgets
import StoryContent from './StoryContent'
import PostContent from './PostContent'

export default function HomeContent(){
    return(
        <div className='home-content'>
            <StoryContent/>
            <PostContent/>
        </div>
    )
}