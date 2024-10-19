import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useGetIssuesQuery } from '../services/githubIssuesApi';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { IGithubIssue } from '../types/githubIssueTypes';
import '@/styles/IssuesList.scss'
import PerPageSelector from "./pagination/PerPageSelector.tsx";
import Loader from "./Loader.tsx";

const IssuesList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
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

  console.log(issues);
  
  return (
    <>
      <div className="search-bar">
        <input
            className="input-field"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        <span className="slash">/</span>
        <input
            className="input-field"
            type="text"
            placeholder="Repository"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          <svg viewBox="0 0 16 16" width="16" height="16" className="search-icon">
            <path fill-rule="evenodd"
                  d="M11.5 7a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0zm-.82 4.74a6 6 0 1 1 1.06-1.06l3.04 3.04a1 1 0 1 1-1.42 1.42L9.74 10.68a5.98 5.98 0 0 1-.82-.94z"/>
          </svg>
        </button>
      </div>
      {(isLoading || isFetching) && (<Loader />)}

      {error && (<div className="error-message">{(error as any).data?.message || 'Something went wrong'}</div>)}

      {!error && !isLoading && (
        <div className="issues-container">
          <PerPageSelector
            options={[10, 30, 50]}
            value={perPage}
            onChange={setPerPage}
          />
          <div>
            {issues.map(issue => (
              <Link key={issue.id} className="issues-description" to={`/issues/${username}/${repo}/${issue.number}`}>
                <div className="issue-title-container">
                  <img className="user-avatar" src={issue.user.avatar_url} alt="Issue reporter image"/>
                  <div> {issue.title}</div>
                </div>
                <span className="date-time">#{issue.number}, opened {issue.created_at}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default IssuesList;
