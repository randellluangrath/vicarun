'use client';

import {useRouter} from 'next/navigation';
import SessionCapture from '@/app/new/session/sessionCapture';

const NewSessionPage = () => {
    const router = useRouter();

    const handleSessionEnd = () => {
        router.push('/dashboard');
    };

    return (
        <>
            <SessionCapture onSessionEnd={handleSessionEnd}/>
        </>
    );
};

export default NewSessionPage;