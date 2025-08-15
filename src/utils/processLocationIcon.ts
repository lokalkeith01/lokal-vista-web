import { loadImageFromUrl, removeBackground } from './backgroundRemoval';

export const processLocationIcon = async (): Promise<string> => {
  try {
    // Load the original image
    const img = await loadImageFromUrl('/lovable-uploads/07447040-2666-4d80-a6ab-c05e325dc616.png');
    
    // Remove background
    const processedBlob = await removeBackground(img);
    
    // Create URL for the processed image
    return URL.createObjectURL(processedBlob);
  } catch (error) {
    console.error('Failed to process location icon:', error);
    // Fallback to original image
    return '/lovable-uploads/07447040-2666-4d80-a6ab-c05e325dc616.png';
  }
};