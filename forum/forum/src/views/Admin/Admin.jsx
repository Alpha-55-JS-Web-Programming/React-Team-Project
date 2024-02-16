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

  const listAllUsers = async () => {
    try {
      const listUsers = await getAllUsers();
      return listUsers.map((userRecord) => <div key={userRecord.id}></div>);
    } catch (error) {
      console.error("Error listing users:", error);
      return null;
    }
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
    const value = e.target.value;
    setSearch(value);
  
    if (value.trim() === "") {
      // If the search input is empty, fetch all users from the database
      const updatedUsers = await getAllUsers();
      setUsers(updatedUsers);
    } else {
      // Filter users based on the search input
      const filteredUsers = users.filter((user) =>
        user.handle.toLowerCase().includes(value.toLowerCase())
      );
      setUsers(filteredUsers);
    }
  };

  return (
    <div>
      {isAdmin ? (
        <>
          <h1>Welcome, admin {userData.FullName}</h1>

          {/* <label htmlFor="mobile">Mobile: </label>
          <input value={form.mobile} onChange={updateForm("mobile")} type="text" name="mobile" id="mobile" /><br/>
          <br/>  */}
          <label htmlFor="search">Search </label>
          <input value={search} onChange={handleSearchChange} type="text" name="search" id="search" className="input-css"/>

          {users.length > 0 &&
            users.map((user) => (
              <div key={user.id}>
                <span>User: {user.handle}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>UserId: {user.uid}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>Role: {user.role}</span>&nbsp;&nbsp;&nbsp;&nbsp;

                <label htmlFor={`user-role-${user.id}`}>Change role:</label>
                <select
                  id={`user-role-${user.id}`}
                  value={user.role}
                  onChange={(e) =>
                    handleRoleChange(user.id, e.target.value)
                  }
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>&nbsp;&nbsp;&nbsp;&nbsp;
                <Button onClick={() => changeIsBlocked(user.id)}>
                  {user.isBlocked ? "Unblock" : "Block"}{" "}
                </Button>
              </div>
            ))}
        </>
      ) : (
        <h3>You don't have permission to access this page.</h3>
      )}
    </div>
  );
}
