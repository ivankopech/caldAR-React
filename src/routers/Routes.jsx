import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../components/Home';
import Boilers from '../components/Boilers';

const Routes = () => {
  return (
    <Switch>
      <Redirect exact push from="/" to="/home" />
      <Route path="/home">
        <Layout>
          <Home />
        </Layout>
      </Route>
      <Route exact path="/boilers">
        <Layout>
          <Boilers />
        </Layout>
      </Route>
      <Route exact path="/boilers/:action/:boilersId?">
        <Layout>
          <Boilers />
        </Layout>
      </Route>
    </Switch>
  );
};

export default Routes;