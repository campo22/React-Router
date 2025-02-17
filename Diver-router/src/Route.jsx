/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';

export const Route = ({ path, Component }) => {

    return <Component />;
}

Route.propTypes = {
    path: PropTypes.string.isRequired,
    Component: PropTypes.elementType.isRequired,
};


