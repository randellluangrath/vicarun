import { useState, useEffect } from 'react';
import {
    stopRunning,
    updateDistance,
    updateElapsedTime,
    updateMetrics,
    updateTotalTime,
} from '@/redux/features/runningMetricsSlice';
import {useAppDispatch} from "@/hooks/useRedux";

const useRunningActivity = (isActive: boolean) => {
    const dispatch = useAppDispatch();
    const [startTime, setStartTime] = useState<number | null>(null);
    const [lastTime, setLastTime] = useState<number | null>(null);

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
        if (isActive) {
            if (startTime === null) {
                setStartTime(Date.now());
            }
            setLastTime(Date.now());

            interval = setInterval(() => {
                dispatch(updateDistance(0.01));
                dispatch(updateElapsedTime(1));
                dispatch(updateTotalTime());
                dispatch(updateMetrics());
            }, 1000);
        } else {
            dispatch(stopRunning());
            if (lastTime !== null) {
                const currentTime = Date.now();
                dispatch(updateElapsedTime((currentTime - lastTime) / 1000));
                setLastTime(null);
            }
        }

        return () => {
            if (interval !== undefined) {
                clearInterval(interval);
            }
        };
    }, [isActive, startTime, lastTime, dispatch]);
};

export default useRunningActivity;
