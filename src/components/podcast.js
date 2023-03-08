import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ApiService from '../service/api'
import Moment from 'moment';
import PodcastHeader from './podcast-header';

function Podcast() {
    const { podcastId } = useParams();
    const [episodes, setEpisodes] = useState();
    const msConversion = (millis) => {
        let sec = Math.floor(millis / 1000);
        let hrs = Math.floor(sec / 3600);
        sec -= hrs * 3600;
        let min = Math.floor(sec / 60);
        sec -= min * 60;
      
        sec = '' + sec;
        sec = ('00' + sec).substring(sec.length);
      
        if (hrs > 0) {
          min = '' + min;
          min = ('00' + min).substring(min.length);
          return hrs + ":" + min + ":" + sec;
        }
        else {
          return min + ":" + sec;
        }
      }

    useEffect(() => {
        ApiService.getEpisodesByPodcastId(podcastId).then(data => setEpisodes(data));
    },[]) 

    return (
        <>
            <PodcastHeader podcastId={podcastId}/>
            <div>Episodes: {episodes && episodes.length}</div>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                {   episodes?.map(({trackId, trackName, releaseDate, trackTimeMillis}) => (
                        <tr key={trackId}>
                            <td><Link to={`/podcast/${podcastId}/episode/${trackId}`}>{trackName}</Link></td>
                            <td>{Moment(releaseDate).format("DD/MM/yyyy")}</td>
                            <td>{msConversion(trackTimeMillis)}</td>
                        </tr>
                    ))
                }            
                </tbody>
            </table>
        </>
    );
}

export default Podcast;