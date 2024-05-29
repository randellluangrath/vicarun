import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { getDistance } from 'geolib';

interface SessionCaptureProps {
    onSessionEnd: (distance: number) => void;
}

const SessionCapture: React.FC<SessionCaptureProps> = ({ onSessionEnd }) => {
    const [isSessionActive, setIsSessionActive] = useState(false);
    const [distance, setDistance] = useState(0);
    const [currentPosition, setCurrentPosition] = useState<GeolocationPosition | null>(null);
    const watchIdRef = useRef<number | null>(null);
    const geofenceRadius = useRef<number>(12); // initial radius in meters
    const [polledPositions, setPolledPositions] = useState<GeolocationPosition[]>([]);

    const handleSessionStart = () => {
        setIsSessionActive(true);
        setDistance(0);
        setCurrentPosition(null);
        startTracking();
    };

    const handleSessionEnd = () => {
        setIsSessionActive(false);
        stopTracking();
        onSessionEnd(distance);
    };

    const startTracking = () => {
        if ('geolocation' in navigator) {
            watchIdRef.current = navigator.geolocation.watchPosition(
                position => {
                    setPolledPositions(prev => [...prev, position]);
                    if (currentPosition) {
                        const dist = getDistance(
                            {
                                latitude: currentPosition.coords.latitude,
                                longitude: currentPosition.coords.longitude
                            },
                            {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude
                            }
                        );

                        if (dist) {
                            setDistance(prev => prev + dist * 0.000621371); // convert to miles
                            setCurrentPosition(position);
                            updateGeofenceRadius(position.coords.speed);
                        }
                    } else {
                        setCurrentPosition(position);
                    }
                },
                error => console.error(error),
                {
                    enableHighAccuracy: true,
                    maximumAge: 0,
                    timeout: 5000
                },
            );
        }
    };

    const stopTracking = () => {
        if (watchIdRef.current !== null) {
            navigator.geolocation.clearWatch(watchIdRef.current);
        }
    };

    const updateGeofenceRadius = (speed: number | null) => {
        if (speed === null) return;

        if (speed < 1.4) { // walking speed
            geofenceRadius.current = 12; // 12 meters
        } else if (speed < 5.6) { // running speed
            geofenceRadius.current = 25; // double the radius for running
        } else { // biking or driving
            geofenceRadius.current = 100; // much larger radius
        }
    };

    return (
        <div className="relative w-full h-screen">
            <div className="absolute top-0 left-0 m-4">
                {isSessionActive && (
                    <Button size={"sm"} variant={"ghost"} onClick={handleSessionEnd}>
                        <span className={"text-3xl text-white font-extralight"}>x</span>
                    </Button>
                )}
            </div>

            <div className="absolute top-0 right-0 m-4">
                {isSessionActive && (
                    <div className="bg-white p-2 rounded shadow">
                        <p className={"font-bold"}>Distance Traveled: {distance.toFixed(2)} miles</p>
                        {polledPositions.map((position, index) => (
                            <p key={index}>Polled Position {index + 1}: Latitude {position.coords.latitude.toFixed(6)}, Longitude {position.coords.longitude.toFixed(6)}</p>
                        ))}
                    </div>
                )}
            </div>

            <div className="absolute bottom-0 w-full flex justify-center p-4 gap-5 py-6">
                {!isSessionActive && (
                    <Button
                        variant={"secondary"}
                        size={"lg"}
                        onClick={handleSessionStart}
                    >
                        Start Tracking
                    </Button>
                )}
            </div>
        </div>
    );
};

export default SessionCapture;
