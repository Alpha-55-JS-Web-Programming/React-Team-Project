import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import Button from "../../components/Button/Button";
import { db } from "../../config/firebase-config";
import { get, query, ref, orderByChild, equalTo } from "firebase/database";
// import admin from 'firebase-admin';


export default function Admin() {
  const { user, userData } = useContext(AppContext);
  const isAdmin = userData?.role === "admin";
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllUsers().then(users => setUsers(users));
  }, []);

  // const ChangeRole = async (user_id_to_make_admin) => {
  //   // const adminDatabase = admin.database();
  //   const userId = user_id_to_make_admin;
  //   const userRef = db.ref('users').child(userId);

  //   try {
  //     await userRef.update({ role: 'admin' });
  //     console.log('User role updated successfully.');
  //   } catch (error) {
  //     console.error('Error updating user role:', error);
  //   }
  // }

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
          <span>User: {userRecord.handle}</span>
          <span>UserId: {userRecord.uid}</span>
          <span>Role: {userRecord.role}</span>
          <Button onClick={() => ChangeRole(userRecord.uid)}>Make Admin</Button>
        </div>
      ));
    } catch (error) {
      console.error('Error listing users:', error);
      return null;
    }
  }

  return (
    <div>
      {isAdmin ? <b>Welcome, admin {userData.FullName}</b> : <b>You don't have permission to access this page.</b>}
      <Button onClick={listAllUsers}>List Users</Button>
      {users.length > 0 && users.map(user => (
        <div key={user.id}>
          <span>User: {user.handle}</span>
          <span>UserId: {user.uid}</span>
          <span>Role: {user.role}</span>
        </div>
      ))}
    </div>
  )
}
