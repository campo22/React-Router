/* eslint-disable react/prop-types */

import { EVENTS } from "./const.js";

export function navigate(href) {

    window.history.pushState({}, "", href);
    const navigationEvent = new Event(EVENTS.PUSHSTATE);
    window.dispatchEvent(navigationEvent);
}

export function Link({ target, to, ...props }) {

    const handleClick = (event) => {
        const isMainEvent = event.button === 0;
        const isModifiedEvent = (event.metaKey || event.alkey || event.ctrlKey || event.shiftKey);
        const ismanagebleEvent = target === undefined || target === "_self";

        if (isMainEvent && ismanagebleEvent && !isModifiedEvent) {
            event.preventDefault();
            navigate(to);
        }
    }

    return <a
        onClick={handleClick}
        href={to}
        target={target}
        {...props} />;
}
