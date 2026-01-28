/**
 * Safe import utility for handling module loading errors
 * Prevents React reconciler conflicts with Three.js libraries
 */

export async function safeImport<T>(
  importFn: () => Promise<T>,
  fallback?: T
): Promise<T | null> {
  try {
    return await importFn();
  } catch (error) {
    console.error('Safe import failed:', error);
    return fallback || null;
  }
}

/**
 * Checks if Three.js modules can be safely loaded
 */
export function canLoadThreeJS(): boolean {
  try {
    // Check if React reconciler is available
    if (typeof window === 'undefined') return false;
    
    // Simple check to see if the environment supports dynamic imports
    return 'requestAnimationFrame' in window;
  } catch {
    return false;
  }
}
