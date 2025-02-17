/* eslint-disable react/prop-types */ function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
import { jsx as _jsx } from "react/jsx-runtime";
import { Children, useEffect, useState } from 'react';
import { EVENTS } from './const';
import { match } from 'path-to-regexp';
import { getCurrentPath } from './utils';
export function Router(param) {
    var children = param.children, _param_routes = param.routes, routes = _param_routes === void 0 ? [] : _param_routes, tmp = param.defaultComponent, DefaultComponent = tmp === void 0 ? function() {
        return /*#__PURE__*/ _jsx("h1", {
            children: "404"
        });
    } : tmp;
    var _rourterToRender_find;
    var _useState = _sliced_to_array(useState(getCurrentPath()), 2), currentPath = _useState[0], setCurrentPath = _useState[1];
    useEffect(function() {
        var onLocationChange = function() {
            setCurrentPath(getCurrentPath());
        };
        window.addEventListener(EVENTS.PUSHSTATE, onLocationChange);
        window.addEventListener(EVENTS.POPSTATE, onLocationChange);
        return function() {
            window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange);
            window.removeEventListener(EVENTS.POPSTATE, onLocationChange);
        };
    }, []);
    var routerParams = {};
    var routerForchildren = Children.map(children, function(param) {
        var props = param.props, type = param.type;
        var name = type.name;
        var isRoute = name === 'Route';
        return isRoute ? props : null;
    });
    var rourterToRender = routes.concat(routerForchildren).filter(Boolean);
    var Page = (_rourterToRender_find = rourterToRender.find(function(param) {
        var path = param.path;
        if (path === currentPath) return true;
        // hemos usado la librería path-to-regexp 
        // para poder comparar rutas con parámetros
        // por ejemplo, /user/:id
        var matcheUrl = match(path, {
            decode: decodeURIComponent
        });
        var result = matcheUrl(currentPath);
        if (!result) return false;
        routerParams = result.params;
        return true;
    })) === null || _rourterToRender_find === void 0 ? void 0 : _rourterToRender_find.Component;
    return Page ? /*#__PURE__*/ _jsx(Page, {
        routerParams: routerParams
    }) : /*#__PURE__*/ _jsx(DefaultComponent, {});
}
