import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import ProfilePage from './pages/map';
// import KeywordPage from './pages/map2';
import Home from './pages/test'

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" component={ProfilePage} />
        <Route exact path="/Keyword" component={KeywordPage} />
        <Route exact path="/" component={Home} />
      </Routes>
    </Router>
  );
};

export default AppRouter;