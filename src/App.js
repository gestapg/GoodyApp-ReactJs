import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import AddItem from './pages/AddItem';
import HomePage from './pages/Hompage';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

import DetailItem from './pages/DetaiItem';
import EditItem from './pages/EditItem';
import Layout from './Components/Layouts';

function App() {
  const { isLoggedIn } = useSelector(state => state.auth);

  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/home">
            {isLoggedIn && <HomePage />}
            {!isLoggedIn && <Redirect to="/" />}
          </Route>
          <Route path="/add-item">
            {isLoggedIn && <AddItem />}
            {!isLoggedIn && <Redirect to="/" />}
          </Route>
          <Route path="/detail/:id">
            {isLoggedIn && <DetailItem />}
            {!isLoggedIn && <Redirect to="/" />}
          </Route>
          <Route path="/edit-item/:id">
            {isLoggedIn && <EditItem />}
            {!isLoggedIn && <Redirect to="/" />}
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
