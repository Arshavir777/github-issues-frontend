import React from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import { useGetIssueQuery } from '../services/githubIssuesApi';
import "@/styles/Issue.scss"
import Loader from './Loader';

const IssueDetails: React.FC = () => {

    const { repo, username, issueNumber } = useParams<{
        issueNumber: string,
        repo: string,
        username: string
    }>();

    const navigate = useNavigate();

    const { data: issue, isLoading } = useGetIssueQuery({
        username: username!,
        repo: repo!,
        issueNumber: +issueNumber!
    });

    if (isLoading) return <div><Loader /></div>;
    if (!issue) return <p>No issue found</p>;

    return (
        <div className="issue-content">
            <h1 className="title">{issue?.title}</h1>
            <div className="description">Issue {issue.body}</div>
            <button className="go-back-button" onClick={() => navigate(-1)}>
                Go Back
            </button>
        </div>
    );
};

export default IssueDetails;
