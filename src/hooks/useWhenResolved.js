import React from 'react';

export default function useWhenResolved(value, callback) {
    React.useMemo(() => {
        value?.then(callback).catch(error => {
            console.log('error', error);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
}
