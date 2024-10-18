import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

const IssueDetails: React.FC = () => {
    const { issueNumber } = useParams<{ issueNumber: string }>();
    const issue = useAppSelector(state =>
        state.issues.issues.find(issue => issue.number === parseInt(issueNumber))
    );

    if (!issue) return <p>No issue found</p>;

    return (
        <div>
            <h1>{issue.title}</h1>
            <p>{issue.body}</p>
            <div>Issue #{issue.number}</div>
            <div>State: {issue.state}</div>
            <div>Comments: {issue.comments}</div>
        </div>
    );
};

export default IssueDetails;