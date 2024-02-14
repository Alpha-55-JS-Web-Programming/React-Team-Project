import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import Button from "../../components/Button/Button";
import { db } from "../../config/firebase-config";
import { get, query, ref, orderByChild, equalTo } from "firebase/database";
import { update } from "firebase/database";

export default function Admin() {
  const { user, userData } = useContext(AppContext);
  const isAdmin = userData?.role === "admin";
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    getAllUsers().then(users => setUsers(users));
  }, []);

  const getAllUsers = async () => {
    const snapshot = await get(query(ref(db, 'users')));
    if (!snapshot.exists()) {
      return [];
    }

    const users = Object.keys(snapshot.val()).map(key => ({
      id: key,
      ...snapshot.val()[key],
    }))

    console.log(users);
    return users;
  };

  const listAllUsers = async () => {
    try {
      const listUsers = await getAllUsers();
      return listUsers.map(userRecord => (
        <div key={userRecord.id}>

        </div>
      ));
    } catch (error) {
      console.error('Error listing users:', error);
      return null;
    }
  }

  const changeIsBlocked = async (userId) => {
    const userRef = ref(db, `users/${userId}`);

    try {
      const userSnapshot = await get(userRef);
      const userData = userSnapshot.val();

      await update(userRef, {
        isBlocked: !userData.isBlocked,
      });

      console.log('User isBlocked updated successfully.');
    } catch (error) {
      console.error('Error updating user isBlocked:', error);
    }
  };

  const changeRole = async (userId, newRole) => {
    const userRef = ref(db, `users/${userId}`);

    try {
      await update(userRef, {
        role: newRole,
      });

      console.log('User role updated successfully.');
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    // Implement the logic to handle role change
    await changeRole(userId, newRole);

    // Fetch the updated user list after the role change
    const updatedUsers = await getAllUsers();
    setUsers(updatedUsers);
  };

  return (
    <div>
      {isAdmin ? <h1>Welcome, admin {userData.FullName}</h1> : <h3>You don't have permission to access this page.</h3>}
      <Button onClick={listAllUsers}>List Users</Button>
      {users.length > 0 && users.map(user => (
        <div key={user.id}>
          <span>User: {user.handle}</span>
          <span>UserId: {user.uid}</span>
          <span>Role: {user.role}</span>

          <Button onClick={() => changeIsBlocked(userRecord.uid)}>Make Admin</Button>
                    <label htmlFor={`user-role-${user.id}`}>Change role:</label>
            <select
              id={`user-role-${user.id}`}
              value={user.role}
              onChange={(e) => handleRoleChange(user.id, e.target.value)}
            >
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
            <Button onClick={() => changeIsBlocked(user.id)}>{user.isBlocked ? "Unblock" : "Block"}</Button>
        </div>
      ))}
    </div>
  )
}
