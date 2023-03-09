import React, { useEffect, useState } from 'react';
import Header from './header';
import { useParams } from 'react-router-dom';
import PodcastHeader from '../components/podcast-aside'
import ApiService from '../service/api'

function Episode() {
    const [showSpinner, setShowSpinner] = useState(true);
    const { podcastId, episodeId } = useParams();
    const [episode, setEpisode] = useState();

    useEffect(() =>{
        ApiService.getEpisodeByPodcastIdAndEpisodeId(podcastId,episodeId)
                    .then(data => {
                        setEpisode(data);
                        setShowSpinner(false);
                    })
    },[]);

    return (
        <>
            <Header showSpinner={showSpinner}/>
            <div className="podcast-container">
                <PodcastHeader podcastId={podcastId}/>
                <div className="podcast-body box-shadow">
                    <div className="podcast-episode-text">
                        <p className="bold">{episode?.trackName}</p>
                        <p className="italic">{episode?.description}</p>
                    </div>
                    <audio controls src={episode?.episodeUrl} autoPlay={true} />
                </div>
            </div>
        </>
    );
}

export default Episode;