import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './components/Home';
import myBucket from './components/Bucket.jsx';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter, Route, Switch } from 'react-router-dom';

ReactDOM.render(
	<HashRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/mybucket" component={myBucket} />
        </Switch>
    </HashRouter>,
    document.getElementById('root')
);
registerServiceWorker();
/*
{
              JSON.stringify(data[0].files).split("{")[2].split(",")[6]==undefined ? "No Content": 
              JSON.stringify(data[0].files).split("{")[2].split(",")[6]
             }
             */