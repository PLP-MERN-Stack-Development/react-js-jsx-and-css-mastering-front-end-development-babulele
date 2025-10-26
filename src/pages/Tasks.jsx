import React from 'react';
import TaskManager from '../components/TaskManager';
import Card from '../components/Card';

const Tasks = () => {
  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Manage Your Tasks
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Create, organize, and complete your tasks efficiently
        </p>
      </div>

      <Card>
        <TaskManager />
      </Card>
    </div>
  );
};

export default Tasks;
