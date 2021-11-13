import React from 'react'
import './style.css'

// Import Widgets
import StoryContent from './StoryContent'
import PostContent from './PostContent'

export default function HomeContent(props){
    return(
        <div className='home-content'>
            <StoryContent/>
            <PostContent
                userauth = {props.userauth}
            />
        </div>
    )
}