'use client';

import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {RootState} from "@/redux/store";
import {useAppSelector} from "@/hooks/useRedux";

interface LiveWidgetProps {
    isActive: boolean;
}

const MetricsWidget: React.FC<LiveWidgetProps> = ({isActive}) => {
    const {distance, avgMileTime, currentPace, totalTime} = useAppSelector((state: RootState) => state.runningMetrics);

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

export default MetricsWidget;
