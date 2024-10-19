import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useGetIssuesQuery } from '../services/githubIssuesApi';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { IGithubIssue } from '../types/githubIssueTypes';

const IssuesList: React.FC = () => {
  const [page, setPage] = useState(1);
  const perPage = 1;
  const [issues, setIssues] = useState<IGithubIssue[]>([]);

  const [username, setUsername] = useState('facebook');
  const [repo, setRepo] = useState('react');
  const [triggerQuery, setTriggerQuery] = useState(false);

  const { data, error, isLoading, isFetching } = useGetIssuesQuery({
    username,
    repo,
    page,
    perPage
  }, {
    skip: !triggerQuery,
  });

  useEffect(() => {
    if (data) {
      setIssues((prevIssues) => [...prevIssues, ...data.issues]);
    }
  }, [data]);

  const handleSearch = () => {


    setTriggerQuery(true);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useInfiniteScroll({
    isFetching,
    hasNextPage: data?.pagination.hasNextPage || false,
    loadMore,
  });

  console.log(error);
  
  return (
    <>
    <div>
      <input 
        type="text" 
        placeholder="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Repository" 
        value={repo} 
        onChange={(e) => setRepo(e.target.value)} 
      />
      <button onClick={handleSearch}>Search</button>
    </div>

    {isLoading && (<div>Loading</div>) }
    {error && (<div>{JSON.stringify(error)}</div>) }
    
    {!error && !isLoading && (
      <ul>
        {issues.map(issue => (
          <li key={issue.id}>
            <Link to={`/issues/${username}/${repo}/${issue.number}`}>{issue.title}</Link>
          </li>
        ))}
    </ul>)
    }
      {isFetching && <p>Loading more...</p>}
    </>
  );
};

export default IssuesList;
