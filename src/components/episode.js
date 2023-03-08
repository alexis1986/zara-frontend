import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PodcastHeader from '../components/podcast-header'
import ApiService from '../service/api'

function Episode() {
    const { podcastId, episodeId } = useParams();
    const [episode, setEpisode] = useState();

    useEffect(() =>{
        ApiService.getEpisodeByPodcastIdAndEpisodeId(podcastId,episodeId).then(data => setEpisode(data))
    },[]);

    return (
        <>
            <PodcastHeader podcastId={podcastId}/>
            <div>
                <p>{episode?.trackName}</p>
                <p>{episode?.description}</p>
                <audio controls src={episode?.episodeUrl} autoPlay={true}/>
            </div>
        </>
    );
}

export default Episode;