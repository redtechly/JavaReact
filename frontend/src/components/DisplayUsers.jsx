import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import UserManagement from './UserMnagement';
import { listUsers } from '../services/UserService'; 

const DisplayUsers = () => {
    const [users, setUsers] = useState([]);

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

    return (
        <div>
            <UserManagement />
            <div className="usersPageContainer">
                <h2>Users</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default DisplayUsers;
