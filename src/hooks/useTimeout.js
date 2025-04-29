import React from 'react';

export default function useTimeout(callback, timeout, dependencies) {
    React.useEffect(() => {
        const intervalId = setTimeout(callback, timeout);

        return () => {
            clearTimeout(intervalId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);
}
