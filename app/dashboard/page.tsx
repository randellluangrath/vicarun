// This function fetches data from your API or database
import DashboardPage from "@/components/client/dashboardPage";
import {Session} from "@/lib/models/session";

async function fetchSessions(): Promise<Session[]> {
    const response = await fetch('http://localhost:3000/api/sessions');
    if (!response.ok) {
        throw new Error('Failed to fetch sessions');
    }
    const data = await response.json();
    return data.map((session: any) => (
        {
            id: session.id,
            userId: session.userId,
            title: session.title,
            description: session.description,
            blobUrl: session.blobUrl,
            createdAt: new Date(session.createdAt),
        }));
}

export default async function Page() {
    const sessions = await fetchSessions();

    return (
        <DashboardPage initialSessions={sessions}/>
    );
}
