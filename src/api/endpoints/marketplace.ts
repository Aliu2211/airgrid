import {apiClient} from '../client';

/**
 * Marketplace API endpoints (Phase 4)
 */
export const marketplaceAPI = {
  getListings: async (category?: string) => {
    const response = await apiClient.get('/marketplace/listings', {
      params: {category},
    });
    return response.data;
  },

  getListingById: async (listingId: string) => {
    const response = await apiClient.get(`/marketplace/listings/${listingId}`);
    return response.data;
  },

  createListing: async (listing: any) => {
    const response = await apiClient.post('/marketplace/listings', listing);
    return response.data;
  },

  hirePilot: async (pilotId: string, jobDetails: any) => {
    const response = await apiClient.post('/marketplace/hire-pilot', {
      pilotId,
      jobDetails,
    });
    return response.data;
  },
};
