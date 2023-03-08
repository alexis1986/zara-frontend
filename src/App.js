import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/home';
import Podcast from './components/podcast';
import Episode from './components/episode';
import Header from './components/header';

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 100);
  }, []);

  useEffect(() => {
    setLoading(true);
  }, [location]);


  return (
    <div className="App">
      <Header loading={loading}/>
      <Routes >
        <Route exact path='/' element={ <Home/> } />
        <Route exact path='/podcast/:podcastId' element={ <Podcast/> } />
        <Route exact path='/podcast/:podcastId/episode/:episodeId' component={ <Episode/> } />
      </Routes>
    </div>
  );
}

export default App;
