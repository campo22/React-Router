/* eslint-disable no-unused-vars */ import { jsx as _jsx } from "react/jsx-runtime";
import PropTypes from 'prop-types';
export var Route = function(param) {
    var path = param.path, Component = param.Component;
    return /*#__PURE__*/ _jsx(Component, {});
};
Route.propTypes = {
    path: PropTypes.string.isRequired,
    Component: PropTypes.elementType.isRequired
};
