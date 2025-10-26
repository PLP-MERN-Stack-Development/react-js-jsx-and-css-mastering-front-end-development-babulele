import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Button from './components/Button';
import Card from './components/Card';
import Tasks from './pages/Tasks';
import APIData from './pages/APIData';
import { ThemeProvider } from './context/ThemeContext';

function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="text-center mb-8 animate-slide-down">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to Task Manager
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Manage your tasks efficiently with our modern React application
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Button Examples */}
        <Card hover>
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Button Variants
          </h3>
          <div className="space-y-3">
            <Button variant="primary" className="w-full">
              Primary Button
            </Button>
            <Button variant="secondary" className="w-full">
              Secondary Button
            </Button>
            <Button variant="danger" className="w-full">
              Danger Button
            </Button>
            <Button variant="success" className="w-full">
              Success Button
            </Button>
          </div>
        </Card>

        {/* Counter Example */}
        <Card hover>
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Interactive Counter
          </h3>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {count}
            </span>
            <div className="flex gap-2">
              <Button
                variant="danger"
                onClick={() => setCount(count - 1)}
                disabled={count === 0}
              >
                Decrease
              </Button>
              <Button
                variant="success"
                onClick={() => setCount(count + 1)}
              >
                Increase
              </Button>
            </div>
          </div>
        </Card>

        {/* Button Sizes */}
        <Card hover>
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Button Sizes
          </h3>
          <div className="space-y-3">
            <Button variant="primary" size="sm" className="w-full">
              Small
            </Button>
            <Button variant="primary" size="md" className="w-full">
              Medium
            </Button>
            <Button variant="primary" size="lg" className="w-full">
              Large
            </Button>
          </div>
        </Card>
      </div>

      {/* Instructions */}
      <Card>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Get Started
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Navigate to different sections to see the TaskManager component and API integration features.
        </p>
      </Card>
    </div>
  );
}

function App() {
  const navbarLinks = [
    { path: '/', label: 'Home' },
    { path: '/tasks', label: 'Tasks' },
    { path: '/api', label: 'API Data' },
  ];

  const footerLinks = [
    { path: '/', label: 'Home' },
    { path: '/tasks', label: 'Tasks' },
    { path: '/api', label: 'API Data' },
  ];

  return (
    <ThemeProvider>
      <Router>
        <Layout navbarLinks={navbarLinks} footerLinks={footerLinks}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/api" element={<APIData />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App; 