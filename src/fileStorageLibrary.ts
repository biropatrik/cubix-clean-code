
export class FileStorageLibrary {

    async saveContentIntoFile(filePath: string, content: string): Promise<void> {
        console.log(`Saving file content ${content} to path ${filePath}`);
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log(`File saved successfully`);
    }
}