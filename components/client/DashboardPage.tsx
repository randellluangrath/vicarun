'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import SessionCapture from '@/components/SessionCapture';
import SessionCard from '@/components/SessionCard'; // Import the newly created widget
import Header from '@/app/dashboard/Header';

const DashboardPage = () => {
    const [sessions, setSessions] = useState<{ id: string; blob: Blob }[]>([]);
    const [showRecorder, setShowRecorder] = useState(false);

    const handleSessionEnd = (blob: Blob | null) => {
        if (blob && blob.size > 0) {
            setSessions((prev) => [
                ...prev,
                { id: `${prev.length + 1}`, blob },
            ]);
        }
        setShowRecorder(false);
    };

    const handleStartNewSession = () => {
        setShowRecorder(true);
    };

    return (
        <div className="relative w-full h-screen flex flex-col">
            {!showRecorder ? (
                <>
                    <Header />
                    <div className="flex flex-col items-center justify-center p-4 flex-grow text-center">
                        <div className="w-full max-w-2xl mt-10">
                            <h2 className="text-2xl font-bold mb-4">Weekly Sessions</h2>
                            {sessions.length > 0 ? (
                                <div className="space-y-4">
                                    {sessions.map((session) => (
                                        <SessionCard key={session.id} session={session} />
                                    ))}
                                </div>
                            ) : (
                                <p>No sessions recorded yet.</p>
                            )}
                        </div>
                    </div>
                    <div className="sticky bottom-0 w-full flex justify-center py-6 bg-white border-t shadow-lg">
                        <Button size={"sm"} variant={"outline"} onClick={handleStartNewSession}>
                            Start New Session
                        </Button>
                    </div>
                </>
            ) : (
                <SessionCapture onSessionEnd={handleSessionEnd} />
            )}
        </div>
    );
};

export default DashboardPage;
