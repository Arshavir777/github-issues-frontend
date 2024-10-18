import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IssuesList from './components/IssuesList';
import IssueDetails from './components/IssueDetails';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<IssuesList owner="facebook" repo="react" />} />
                <Route path="/issues/:issueNumber" element={<IssueDetails />} />
            </Routes>
        </Router>
    );
};

export default App;