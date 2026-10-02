import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import Tasks from './components/Tasks';
import Team from './components/Team';
import Analytics from './components/Analytics';
import Calendar from './components/Calendar';
import Profile from './components/Profile';
import Chat from './components/Chat';
import Reports from './components/Reports';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes with Layout */}
        <Route path="/dashboard" element={
          <Layout>
            <Dashboard />
          </Layout>
        } />
        
        <Route path="/tasks" element={
          <Layout>
            <Tasks />
          </Layout>
        } />

        <Route path="/team" element={
          <Layout>
            <Team />
          </Layout>
        } />

        <Route path="/analytics" element={
          <Layout>
            <Analytics />
          </Layout>
        } />

        <Route path="/calendar" element={
          <Layout>
            <Calendar />
          </Layout>
        } />

        <Route path="/profile" element={
          <Layout>
            <Profile />
          </Layout>
        } />

        <Route path="/chat" element={
          <Layout>
            <Chat />
          </Layout>
        } />

        <Route path="/reports" element={
          <Layout>
            <Reports />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
