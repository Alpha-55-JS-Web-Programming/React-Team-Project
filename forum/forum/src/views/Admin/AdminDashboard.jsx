import { updateUserRole } from "../../services/users.service";
import { AppContext } from "../../Context/AppContext";
import { useContext, useEffect, useState } from "react";

export default function AdminDashboard() {
  const { user, userData, setContext } = useContext(AppContext);

  const handleChangeRole = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      alert("User role updated successfully.");
    } catch (error) {
      console.error("Failed to update user role:", error);
      alert("Failed to update user role.");
    }
  };
}
