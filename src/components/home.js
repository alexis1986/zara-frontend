import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../service/api';

function Home() {
    const [podcasts, setPodcasts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const onChangeHandle = event => setSearchTerm(event.target.value);
    const filteredItems = podcasts.filter(
                                    (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.author.toLowerCase().includes(searchTerm.toLowerCase())
                                   );

    useEffect(() => {
        ApiService.getPodcasts()
                    .then(data => setPodcasts(data))
    }, []);

    return (
        <>
            <p>{filteredItems.length}</p>
            <input type="text" value={searchTerm} onChange={onChangeHandle}/>
            <ul>
                {filteredItems.map((podcast) => (
                    <Link to={`/podcast/${podcast.id}`}>
                        <li key={ podcast.id }>
                            <img src={podcast.image} alt={podcast.name}/>
                            <p>{ podcast.name }</p>
                            <p>Author: { podcast.author }</p>
                        </li>
                    </Link>
                ))}
            </ul>
        </>
    );
}

export default Home;