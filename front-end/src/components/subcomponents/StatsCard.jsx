import React from 'react'


const StatsCard = ({ title, value, Icon }) => {
  return (
    <div className="flex items-center p-4 border rounded-lg shadow-sm">
      <Icon className="text-blue-500 mr-4" />
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-xl">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
