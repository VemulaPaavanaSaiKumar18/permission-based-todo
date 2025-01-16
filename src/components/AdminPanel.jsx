import React from 'react';

const AdminPanel = ({ features, onUpdateFeatures }) => {
  const handleFeatureChange = (userType, feature, value) => {
    onUpdateFeatures(userType, {
      ...features[userType],
      [feature]: typeof features[userType][feature] === 'boolean' ? value : Number(value)
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Admin Feature Management</h2>
      
      {['free', 'premium'].map(userType => (
        <div key={userType} className="mb-8">
          <h3 className="text-xl font-semibold mb-4 capitalize">{userType} User Features</h3>
          <div className="space-y-4">
            {Object.entries(features[userType]).map(([feature, value]) => (
              <div key={feature} className="flex items-center gap-4">
                <label className="w-40 capitalize">
                  {feature.replace(/([A-Z])/g, ' $1')}:
                </label>
                {typeof value === 'boolean' ? (
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => handleFeatureChange(userType, feature, e.target.checked)}
                    className="form-checkbox h-5 w-5 text-blue-500"
                  />
                ) : (
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => handleFeatureChange(userType, feature, e.target.value)}
                    className="form-input w-24 px-2 py-1 border rounded"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;