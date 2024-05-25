'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import SessionCard from "@/components/sessionCard";
import Footer from "@/components/layout/footer";

interface DashboardPageProps {
    initialSessions: any[];
}

const DashboardPage = ({ initialSessions }: DashboardPageProps) => {
    const [sessions, setSessions] = useState(initialSessions);
    const router = useRouter();

    const handleStartNewSession = () => {
        router.push('/new/session');
    };

    return (
        <div className="relative w-full h-screen flex flex-col">
            <div className="flex flex-col flex-grow items-center justify-center p-4">
                <div className="w-full max-w-2xl flex-grow flex flex-col items-center justify-center">
                    {sessions.length > 0 ? (
                        <div className="space-y-4 w-full overflow-auto">
                            {sessions.map((session) => (
                                <SessionCard key={session.id} session={session} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center">No sessions recorded yet.</p>
                    )}
                </div>
            </div>
            <Footer>
                <Button size={"sm"} variant={"outline"} onClick={handleStartNewSession}>
                    Start New Session
                </Button>
            </Footer>
        </div>
    );
};

export default DashboardPage;
