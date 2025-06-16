import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://french-auction-scraper-640616451900.europe-north1.run.app/api/auctions';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllAuctions = async () => {
  try {
    const response = await api.get('');
    return response.data;
  } catch (error) {
    console.error('Error fetching auctions:', error);
    throw error;
  }
};

export const getLatestAuction = async () => {
  try {
    const response = await api.get('/latest');
    return response.data;
  } catch (error) {
    console.error('Error fetching latest auction:', error);
    throw error;
  }
};

export const getStats = async () => {
  try {
    const response = await api.get('/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
};