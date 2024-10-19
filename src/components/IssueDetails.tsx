import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetIssueQuery } from '../services/githubIssuesApi';

const IssueDetails: React.FC = () => {

    const { repo, username, issueNumber } = useParams<{
        issueNumber: string,
        repo: string,
        username: string
    }>();

    // TODO: check
    const { data: issue, isLoading } = useGetIssueQuery({
        username: username!,
        repo: repo!,
        issueNumber: +issueNumber!
    });

    if (isLoading) return <p>...Loading</p>;
    if (!issue) return <p>No issue found</p>;

    return (
        <div>
            <h1>{issue?.title}</h1>
            <div>Issue #{issue.number}</div>
            <div>State: {issue.state}</div>
            <div>Comments: {issue.comments}</div>
        </div>
    );
};

export default IssueDetails;
