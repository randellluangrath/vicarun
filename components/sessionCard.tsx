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
        <div className="p-4 border flex items-center justify-between flex-col gap-2">
            <h3 className="text-lg font-medium text-left w-full">{session.title}</h3>
            <p className={`text-left text-sm w-full ${isExpanded ? '' : 'line-clamp-2'}`}>
                {session.description}
            </p>
            <button onClick={toggleReadMore} className="text-xs self-start">
                {isExpanded ? 'Read Less' : 'Read More'}
            </button>
            <video
                controls
                autoPlay
                muted
                playsInline
                width="100%"
                src={session.blobUrl}
                className="rounded shadow-sm"
            />
        </div>
    );
};

export default SessionCard;
