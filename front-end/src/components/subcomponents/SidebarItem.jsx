import React from 'react';

function SidebarItem({ Icon, label }) {
  return (
    <div className="flex items-center p-4 hover:bg-orange-100 cursor-pointer">
      {Icon && <Icon className="text-orange-600 mr-4" />}  {/* Render Icon component directly */}
      <span className="text-gray-700">{label}</span>
    </div>
  );
}

export default SidebarItem;
