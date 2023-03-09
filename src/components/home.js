import React, {useEffect, useState} from 'react';
import Header from './header';
import { Link } from 'react-router-dom';
import ApiService from '../service/api';

function Home() {
    const [showSpinner, setShowSpinner] = useState(true);
    const [podcasts, setPodcasts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const onChangeHandle = event => setSearchTerm(event.target.value);
    const filteredItems = podcasts.filter(
                                    (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.author.toLowerCase().includes(searchTerm.toLowerCase())
                                   );

    useEffect(() => {
        ApiService.getPodcasts()
                    .then(data => {
                        setPodcasts(data)
                        setShowSpinner(false)
                    })
    }, []);

    return (
        <>
            <Header showSpinner={showSpinner}/>
            <div>
                <div className="filter-container">
                    <p className="podcasts-count">{filteredItems.length}</p>
                    <input type="text" value={searchTerm} onChange={onChangeHandle} className="filter-textbox" placeholder="Filter podcasts..."/>
                </div>
                
                <div className="podcasts-gallery">
                    {filteredItems.map((podcast) => (
                        <Link to={`/podcast/${podcast.id}`}>
                            <div key={ podcast.id } className="podcast-card">
                                <img src={podcast.image} alt={podcast.name} className="podcast-image"/>
                                <div className="podcast-card-text box-shadow">
                                    <p className="podcast-name bold">{ podcast.name }</p>
                                    <p className="podcast-author">Author: { podcast.author }</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;