import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Podcast from './components/podcast';
import Episode from './components/episode';

function App() {
  

  return (
    <Router>
      <div className="app">
        <Routes >
          <Route exact path='/' element={ <Home/> } />
          <Route exact path='/podcast/:podcastId' element={ <Podcast/> } />
          <Route exact path='/podcast/:podcastId/episode/:episodeId' element={ <Episode/> } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
