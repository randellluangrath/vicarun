// This function fetches data from your API or database
import DashboardPage from "@/components/client/dashboardPage";

async function fetchSessions() {
    const response = await fetch('http://localhost:3000/api/sessions');
    if (!response.ok) {
        throw new Error('Failed to fetch sessions');
    }
    const data = await response.json();
    return data.sessions;
}

export default async function Page() {
    const sessions = await fetchSessions();

    return (
        <DashboardPage initialSessions={sessions}/>
    );
}
