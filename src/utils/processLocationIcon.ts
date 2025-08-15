import { loadImageFromUrl, removeBackground } from './backgroundRemoval';

export const processLocationIcon = async (): Promise<string> => {
  try {
    // Load the original image
    const img = await loadImageFromUrl('/lovable-uploads/b4f684d4-4f52-4ee4-bbf0-c161100391ca.png');
    
    // Remove background
    const processedBlob = await removeBackground(img);
    
    // Create URL for the processed image
    return URL.createObjectURL(processedBlob);
  } catch (error) {
    console.error('Failed to process location icon:', error);
    // Fallback to original image
    return '/lovable-uploads/b4f684d4-4f52-4ee4-bbf0-c161100391ca.png';
  }
};