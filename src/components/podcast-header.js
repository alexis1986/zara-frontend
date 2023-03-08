import React, { useEffect, useState } from 'react';
import ApiService from '../service/api';

function PodcastHeader({podcastId}){
    const [podcast, setPodcast] = useState();

    useEffect(() => {
        ApiService.getPodcastById(podcastId).then(data => setPodcast(data))
    },[podcastId])

    
    return (
        <div>
            {
                podcast && 
                <>
                    <img src={podcast.image} alt={podcast.author}/>
                    <p>{podcast.name}</p>
                    <p>by {podcast.author}</p>
                    <p>{podcast.summary}</p>
                </>
            }
            
        </div>
    )
}

export default PodcastHeader;