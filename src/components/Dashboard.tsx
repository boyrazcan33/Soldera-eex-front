import React, { useState, useEffect } from 'react';
import { getAllAuctions, getLatestAuction, getStats } from '../services/api';
import { Auction, Stats } from '../types/Auction';
import '../styles/Dashboard.scss';

const Dashboard: React.FC = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [stats, setStats] = useState<Stats>({} as Stats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Load auctions and stats in parallel
        const [auctionsData, statsData] = await Promise.all([
          getAllAuctions(),
          getStats()
        ]);
        
        // Make sure auctionsData is an array
        setAuctions(Array.isArray(auctionsData) ? auctionsData : []);
        setStats(statsData || { totalAuctions: 0 });
      } catch (error) {
        console.error('Failed to load data:', error);
        setError('Failed to load auction data. Please try again.');
        setAuctions([]); // Set empty array on error
        setStats({ totalAuctions: 0 });
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const refreshData = async () => {
    try {
      setLoading(true);
      const [auctionsData, statsData] = await Promise.all([
        getAllAuctions(),
        getStats()
      ]);
      // Make sure auctionsData is an array
      setAuctions(Array.isArray(auctionsData) ? auctionsData : []);
      setStats(statsData || { totalAuctions: 0 });
      setError(null);
    } catch (error) {
      setError('Failed to refresh data');
      setAuctions([]); // Set empty array on error
      setStats({ totalAuctions: 0 });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading">Loading auction data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="error">
          {error}
          <button onClick={refreshData}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <h1>French Energy Certificate Auctions</h1>
        <p>Real-time data from EEX French Guarantees of Origin auctions</p>
        <button onClick={refreshData} className="refresh-btn">
          Refresh Data
        </button>
      </header>

      {/* Stats Cards */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Auctions</h3>
            <p className="stat-value">{stats.totalAuctions || 0}</p>
          </div>
          
          <div className="stat-card">
            <h3>Latest Auction</h3>
            <p className="stat-value">
              {stats.latestAuctionDate 
                ? new Date(stats.latestAuctionDate).toLocaleDateString() 
                : 'N/A'}
            </p>
          </div>
          
          <div className="stat-card">
            <h3>Regions Covered</h3>
            <p className="stat-value">{stats.regionsCount || 0}</p>
          </div>
          
          <div className="stat-card">
            <h3>Technologies</h3>
            <p className="stat-value">{stats.technologiesCount || 0}</p>
          </div>
        </div>
      </section>

      {/* Auction List */}
      <section className="auctions-section">
        <h2>Recent Auctions</h2>
        
        {auctions.length === 0 ? (
          <div className="no-data">
            <p>No auction data available</p>
            <button onClick={refreshData}>Load Data</button>
          </div>
        ) : (
          <div className="auctions-list">
            {auctions.map((auction) => (
              <div key={auction.id} className="auction-card">
                <div className="auction-header">
                  <h3>Auction {auction.id}</h3>
                  <span className="auction-date">
                    {new Date(auction.auctionDate).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="auction-details">
                  <p><strong>Production Month:</strong> {auction.productionMonth}</p>
                  <p><strong>Reserve Price:</strong> €{auction.reservePrice}/MWh</p>
                </div>

                {/* Regional Data */}
                {auction.regions && auction.regions.length > 0 && (
                  <div className="regions-section">
                    <h4>Regional Results ({auction.regions.length} regions)</h4>
                    <div className="data-table">
                      <table>
                        <thead>
                          <tr>
                            <th>Region</th>
                            <th>Volume (MWh)</th>
                            <th>Price (€/MWh)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {auction.regions.map((region) => (
                            <tr key={region.id}>
                              <td>{region.regionName}</td>
                              <td>{region.volumeAllocated.toLocaleString()}</td>
                              <td>€{region.weightedAvgPrice}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      
                    </div>
                  </div>
                )}

                {/* Technology Data */}
                {auction.technologies && auction.technologies.length > 0 && (
                  <div className="technologies-section">
                    <h4>Technology Breakdown ({auction.technologies.length} technologies)</h4>
                    <div className="data-table">
                      <table>
                        <thead>
                          <tr>
                            <th>Technology</th>
                            <th>Volume (MWh)</th>
                            <th>Price (€/MWh)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {auction.technologies.map((tech) => (
                            <tr key={tech.id}>
                              <td>{tech.technologyType}</td>
                              <td>{tech.volumeAllocated.toLocaleString()}</td>
                              <td>€{tech.weightedAvgPrice}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;