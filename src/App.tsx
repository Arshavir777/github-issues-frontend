import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IssuesList from './components/IssuesList';
import IssueDetails from './components/IssueDetails';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Statistics from './components/Statistics';

const App: React.FC = () => {
    return (
        <Provider store={store}>
        <Router>
            <Routes>
                <Route path="/" element={<IssuesList />} />
                <Route path="/issues/:username/:repo/:issueNumber" element={<IssueDetails />} />
                <Route path="/statistics" element={<Statistics />} />
            </Routes>
        </Router>
        </Provider>
    );
};

export default App;
