import {useState, useEffect} from 'react';
import {requestPermissionsAsync, Accuracy, watchPositionAsync} from 'expo-location';

export default (shouldTrack, callback) => {
    const [err, setErr] = useState(null);
    
    useEffect(() => {
        let subscriber;

        const startWatching = async () => {
            let {status} = await requestPermissionsAsync();
            if (status !== 'granted') {
                setErr('Permission to access location was denied');
                return;
            }
    
            subscriber = await watchPositionAsync({
                accuracy: Accuracy.BestForNavigation,
                timeInterval: 1000,
                distanceInterval: 10
            }, callback);
        };

        if (shouldTrack){
            startWatching();
        }
        else {
            if (subscriber) {
                subscriber.remove();
            }
            subscriber = null;
        }

        return () => {
            if (subscriber){
                subscriber.remove();
            }

        };
    }, [shouldTrack, callback])

    return [err];
};