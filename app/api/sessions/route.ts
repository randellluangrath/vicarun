import {NextRequest, NextResponse} from 'next/server';
import {parseForm} from "@/lib/utils/formidable";
import {uploadFileToStorage} from "@/lib/utils/storage";
import {getMockSessions, saveSessionMetadata} from "@/lib/utils/firestore";


export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
    try {
        const {fields, files} = await parseForm(req);
        const file = Array.isArray(files.file) ? files.file[0] : files.file;

        if (!file || !file.originalFilename) {
            return NextResponse.json({error: 'Invalid file upload'}, {status: 400});
        }

        const publicUrl = await uploadFileToStorage(file);
        const sessionId = await saveSessionMetadata(fields.userId, publicUrl);

        return NextResponse.json({message: 'File uploaded successfully', sessionId}, {status: 200});
    } catch (error) {
        // @ts-ignore
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

export async function GET() {
    try {
        const sessions = await getMockSessions();
        return NextResponse.json(sessions, {status: 200});
    } catch (error) {
        return NextResponse.json({error: 'Failed to fetch sessions'}, {status: 500});
    }
}
