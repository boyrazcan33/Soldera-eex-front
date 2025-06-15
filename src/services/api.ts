import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/auctions';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get all auctions
export const getAllAuctions = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching auctions:', error);
    throw error;
  }
};

// Function to get latest auction
export const getLatestAuction = async () => {
  try {
    const response = await api.get('/latest');
    return response.data;
  } catch (error) {
    console.error('Error fetching latest auction:', error);
    throw error;
  }
};

// Function to get stats
export const getStats = async () => {
  try {
    const response = await api.get('/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
};