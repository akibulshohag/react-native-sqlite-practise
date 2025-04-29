import React from 'react';

export default function useInterval(callback, timeout, dependencies) {
    React.useEffect(() => {
        const intervalId = setInterval(callback, timeout);

        return () => {
            clearInterval(intervalId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);
}
