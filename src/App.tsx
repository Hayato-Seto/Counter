import React from 'react';
import './styles/App.css';
import './styles/boot-strap.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './pages/home';
import Detail from './pages/detail';
import Create from './pages/create';
import Header from './pages/header';
import NotFound from './pages/notFound';

const App: React.FC = () => {
  return (
    <div className='App'>
      <Router>
        <div className="navi">
          <Header />
          <span className="borderSpan"></span><hr className="border" />
        </div>
        <div className="document">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/detail/:name">
              <Detail />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
