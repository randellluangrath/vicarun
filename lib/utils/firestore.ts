import {Firestore, Timestamp} from '@google-cloud/firestore';
import path from "path";
import {Session} from "@/lib/models/session";

const firestore = new Firestore({
    projectId: process.env.GOOGLE_CLOUD_PROJECT,
    keyFilename: path.join(process.cwd(), process.env.GOOGLE_APPLICATION_CREDENTIALS!),
});

export const saveSessionMetadata = async (userId: string[] | undefined, blobUrl: string) => {
    const sessionRef = firestore.collection('sessions').doc();
    await sessionRef.set({
        userId,
        blobUrl,
        createdAt: Timestamp.now(),
    });
    return sessionRef.id;
};

export const getSessions = async () => {
    const sessionsSnapshot = await firestore.collection('sessions').get();
    return sessionsSnapshot.docs.map((doc: { id: any; data: () => any; }) => ({
        id: doc.id,
        ...doc.data(),
    }));
};

export const getMockSessions = async () => {
    const mockSessions: Session[] = [
        {
            id: '1',
            userId: '1',
            title: 'Session 1',
            description: 'This is a description of session 1',
            blobUrl: 'https://www.youtube.com/watch?v=_1bpXG8GC18',
            createdAt: new Date(),
        },
        {
            id: '2',
            userId: '2',
            title: 'Session 2',
            description: 'This is a description of session 2',
            blobUrl: 'https://www.youtube.com/watch?v=yWrIebL9FWE',
            createdAt: new Date(),
        },
        {
            id: '3',
            userId: '3',
            title: 'Session 3',
            description: 'This is a description of session 3',
            blobUrl: 'https://www.youtube.com/watch?v=_1bpXG8GC18',
            createdAt: new Date(),
        },
        {
            id: '4',
            userId: '4',
            title: 'Session 4',
            description: 'This is a description of session 4',
            blobUrl: 'https://www.youtube.com/watch?v=yWrIebL9FWE',
            createdAt: new Date(),
        },
        {
            id: '5',
            userId: '5',
            title: 'Session 5',
            description: 'This is a description of session 5',
            blobUrl: 'https://www.youtube.com/watch?v=_1bpXG8GC18',
            createdAt: new Date(),
        },
        {
            id: '6',
            userId: '6',
            title: 'Session 6',
            description: 'This is a description of session 6',
            blobUrl: 'https://www.youtube.com/watch?v=yWrIebL9FWE',
            createdAt: new Date(),
        },
    ];

    return mockSessions;
}
