// import {Firestore, Timestamp} from '@google-cloud/firestore';
// import path from "path";
import {Session} from "@/lib/models/session";
//
// const firestore = new Firestore({
//     projectId: process.env.GOOGLE_CLOUD_PROJECT,
//     keyFilename: path.join(process.cwd(), process.env.GOOGLE_APPLICATION_CREDENTIALS!),
// });
//
// export const saveSessionMetadata = async (userId: string[] | undefined, blobUrl: string) => {
//     const sessionRef = firestore.collection('sessions').doc();
//     await sessionRef.set({
//         userId,
//         blobUrl,
//         createdAt: Timestamp.now(),
//     });
//     return sessionRef.id;
// };
//
// export const getSessions = async () => {
//     const sessionsSnapshot = await firestore.collection('sessions').get();
//     return sessionsSnapshot.docs.map((doc: { id: any; data: () => any; }) => ({
//         id: doc.id,
//         ...doc.data(),
//     }));
// };

export const getMockSessions = async () => {
    const mockSessions: Session[] = [
        {
            id: '1',
            userId: '1',
            title: 'Morning Run',
            description: 'A refreshing morning run through the park, enjoying the cool breeze and beautiful scenery.',
            blobUrl: 'https://www.youtube.com/watch?v=_1bpXG8GC18',
            createdAt: new Date(),
        },
        {
            id: '2',
            userId: '2',
            title: 'Evening Jog',
            description: 'An evening jog along the beach, watching the sunset and listening to the waves.',
            blobUrl: 'https://www.youtube.com/watch?v=yWrIebL9FWE',
            createdAt: new Date(),
        },
        {
            id: '3',
            userId: '3',
            title: 'City Marathon',
            description: 'Participated in a city marathon, running through the bustling streets and cheering crowds.',
            blobUrl: 'https://www.youtube.com/watch?v=_1bpXG8GC18',
            createdAt: new Date(),
        },
        {
            id: '4',
            userId: '4',
            title: 'Trail Run',
            description: 'Exploring the trails in the forest, enjoying the peaceful environment and natural beauty.',
            blobUrl: 'https://www.youtube.com/watch?v=yWrIebL9FWE',
            createdAt: new Date(),
        },
        {
            id: '5',
            userId: '5',
            title: 'Sunrise Run',
            description: 'A sunrise run to start the day with energy, watching the sky change colors as the sun rises.',
            blobUrl: 'https://www.youtube.com/watch?v=_1bpXG8GC18',
            createdAt: new Date(),
        },
        {
            id: '6',
            userId: '6',
            title: 'Mountain Run',
            description: 'Challenging mountain run, overcoming steep climbs and enjoying breathtaking views from the top.',
            blobUrl: 'https://www.youtube.com/watch?v=yWrIebL9FWE',
            createdAt: new Date(),
        },
    ];

    return mockSessions;
}

