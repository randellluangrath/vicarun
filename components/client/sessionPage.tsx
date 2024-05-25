'use client';

import {useRouter} from 'next/navigation';
import SessionCapture from '@/components/sessionCapture';

const NewSessionPage = () => {
    const router = useRouter();

    const handleSessionEnd = (blob: Blob | null) => {
        // Handle the end of the session, e.g., navigate back to the dashboard or save the session
        if (blob && blob.size > 0) {
            // Assuming you have a method to save the session
            // saveSession(blob);
        }
        // Navigate back to the dashboard
        router.push('/dashboard');
    };

    return (
        <>
            <SessionCapture onSessionEnd={handleSessionEnd}/>
        </>
    );
};

export default NewSessionPage;
