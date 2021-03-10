// If it is not authenticated and is not loading send the user to login, else to the requested component
import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// When destructuring you can use ...rest to take the rest without getting rid of it
// From component you get Component
// From auth you get isAuthenticated and loading
const PrivateRoute = ({
  // Must be passed when used in JSX like in App.js
  component: Component,
  // Mapped state required info
  auth: { isAuthenticated, loading },
  // Whatever was passed to the route
  ...rest
}) => (
  <Route
    //Whatever was passed to the route... Must stay there, like the exact path
    {...rest}
    render={(props) =>
      !isAuthenticated && !loading ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
// Pass in props the mapped state
export default connect(mapStateToProps)(PrivateRoute);
