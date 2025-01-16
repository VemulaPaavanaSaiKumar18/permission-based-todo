import React, { useState } from 'react';
import TodoList from './components/TodoList';
import AdminPanel from './components/AdminPanel';
import RoleSelector from './components/RoleSelector';
import './index.css';

const App = () => {
  const [userRole, setUserRole] = useState('free');
  const [features, setFeatures] = useState({
    free: {
      maxTodos: 3,
      canEdit: false,
      canDelete: false,
      canAddDueDate: false,
      canAddPriority: false,
      canAddTags: false
    },
    premium: {
      maxTodos: 1000,
      canEdit: true,
      canDelete: true,
      canAddDueDate: true,
      canAddPriority: true,
      canAddTags: true
    }
  });

  const updateFeatures = (role, newFeatures) => {
    setFeatures(prev => ({
      ...prev,
      [role]: newFeatures
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <RoleSelector currentRole={userRole} onRoleChange={setUserRole} />
      
      {userRole === 'admin' ? (
        <AdminPanel 
          features={features} 
          onUpdateFeatures={updateFeatures} 
        />
      ) : (
        <TodoList 
          userRole={userRole}
          features={features[userRole]}
        />
      )}
    </div>
  );
};

export default App;