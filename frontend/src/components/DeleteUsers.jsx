import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import UserManagement from './UserMnagement';
import { listUsers, deleteUser } from '../services/UserService';

const DeleteUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    
    const fetchUsers = async () => {
      try {
        const userData = await listUsers();
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

 
  const handleSelectUser = (event) => {
    setSelectedUser(event.target.value);
  };

 
  const handleDeleteUser = async () => {
    if (!selectedUser) {
      setError('Please select a user to delete');
      return;
    }

    try {
      
      await deleteUser(selectedUser);
      
      setUsers(users.filter(user => user.id !== selectedUser));
      setSelectedUser('');
      setError('');
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user. Please try again later.');
    }
  };

  return (
    <div>
      <UserManagement />
      <div className="deleteUsersContainer">
        <h2>Delete Users</h2>
        <div>
          <select value={selectedUser} onChange={handleSelectUser}>
            <option value="">Select user to delete</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name} ({user.email})</option>
            ))}
          </select>
          <Button variant="danger" onClick={handleDeleteUser} disabled={!selectedUser}>
            Delete
          </Button>
          {error && <div className="error">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default DeleteUsers;
