import React, {useState} from 'react';
import {Session} from "@/lib/models/session";

interface SessionCardProps {
    session: Session;
}

const SessionCard: React.FC<SessionCardProps> = ({session}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="p-4 border flex items-center justify-between flex-col gap-2 text-left">
            <div className="user-stub text-left w-full flex-row flex items-center gap-2">
                <img src="https://api.dicebear.com/8.x/pixel-art/svg?seed=Zoe" className="rounded-full w-8 h-8"/>
                <div className="flex flex-col">
                    <p className="text-sm font-medium">Zoe</p>
                    <p className="text-xs">2 hours ago</p>
                </div>
            </div>
            <p className="text-lg font-medium w-full text-left">{session.title}</p>

            <div className="metrics-stub w-full flex flex-row gap-6">
                <div className={"metric-item"}>
                    <p className="text-xs">Distance</p>
                    <p className="text-sm font-semibold">9.34</p>
                </div>
                <div className={"metric-item"}>
                    <p className="text-xs">Pace</p>
                    <p className="text-sm font-semibold">9:08 /mile</p>
                </div>
                <div className={"metric-item"}>
                    <p className="text-xs">Duration</p>
                    <p className="text-sm font-semibold">1h 25m</p>
                </div>
            </div>
            <video
                controls
                autoPlay
                muted
                playsInline
                width="100%"
                className="rounded shadow-sm"
            />
        </div>
    );
};

export default SessionCard;
