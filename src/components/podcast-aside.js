import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../service/api';

function PodcastAside({podcastId}){
    const [podcast, setPodcast] = useState();

    useEffect(() => {
        ApiService.getPodcastById(podcastId).then(data => setPodcast(data))
    },[podcastId])
    
    return (
        <Link to={`/podcast/${podcastId}`} class="podcast-aside-link">
            <div className="podcast-aside box-shadow">
                <img src={podcast?.image} alt={podcast?.author} className="podcast-aside-image"/>
                <div className="podcast-aside-text border-top">
                    <p className="podcast-aside-name bold">{podcast?.name}</p>
                    <p className="podcast-aside-author italic">by {podcast?.author}</p>
                </div>
                <div className="podcast-aside-text border-top">
                    <p className="bold">Description:</p>
                    <p className="podcast-aside-summary">{podcast?.summary}</p>
                </div>
            </div>
        </Link>
    )
}

export default PodcastAside;