import React, {useState, useRef, useEffect} from 'react';
import {Button} from '@/components/ui/button';
import {getPreciseDistance} from 'geolib';
import {formatTime} from "@/lib/utils/utils";

interface SessionCaptureProps {
    onSessionEnd: (distance: number, time: number, averageSpeed: number) => void;
}

const SessionCapture: React.FC<SessionCaptureProps> = ({onSessionEnd}) => {
    const [isSessionActive, setIsSessionActive] = useState(false);
    const [isSessionPaused, setIsSessionPaused] = useState(false);
    const [distance, setDistance] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [averageSpeed, setAverageSpeed] = useState(0);
    const currentPositionRef = useRef<GeolocationPosition | null>(null);
    const watchIdRef = useRef<number | null>(null);
    const [distances, setDistances] = useState<number[]>([]);
    const [pauseTime, setPauseTime] = useState(0);

    const handleSessionStart = () => {
        setIsSessionActive(true);
        setIsSessionPaused(false);
        setDistance(0);
        setStartTime(Date.now());
        startTracking();
    };

    const handleSessionPause = () => {
        setIsSessionPaused(true);
        setPauseTime(Date.now());
        stopTracking();
    };

    const handleSessionResume = () => {
        setIsSessionPaused(false);
        const now = Date.now();
        const pauseDuration = now - pauseTime;
        setStartTime(prevStartTime => prevStartTime + pauseDuration);
        startTracking();
    };

    const handleSessionEnd = () => {
        setIsSessionActive(false);
        stopTracking();
        const endTime = Date.now();
        const elapsedTime = (endTime - startTime) / 1000; // convert to seconds
        setElapsedTime(elapsedTime);
        const averageSpeed = distance / (elapsedTime / 3600); // convert time to hours for mph
        setAverageSpeed(averageSpeed);
        onSessionEnd(distance, elapsedTime, averageSpeed);
    };

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isSessionActive && !isSessionPaused) {
            interval = setInterval(() => {
                const now = Date.now();
                const elapsed = (now - startTime) / 1000; // convert to seconds
                setElapsedTime(elapsed);
            }, 1000);
        } else if (!isSessionActive && interval) {
            clearInterval(interval);
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isSessionActive, isSessionPaused, startTime]);

    const startTracking = () => {
        if ('geolocation' in navigator) {
            watchIdRef.current = navigator.geolocation.watchPosition(
                position => {
                    if (currentPositionRef.current && position.coords.speed !== null && position.coords.speed > 0) {
                        const dist = getPreciseDistance(
                            {
                                latitude: currentPositionRef.current.coords.latitude,
                                longitude: currentPositionRef.current.coords.longitude
                            },
                            {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude
                            }, 0.01
                        );

                        setDistances(prev => [...prev, dist]);

                        if (dist) {
                            setDistance(prev => prev + (dist * 0.000621371)); // convert to miles
                        }
                    }
                    currentPositionRef.current = position;
                },
                error => console.error(error),
                {
                    enableHighAccuracy: true,
                    maximumAge: 20000,
                    timeout: 10000
                },
            );
        }
    };

    const stopTracking = () => {
        if (watchIdRef.current !== null) {
            navigator.geolocation.clearWatch(watchIdRef.current);
        }
    };

    useEffect(() => {
        if (isSessionActive && distance > 0 && elapsedTime > 0) {
            const averageSpeed = distance / (elapsedTime / 3600); // convert time to hours for mph
            setAverageSpeed(averageSpeed);
        }
    }, [distance, elapsedTime, isSessionActive]);

    return (
        <div className="relative w-full h-screen">
            <div className="absolute top-0 right-0 m-4">
                <div className="bg-white p-2 shadow flex-row flex gap-4">
                    <div className="flex-col">
                        <p className="text-xs">Distance (MI)</p> <p>{distance.toFixed(2)} miles</p>
                    </div>
                    <div className="flex-col"><p className="text-xs">Time Elapsed</p>  <p>{formatTime(elapsedTime)}</p>
                    </div>
                    <div className="flex-col"><p className="text-xs">Avg Speed (MPH)</p> <p>{averageSpeed.toFixed(2)} mph</p></div>
                </div>
            </div>

            <div>
                {distances.map((distance, index) => (
                    <p key={index}>Distance logged: {distance} meters</p>
                ))}
            </div>

            <div className="absolute bottom-0 w-full flex justify-center p-4 gap-5 py-6">
                {!isSessionActive && !isSessionPaused && (
                    <Button
                        variant={"secondary"}
                        size={"lg"}
                        onClick={handleSessionStart}
                    >
                        Start
                    </Button>
                )}
                {isSessionActive && !isSessionPaused && (
                    <Button
                        variant={"secondary"}
                        size={"lg"}
                        onClick={handleSessionPause}
                    >
                        Pause
                    </Button>
                )}
                {isSessionActive && isSessionPaused && (
                    <Button
                        variant={"secondary"}
                        size={"lg"}
                        onClick={handleSessionResume}
                    >
                        Resume
                    </Button>
                )}
                {isSessionActive && (
                    <Button
                        variant={"destructive"}
                        size={"lg"}
                        onClick={handleSessionEnd}
                    >
                        Finish
                    </Button>
                )}
            </div>
        </div>
    );
};

export default SessionCapture;
