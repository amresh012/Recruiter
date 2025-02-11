import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({  Component, isAuthenticated, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            )
        }
    />
);
ProtectedRoute.propTypes = {
    Component: PropTypes.elementType.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

export default ProtectedRoute;