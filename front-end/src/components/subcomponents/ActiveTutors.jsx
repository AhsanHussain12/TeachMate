import React from 'react';

const ActiveTutors = ({ activeTutors, totalTutors }) => {
  const activePercentage = totalTutors > 0 ? (activeTutors / totalTutors) * 100 : 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold">Active Tutors</h3>
      <div className="mt-4 text-3xl font-bold">{activeTutors} / {totalTutors}</div>
      <div className="text-sm text-gray-500">Active tutors: {activePercentage.toFixed(2)}%</div>
    </div>
  );
};

export default ActiveTutors;
