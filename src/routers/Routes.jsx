import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../components/Home';
import Technicians from '../components/Technicians';

const Routes = () => {
  return (
    <Switch>
      <Redirect exact push from="/" to="/home" />
      <Route path="/home">
        <Layout>
          <Home />
        </Layout>
      </Route>
      <Route exact path="/technicians">
        <Layout>
          <Technicians />
        </Layout>
      </Route>
      <Route exact path="/technicians/:action/:technicianId?">
        <Layout>
          <Technicians />
        </Layout>
      </Route>
    </Switch>
  );
};

export default Routes;
