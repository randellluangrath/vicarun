import React from 'react';

interface SessionWidgetProps {
    session: { id: string; blob: Blob };
}

const SessionWidget: React.FC<SessionWidgetProps> = ({session}) => {
    return (
        <div className="p-4 border rounded-lg flex items-center justify-between">
            <video
                controls
                width="300"
                src={URL.createObjectURL(session.blob)}
                className="rounded shadow-sm"
            />
            <div className="ml-4">
                <h5 className="text-lg font-medium">Session {session.id}</h5>
                <a
                    href={URL.createObjectURL(session.blob)}
                    download={`session_${session.id}.webm`}
                    className="mt-2 text-blue-600 hover:underline"
                >
                    Download
                </a>
            </div>
        </div>
    );
};

export default SessionWidget;
