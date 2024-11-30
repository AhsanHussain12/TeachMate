import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import LaptopIcon from '@mui/icons-material/Laptop';
import GroupsIcon from '@mui/icons-material/Groups';
import StatsCard from './subcomponents/StatsCard';

function StatsCardList() {
     return (
      <div className="grid grid-cols-3 gap-4">
        <StatsCard title="Home Tuitions" value="5" Icon={HomeIcon} />
        <StatsCard title="Online Classes" value="0" Icon={LaptopIcon} />
        <StatsCard title="Total Students" value="0" Icon={GroupsIcon} />
      </div>
    );
  };

export default StatsCardList
