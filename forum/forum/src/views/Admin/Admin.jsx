import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import Button from "../../components/Button/Button";
import { db } from "../../config/firebase-config";
import { get, query, ref } from "firebase/database";
import { update } from "firebase/database";
import "./Admin.css";

export default function Admin() {
  const { user, userData } = useContext(AppContext);
  const isAdmin = userData?.role === "admin";
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    mobile: "",
  });

  useEffect(() => {
    getAllUsers().then((users) => setUsers(users));
  }, []);

  const getAllUsers = async () => {
    const snapshot = await get(query(ref(db, "users")));
    if (!snapshot.exists()) {
      return [];
    }

    const users = Object.keys(snapshot.val()).map((key) => ({
      id: key,
      ...snapshot.val()[key],
    }));

    return users;
  };

  const changeIsBlocked = async (userId) => {
    const userRef = ref(db, `users/${userId}`);

    try {
      const userSnapshot = await get(userRef);
      const userData = userSnapshot.val();

      await update(userRef, {
        isBlocked: !userData.isBlocked,
      });

      console.log("User isBlocked updated successfully.");
    } catch (error) {
      console.error("Error updating user isBlocked:", error);
    }
  };

  const changeRole = async (userId, newRole) => {
    const userRef = ref(db, `users/${userId}`);

    try {
      await update(userRef, {
        role: newRole,
      });

      console.log("User role updated successfully.");
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    await changeRole(userId, newRole);

    const updatedUsers = await getAllUsers();
    setUsers(updatedUsers);
  };

  const handleSearchChange = async (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    if (value.trim() === "") {
      const updatedUsers = await getAllUsers();
      setUsers(updatedUsers);
    } else {
      const snapshot = await get(query(ref(db, "users")));
      if (snapshot.exists()) {
        const users = Object.keys(snapshot.val()).map((key) => ({
          id: key,
          ...snapshot.val()[key],
        }));

        const filteredUsers = users.filter((user) =>
          user.handle.toLowerCase().includes(value) ||
          user.email.toLowerCase().includes(value) ||
          (user.displayName && user.displayName.toLowerCase().includes(value))
        );
        setUsers(filteredUsers);
      }
    }
  };

  return (
    <div className="adminAll">
      {isAdmin ? (
        <>
          <div className="adminHeader">Welcome, admin {userData.FullName}</div>

          <div className="adminMain">
            <label htmlFor="search" className="admin-search">Search </label>
            <input value={search} placeholder="Search" onChange={handleSearchChange} type="text" name="search" id="search" className="admin-search-bar" />

            {users.length > 0 &&
              users.map((user) => (
                <div className="adminUser" key={user.id}>
                  <div className="adminUsers">
                    <span>User: {user.handle}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>Email: {user.email}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                  </div>
                  <div className="adminOptions">
                    <label htmlFor={`user-role-${user.id}`} className="change-role">Change role:</label>
                    <select id={`user-role-${user.id}`} value={user.role} onChange={(e) => handleRoleChange(user.id, e.target.value)} className="admin-select">
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Button onClick={() => changeIsBlocked(user.id)}>
                      {user.isBlocked ? "Unblock" : "Block"}{" "}
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </>
      ) : (
        <h3>You don't have permission to access this page.</h3>
      )}
    </div>
  );
}