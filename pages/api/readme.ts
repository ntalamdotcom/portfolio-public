// pages/api/readme.ts

import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next/types';
import path from 'path';

export default (req: NextApiRequest, res: NextApiResponse) => {
    const filePath = path.join(process.cwd(), 'README.md');

    try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        res.status(200).send(fileContents);
    } catch (err) {
        res.status(500).json({ error: 'Error reading README.md' });
    }
};