import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Feedbacks from './pages/Feedbacks';
import Game from './pages/Game';
import Login from './pages/Login';
import Ranking from './pages/Ranking';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Switch>
      <Route path="/game" component={ Game } />
      <Route path="/settings" component={ Settings } />
      <Route path="/feedbacks" component={ Feedbacks } />
      <Route path="/ranking" component={ Ranking } />
      <Route path="/" component={ Login } />
    </Switch>
  );
}
