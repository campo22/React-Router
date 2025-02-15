/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { EVENTS } from './const';
import { match } from 'path-to-regexp';

export function Router({ routes = [], defaultComponent: DefaultComponent = () => <h1>404</h1> }) {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    useEffect(() => {
        const onLocationChange = () => {
            setCurrentPath(window.location.pathname);
        };
        window.addEventListener(EVENTS.PUSHSTATE, onLocationChange);
        window.addEventListener(EVENTS.POPSTATE, onLocationChange);

        return () => {
            window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange);
            window.removeEventListener(EVENTS.POPSTATE, onLocationChange);
        };
    }, []);

    let routerParams = {};

    const Page = routes.find(({ path }) => {
        if (path === currentPath) return true;

        // hemos usado la librería path-to-regexp 
        // para poder comparar rutas con parámetros
        // por ejemplo, /user/:id

        const matcheUrl = match(path, { decode: decodeURIComponent });
        const result = matcheUrl(currentPath);
        if (!result) return false;

        routerParams = result.params;
        return true;



    })?.Component;

    return Page ? <Page routerParams={routerParams} /> : <DefaultComponent />;
}