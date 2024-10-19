import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useLazyGetIssuesQuery } from '../services/githubIssuesApi';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { IGithubIssue } from '../types/githubIssueTypes';
import '@/styles/IssuesList.scss';
import PerPageSelector from "./pagination/PerPageSelector.tsx";
import Loader from "./Loader.tsx";
import { formatDateTime } from '../utils/formatDateTime.ts';

const IssuesList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [issues, setIssues] = useState<IGithubIssue[]>([]);
  const [username, setUsername] = useState('facebook');
  const [repo, setRepo] = useState('react');
  const [validationError, setValidationError] = useState<string | null>(null);

  const [trigger, { data, error, isLoading, isFetching }] = useLazyGetIssuesQuery();

  useEffect(() => {
    if (data) {
      setIssues((prevIssues) => [...prevIssues, ...data.issues]);
    }
  }, [data]);

  const loadIssues = () => {
    if (!isFetching) {
      trigger({
        username,
        repo,
        page,
        perPage
      });
    }
  }

  const handleSearch = () => {
    if (!username.trim()) {
      setValidationError("Username is required.");
      return;
    } else if (!repo.trim()) {
      setValidationError("Repository name is required.");
      return;
    } 

    setIssues([]);
    setValidationError(null);
    loadIssues();
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
    loadIssues();
  };

  const handlePerPageChange = (newPerPageValue: number) => {
    setPerPage(newPerPageValue);
    loadIssues();
  }

  useInfiniteScroll({
    isFetching,
    hasNextPage: data?.pagination.hasNextPage || false,
    loadMore,
  });

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
        <button className="search-button" onClick={handleSearch} disabled={isLoading}>
          <svg viewBox="0 0 16 16" width="16" height="16" className="search-icon">
            <path
              fillRule="evenodd"
              d="M11.5 7a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0zm-.82 4.74a6 6 0 1 1 1.06-1.06l3.04 3.04a1 1 0 1 1-1.42 1.42L9.74 10.68a5.98 5.98 0 0 1-.82-.94z"
            />
          </svg>
        </button>
        <Link style={{marginLeft: '10px'}} to={'/statistics'}>Statistics</Link>
      </div>

      {(isFetching) && <Loader />}

      {(error || validationError) && (
        <div className="error-message">{(error as any)?.data?.message || validationError || 'Something went wrong'}</div>
      )}

      {!!issues.length && (
        <div className="issues-container">
          <PerPageSelector
            options={[10, 30, 50]}
            value={perPage}
            onChange={handlePerPageChange}
          />
          <div>
            {issues.map((issue, index) => (
              <Link key={`${index}_${issue.id}`} className="issues-description" to={`/issues/${username}/${repo}/${issue.number}`}>
                <div className="issue-title-container">
                  <img className="user-avatar" src={issue.user.avatar_url} alt="Issue reporter"/>
                  <div>{issue.title}</div>
                </div>
                <span className="date-time">#{issue.number}, opened {formatDateTime(issue.created_at)}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default IssuesList;
