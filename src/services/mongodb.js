// MongoDB Service - Uses backend API for MongoDB operations
// Falls back to localStorage if API is unavailable

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

class MongoDBService {
    constructor(connectionString) {
        this.connectionString = connectionString;
        this.useMongoDB = !!connectionString;
    }

    async fetchAPI(endpoint, options = {}) {
        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
            });
            
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error(`API call failed (${endpoint}):`, error);
            throw error;
        }
    }

    async saveJobs(jobs) {
        // Always save to localStorage as backup
        localStorage.setItem('kuroank_war_room_data_v9', JSON.stringify(jobs));
        
        // Try to sync to MongoDB if connection string is available
        if (this.useMongoDB) {
            try {
                await this.fetchAPI('/api/jobs', {
                    method: 'POST',
                    body: JSON.stringify(jobs),
                });
                console.log('✅ Jobs synced to MongoDB');
            } catch (error) {
                console.warn('⚠️ MongoDB sync failed, using localStorage only:', error);
                // Continue with localStorage only
            }
        }
    }

    async loadJobs() {
        // Try to load from MongoDB first if available
        if (this.useMongoDB) {
            try {
                const jobs = await this.fetchAPI('/api/jobs');
                if (jobs && jobs.length > 0) {
                    // Sync to localStorage as backup
                    localStorage.setItem('kuroank_war_room_data_v9', JSON.stringify(jobs));
                    console.log('✅ Jobs loaded from MongoDB');
                    return jobs;
                }
            } catch (error) {
                console.warn('⚠️ MongoDB load failed, using localStorage:', error);
            }
        }

        // Fallback to localStorage
        const saved = localStorage.getItem('kuroank_war_room_data_v9');
        if (saved) {
            try {
                const jobs = JSON.parse(saved);
                console.log('📦 Jobs loaded from localStorage');
                return jobs;
            } catch (error) {
                console.error('Failed to parse localStorage data:', error);
            }
        }

        return [];
    }

    async checkConnection() {
        if (!this.useMongoDB) {
            return { connected: false, reason: 'No MongoDB connection string' };
        }

        try {
            const health = await this.fetchAPI('/api/health');
            return { connected: health.mongodb === 'connected', health };
        } catch (error) {
            return { connected: false, reason: 'API unavailable', error: error.message };
        }
    }
}

// Create singleton instance
let mongoService = null;

export const getMongoService = (connectionString) => {
    if (!mongoService || mongoService.connectionString !== connectionString) {
        mongoService = new MongoDBService(connectionString);
    }
    return mongoService;
};

export default MongoDBService;
