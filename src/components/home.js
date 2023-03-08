import React, {useEffect, useState} from 'react';
import ApiService from '../service/api';

function Home() {
    const [podcasts, setPodcasts] = useState([]);

    useEffect(() => {
        ApiService.getPodcasts()
                    .then(data => setPodcasts(data))
    }, []);

    return (
        <>
            <h1>Home</h1>
            <ul>
                {podcasts.map((podcast) => (
                    <li key={ podcast.id }>
                        <img src={podcast.image} alt={podcast.name}/>
                        <p>{ podcast.name }</p>
                        <p>Author: { podcast.author }</p>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Home;