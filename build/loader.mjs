import yaml from 'yaml';
import path from 'node:path';
import fs from 'node:fs/promises';

const TARGET_EXT = '.yml';

export async function load(url, context, nextLoad) {
    const ext = path.extname(url);

    if (ext !== TARGET_EXT) return nextLoad(url);

    try {
        const fileUrl = new URL(url).pathname;
        const file = await fs.readFile(fileUrl, { encoding: 'utf-8' })

        const parsedToJson = JSON.stringify(yaml.parse(file));

        return {
            format: 'json',
            shortCircuit: true,
            source: parsedToJson,
        }
    } catch (error) {
        error.message = url + ': ' + error.message;
        throw error;
    }
}