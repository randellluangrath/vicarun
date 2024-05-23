import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RunningMetricsWidgetProps {
    isActive: boolean;
}

const RunningMetricsWidget: React.FC<RunningMetricsWidgetProps> = ({ isActive }) => {
    const [distance, setDistance] = useState(0);
    const [avgMileTime, setAvgMileTime] = useState('00:00');
    const [currentPace, setCurrentPace] = useState('00:00');
    const [totalTime, setTotalTime] = useState('00:00:00');
    const [startTime, setStartTime] = useState<number | null>(null);
    const [elapsedTime, setElapsedTime] = useState(0); // Total elapsed time in seconds
    const [lastDistance, setLastDistance] = useState(0);
    const [lastTime, setLastTime] = useState<number | null>(null);

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
        if (isActive) {
            if (startTime === null) {
                setStartTime(Date.now());
            }
            setLastTime(Date.now());

            interval = setInterval(() => {
                setDistance((prev) => {
                    const newDistance = prev + 0.01;
                    updateMetrics(newDistance);
                    return newDistance;
                });

                setElapsedTime((prev) => prev + 1);
                setTotalTime(formatTime(elapsedTime + 1)); // Increment elapsed time in seconds
            }, 1000);
        } else if (lastTime !== null) {
            const currentTime = Date.now();
            setElapsedTime((prev) => prev + (currentTime - lastTime) / 1000); // Update elapsed time in seconds
            setLastTime(null);
        }

        return () => {
            if (interval !== undefined) {
                clearInterval(interval);
            }
        };
    }, [isActive, startTime, lastTime]);

    const updateMetrics = (newDistance: number) => {
        const currentTime = Date.now();
        if (lastTime !== null) {
            const elapsed = (currentTime - lastTime) / 1000; // in seconds
            const pace = (elapsed / (newDistance - lastDistance)).toFixed(2); // time per mile
            setCurrentPace(formatTime(parseFloat(pace)));
        }
        if (newDistance >= 1) {
            const totalElapsedTime = elapsedTime; // in seconds
            const avgPace = (totalElapsedTime / newDistance).toFixed(2); // average time per mile
            setAvgMileTime(formatTime(parseFloat(avgPace)));
        }
        setLastDistance(newDistance);
        setLastTime(currentTime);
    };

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <Card className="max-w-lg mx-auto">
            <CardHeader>
                <CardTitle>Live Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="mb-2">
                    <span className="font-medium">Distance Traveled:</span> {distance.toFixed(2)} miles
                </div>
                <div className="mb-2">
                    <span className="font-medium">Average Mile Time:</span> {avgMileTime}
                </div>
                <div className="mb-2">
                    <span className="font-medium">Current Pace:</span> {currentPace}
                </div>
                <div>
                    <span className="font-medium">Total Running Time:</span> {totalTime}
                </div>
            </CardContent>
        </Card>
    );
};

export default RunningMetricsWidget;
