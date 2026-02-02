/**
 * Health Record Service
 * Handles data prefetching and offline caching for medical records.
 */

export interface HealthRecord {
  id: string;
  title: string;
  date: string;
  type: string;
  content?: string;
  securityLevel: "High" | "Maximum";
  isEncrypted: boolean;
}

const CACHE_NAME = 'hailan-health-records-v1';

export const HealthRecordService = {
  /**
   * Prefetch health records and store them in the Cache API for offline access.
   */
  async prefetchRecords(records: HealthRecord[]) {
    if (!('caches' in window)) return;

    try {
      const cache = await caches.open(CACHE_NAME);
      
      // Simulate fetching and caching detailed content for each record
      for (const record of records) {
        const url = `/api/health-records/${record.id}`;
        // In a real app, we would fetch(url). But here we mock the response
        const mockResponse = new Response(JSON.stringify({
          ...record,
          content: `Detailed clinical data for ${record.title}. This data is encrypted with ZK-Proof protocol.`,
          timestamp: Date.now()
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
        
        await cache.put(url, mockResponse);
      }
      
      console.log(`[HealthRecord] Prefetched ${records.length} records to offline cache.`);
    } catch (error) {
      console.error('[HealthRecord] Prefetch failed:', error);
    }
  },

  /**
   * Retrieve a record from cache if available, otherwise fetch from "network".
   */
  async getRecord(id: string): Promise<HealthRecord | null> {
    const url = `/api/health-records/${id}`;
    
    if ('caches' in window) {
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match(url);
      if (cachedResponse) {
        console.log(`[HealthRecord] Serving ${id} from offline cache.`);
        return await cachedResponse.json();
      }
    }
    
    // Mock network fallback
    return null;
  }
};
