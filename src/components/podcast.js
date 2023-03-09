import React, { useEffect, useState } from 'react';
import Header from './header';
import { Link, useParams } from 'react-router-dom';
import ApiService from '../service/api'
import Moment from 'moment';
import PodcastAside from './podcast-aside';

function Podcast() {
    const [showSpinner, setShowSpinner] = useState(true);
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
        ApiService.getEpisodesByPodcastId(podcastId)
                    .then(data => {
                        setEpisodes(data);
                        setShowSpinner(false);
                    });
    },[]) 

    return (
        <>
            <Header showSpinner={showSpinner}/>
            <div className="podcast-container">
                <PodcastAside podcastId={podcastId}/>
                <div className="podcast-body">
                    <div className="podcast-episodes box-shadow bold">Episodes: {episodes?.length}</div>
                    <table className="podcast-episodes-table box-shadow">
                        <thead className="text-align-left">
                            <tr>
                                <th>Title</th>
                                <th>Date</th>
                                <th>Duration</th>
                            </tr>
                        </thead>
                        <tbody className="text-align-left">
                        {   episodes?.map(({trackId, trackName, releaseDate, trackTimeMillis}) => (
                                <tr key={trackId}>
                                    <td><Link to={`/podcast/${podcastId}/episode/${trackId}`}>{trackName}</Link></td>
                                    <td>{Moment(releaseDate).format("DD/MM/yyyy")}</td>
                                    <td className="text-align-center">{msConversion(trackTimeMillis)}</td>
                                </tr>
                            ))
                        }            
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Podcast;