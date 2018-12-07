import React from "react";
import { Switch, Route } from "react-router-dom";

import Login from "./Login";
import SignUp from "./Signup";
import Profile from "./Profile";
import Error from "./Error";
import AddPost from "./AddPost";

const Routes = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/profile/:id" component={Profile} />
      <Route path="/post/:idUser" component={AddPost} />
      <Route component={Error} />
    </Switch>
  </main>
);

export default Routes;
