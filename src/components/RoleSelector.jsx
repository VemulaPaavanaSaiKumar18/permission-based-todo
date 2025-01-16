import React from 'react';

const RoleSelector = ({ currentRole, onRoleChange }) => {
  return (
    <div className="mb-8 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Select Your Role</h2>
      <div className="flex gap-4">
        {['free', 'premium', 'admin'].map(role => (
          <button
            key={role}
            onClick={() => onRoleChange(role)}
            className={`px-4 py-2 rounded capitalize
              ${currentRole === role 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {role}
          </button>
        ))}
      </div>
      <div className="mt-2 text-sm text-gray-600">
        Current role: <span className="font-semibold capitalize">{currentRole}</span>
      </div>
    </div>
  );
};

export default RoleSelector;