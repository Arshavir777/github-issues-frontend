import React from 'react';
import { useGetStatisticsQuery } from '../services/statisticsApi';
import Loader from './Loader';
import '@/styles/Statistics.scss';
import { formatDateTime } from '../utils/formatDateTime';

const Statistics: React.FC = () => {
  const { data, error, isLoading } = useGetStatisticsQuery({});

  if (isLoading) return <Loader />;
  if (error) return <p className="error-message">Something went wrong</p>;

  return (
    <div className="statistics-container">
      <table className="statistics-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>IP Address</th>
            <th>Action</th>
            <th>Date Time</th>
          </tr>
        </thead>
        <tbody>
          {data?.statistics.map((statistic) => (
            <tr key={statistic.id}>
              <td>{statistic.id}</td>
              <td>{statistic.ip}</td>
              <td>{statistic.action}</td>
              <td>{formatDateTime(statistic.dateTime?.toString())}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
