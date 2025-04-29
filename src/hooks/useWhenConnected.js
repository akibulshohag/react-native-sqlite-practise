import {useRef, useMemo} from 'react';
import NetInfo from '@react-native-community/netinfo';

export default function useWhenConnected(callback) {
    const netInfo = NetInfo.useNetInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const callbackRef = useMemo(() => callback, []);
    const connectedRef = useRef(false);

    if (netInfo.isConnected !== connectedRef.current) {
        connectedRef.current = netInfo.isConnected;
        if (netInfo.isConnected) {
            callbackRef();
        }
    }
}
