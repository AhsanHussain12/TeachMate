import React from 'react';

const GigCompletionRate = ({ completed, total }) => {
  const completionRate = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold">Gig Completion Rate</h3>
      <div className="mt-4 text-3xl font-bold">{completionRate.toFixed(2)}%</div>
      <div className="text-sm text-gray-500">Completed: {completed} / Total: {total}</div>
    </div>
  );
};

export default GigCompletionRate;
