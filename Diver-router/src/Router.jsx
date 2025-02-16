/* eslint-disable react/prop-types */
import { Children, useEffect, useState } from 'react';
import { EVENTS } from './const';
import { match } from 'path-to-regexp';
import { getCurrentPath } from './utils';



export function Router({ children, routes = [], defaultComponent: DefaultComponent = () => <h1>404</h1> }) {


    const [currentPath, setCurrentPath] = useState(getCurrentPath());


    useEffect(() => {
        const onLocationChange = () => {
            setCurrentPath(getCurrentPath());
        };
        window.addEventListener(EVENTS.PUSHSTATE, onLocationChange);
        window.addEventListener(EVENTS.POPSTATE, onLocationChange);

        return () => {
            window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange);
            window.removeEventListener(EVENTS.POPSTATE, onLocationChange);
        };
    }, []);

    let routerParams = {};

    const routerForchildren = Children.map(children, ({ props, type }) => {

        const { name } = type;
        const isRoute = name === 'Route';

        return isRoute ? props : null;

    })

    const rourterToRender = routes.concat(routerForchildren).filter(Boolean);

    const Page = rourterToRender.find(({ path }) => {
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