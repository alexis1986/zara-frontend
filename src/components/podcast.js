import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiService from '../service/api'
import Moment from 'moment';

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
        ApiService.getEpisodesByPodcastId(podcastId).then(data => {
            console.log(data);
            setEpisodes(data)
        })
    },[podcastId]) 

    return (
        <>
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
                {   episodes && (episodes.map(({trackId, trackName, releaseDate, trackTimeMillis}) => (
                        <tr key={trackId}>
                            <td>{trackName}</td>
                            <td>{Moment(releaseDate).format("DD/MM/yyyy")}</td>
                            <td>{msConversion(trackTimeMillis)}</td>
                        </tr>
                    )))
                }            
                </tbody>
            </table>
        </>
    );
}

export default Podcast;