import { useState, useEffect } from 'react';

// Hook to track component render performance
export const useRenderPerformance = (componentName: string) => {
  const [renderCount, setRenderCount] = useState(0);
  const [lastRenderTime, setLastRenderTime] = useState<number>(0);

  useEffect(() => {
    const startTime = performance.now();
    setRenderCount(prev => prev + 1);
    
    const endTime = performance.now();
    setLastRenderTime(endTime - startTime);
    
    if (__DEV__) {
      console.log(`${componentName} render #${renderCount + 1} took ${(endTime - startTime).toFixed(2)}ms`);
    }
  });

  return { renderCount, lastRenderTime };
};

// Memory usage tracking (for development)
export const useMemoryTracking = () => {
  const [memoryUsage, setMemoryUsage] = useState<any>(null);

  useEffect(() => {
    if (__DEV__ && (performance as any).memory) {
      const updateMemory = () => {
        const memory = (performance as any).memory;
        setMemoryUsage({
          used: Math.round(memory.usedJSHeapSize / 1048576), // MB
          total: Math.round(memory.totalJSHeapSize / 1048576), // MB
          limit: Math.round(memory.jsHeapSizeLimit / 1048576), // MB
        });
      };

      updateMemory();
      const interval = setInterval(updateMemory, 5000); // Update every 5 seconds

      return () => clearInterval(interval);
    }
  }, []);

  return memoryUsage;
};

// Network request performance tracking
export const trackNetworkRequest = async (
  requestName: string,
  requestFunction: () => Promise<any>
) => {
  const startTime = performance.now();
  
  try {
    const result = await requestFunction();
    const endTime = performance.now();
    
    if (__DEV__) {
      console.log(`Network request "${requestName}" took ${(endTime - startTime).toFixed(2)}ms`);
    }
    
    return result;
  } catch (error) {
    const endTime = performance.now();
    
    if (__DEV__) {
      console.error(`Network request "${requestName}" failed after ${(endTime - startTime).toFixed(2)}ms:`, error);
    }
    
    throw error;
  }
};