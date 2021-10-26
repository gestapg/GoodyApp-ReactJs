import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import AddItem from './pages/AddItem';
import HomePage from './pages/Hompage';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import store from './store';
import DetailItem from './pages/DetaiItem';
import EditItem from './pages/EditItem';
import Layout from './Components/Layouts';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            <Route path="/" exact>
              <Login />
            </Route>
            <Route path="/home">
              <HomePage />
            </Route>
            <Route path="/add-item">
              <AddItem />
            </Route>
            <Route path="/detail/:id">
              <DetailItem />
            </Route>
            <Route path="/edit-item/:id">
              <EditItem />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
