import React from 'react';
import { useGetStatisticsQuery } from '../services/statisticsApi';

const Statistics: React.FC = () => {
  const { data, error, isLoading } = useGetStatisticsQuery({});

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {'' + error}</p>;

  return (
    <>
      <table>
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
              <td>{statistic.dateTime?.toString() || '-'}</td> {/* Assuming there is a `dateTime` field */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Statistics;
