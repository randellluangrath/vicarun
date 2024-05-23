'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import RunningMetricsWidget from './RunningMetricsWidget';

const RunningMetricsPage = () => {
    const [isActive, setIsActive] = useState(false);

    const handleButtonClick = () => {
        setIsActive((prev) => !prev);
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-10">

            <RunningMetricsWidget isActive={isActive}/>

            <Button variant={"secondary"} size={"lg"} onClick={handleButtonClick}>
                {isActive ? "Stop" : "Start Sending It"}
            </Button>
        </div>
    );
};

export default RunningMetricsPage;
