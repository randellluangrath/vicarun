export interface Session {
    id: string;
    userId: string;
    title: string;
    description: string;
    blobUrl: string;
    createdAt: Date;
}