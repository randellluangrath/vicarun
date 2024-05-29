'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import SessionCard from "@/app/dashboard/sessionCard";
import Header from "@/app/dashboard/header";

interface DashboardPageProps {
    initialSessions: any[];
}

const DashboardPage = ({initialSessions}: DashboardPageProps) => {
    const [sessions, setSessions] = useState(initialSessions);
    const router = useRouter();

    const handleStartNewSession = () => {
        router.push('/new/session');
    };

    return (
        <div className="relative w-full h-screen flex flex-col my-16">
            <Header/>
            <div className="flex flex-col flex-grow items-center justify-center p-2">
                <div className="w-full max-w-2xl flex-grow flex flex-col items-center justify-center">
                    {sessions && sessions.length > 0 ? (
                        <div className="space-y-4 w-full overflow-auto">
                            {sessions.map((session) => (
                                <SessionCard key={session.id} session={session}/>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center">No sessions recorded yet.</p>
                    )}
                </div>
            </div>
            <div className="w-full flex justify-center py-2 bg-white border-t shadow-lg fixed bottom-0">
                <Button size={"sm"} variant={"ghost"} onClick={handleStartNewSession}>
                    Start
                </Button>
            </div>
        </div>
    );
};

export default DashboardPage;
