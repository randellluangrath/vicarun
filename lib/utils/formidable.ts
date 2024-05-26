import {Fields, Files, IncomingForm} from 'formidable';
import {IncomingMessage} from 'http';
import {NextRequest} from 'next/server';

export const parseForm = (req: NextRequest): Promise<{ fields: Fields, files: Files }> => {
    const form = new IncomingForm();
    return new Promise((resolve, reject) => {
        form.parse(req as unknown as IncomingMessage, (err, fields, files) => {
            if (err) {
                reject(err);
            } else {
                resolve({fields, files});
            }
        });
    });
};
