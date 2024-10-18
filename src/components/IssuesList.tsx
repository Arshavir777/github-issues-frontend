import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchIssues } from "../services/issuesSlice.ts";

interface Props {
  owner: string;
  repo: string;
}

const IssuesList: React.FC<Props> = ({ owner, repo }) => {
  const dispatch = useAppDispatch();
  const { issues, loading, error } = useAppSelector(state => state.issues);

  React.useEffect(() => {
    dispatch(fetchIssues({ owner, repo }));
  }, [dispatch, owner, repo]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {issues.map(issue => (
        <li key={issue.id}>
          <a href={`/issues/${issue.number}`}>{issue.title}</a>
        </li>
      ))}
    </ul>
  );
};

export default IssuesList;