import { InvalidImageException } from "./exceptions/invalidImageError";
import { ProcessingErrorException } from "./exceptions/processingError";
import { FileStorageLibrary } from "./fileStorageLibrary";
import { ImageProcessingLibrary } from "./imageProcessingLibrary";

export class ImageProcessor {

    constructor(private imageProcessingLibrary: ImageProcessingLibrary, private fileStorageLibrary: FileStorageLibrary) { }

    public async processAndSaveImage(inputPath: string, outputPath: string) {
        this.validateImageFormat(inputPath);
        const processedImageContent = await this.processImage(inputPath, outputPath);
        await this.saveImageIntoFile(outputPath, processedImageContent);
    }

    private async processImage(inputPath: string, outputPath: string) {
        try {
            return await this.imageProcessingLibrary.processImage(inputPath, outputPath);
        } catch (error) {
            if (error instanceof ProcessingErrorException) {
                console.error('An error occurred during image processing.');
                throw new ProcessingErrorException('Image processing error.');
            } else {
                console.error('An unknown error occurred during image processing.');
                throw error;
            }
        }
    }

    private async saveImageIntoFile(filePath: string, content: string) {
        try {
            await this.fileStorageLibrary.saveContentIntoFile(filePath, content);
        } catch (error) {
            if (error instanceof InvalidImageException) {
                console.error(`Error: ${error.message}`);
                throw error;
            } else {
                console.error('An unknown error occurred during file save.');
                throw error;
            }
        }
    }

    private validateImageFormat(inputPath: string): void {
        if (!inputPath.endsWith('.jpg')) {
            throw new InvalidImageException('Invalid image format. Only JPG images are supported.');
        }
    }
}