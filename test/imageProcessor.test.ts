import { mock, mockReset } from "jest-mock-extended";
import { ImageProcessor } from "../src/imageProcessor";
import { ImageProcessingLibrary } from "../src/imageProcessingLibrary";
import { FileStorageLibrary } from "../src/fileStorageLibrary";
import { ProcessingErrorException } from "../src/exceptions/processingError";
import { InvalidImageException } from "../src/exceptions/invalidImageError";

const mockImageProcessingLibrary = mock<ImageProcessingLibrary>();
const mockFileStorageLibrary = mock<FileStorageLibrary>();

describe('ImageProcessor', () => {
    let imageProcessor: ImageProcessor;
    const imageProcessingResult = 'processed image content';
    const inputPath = 'Input.jpg';
    const outputPath = 'Output';

    beforeEach(() => {
        mockReset(mockImageProcessingLibrary);
        mockReset(mockFileStorageLibrary);
        imageProcessor = new ImageProcessor(mockImageProcessingLibrary, mockFileStorageLibrary);
    })

    describe('Happy path', () => {
        it('should process and save image', async () => {
            // Arrange
            mockImageProcessingLibrary.processImage.mockResolvedValue(imageProcessingResult);

            // Act
            await imageProcessor.processAndSaveImage(inputPath, outputPath);

            // Assert
            expect(mockImageProcessingLibrary.processImage).toHaveBeenCalledTimes(1);
            expect(mockFileStorageLibrary.saveContentIntoFile).toHaveBeenCalledTimes(1);
            expect(mockImageProcessingLibrary.processImage).toHaveBeenCalledWith(inputPath, outputPath);
            expect(mockFileStorageLibrary.saveContentIntoFile).toHaveBeenCalledWith(outputPath, imageProcessingResult);
        })
    })

    describe('Error path', () => {
        describe('processImage exceptions', () => {
            it.each`
            testName | error | expectedError
            ${'processing error exception'} | ${new ProcessingErrorException('processing error')} | ${new ProcessingErrorException('Image processing error.')}
            ${'unknown error'} | ${new Error('error')} | ${new Error('error')}
            `('should throw a(n) $testName', async ({ error, expectedError }) => {
                // Arrange
                mockImageProcessingLibrary.processImage.mockImplementation(() => { throw error });

                // Act and assert
                await expect(() => imageProcessor.processAndSaveImage(inputPath, outputPath)).rejects.toThrow(expectedError);
                expect(mockImageProcessingLibrary.processImage).toHaveBeenCalledTimes(1);
                expect(mockFileStorageLibrary.saveContentIntoFile).toHaveBeenCalledTimes(0);
                expect(mockImageProcessingLibrary.processImage).toHaveBeenCalledWith(inputPath, outputPath);
            });
        })

        describe('saveImageIntoFile exceptions', () => {
            it.each`
            testName | error
            ${'invalid image exception'} | ${new InvalidImageException('Invalid image error.')}
            ${'unknown error'} | ${new Error('error')}
            `('should throw a(n) $testName', async ({ error }) => {
                mockImageProcessingLibrary.processImage.mockResolvedValue(imageProcessingResult);
                mockFileStorageLibrary.saveContentIntoFile.mockImplementation(() => { throw error });

                // Act and assert
                await expect(() => imageProcessor.processAndSaveImage(inputPath, outputPath)).rejects.toThrow(error);
                expect(mockImageProcessingLibrary.processImage).toHaveBeenCalledTimes(1);
                expect(mockFileStorageLibrary.saveContentIntoFile).toHaveBeenCalledTimes(1);
                expect(mockImageProcessingLibrary.processImage).toHaveBeenCalledWith(inputPath, outputPath);
                expect(mockFileStorageLibrary.saveContentIntoFile).toHaveBeenCalledWith(outputPath, imageProcessingResult);
            });
        })

        describe('validateImageFormat exceptions', () => {
            it('should throw an error when validate image format', async () => {
                // Arrange
                const inputPath = 'Input';
                const error = new InvalidImageException('Invalid image format. Only JPG images are supported.');

                // Act and assert
                await expect(() => imageProcessor.processAndSaveImage(inputPath, outputPath)).rejects.toThrow(error);
                expect(mockImageProcessingLibrary.processImage).toHaveBeenCalledTimes(0);
                expect(mockFileStorageLibrary.saveContentIntoFile).toHaveBeenCalledTimes(0);
            })
        })
    })
})