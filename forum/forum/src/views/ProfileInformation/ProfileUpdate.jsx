// This is a hypothetical example

import React, { useState, useContext } from 'react';
import { updateUserEmail } from '../../services/auth.service';
import { updateUserData } from '../../services/users.service'; // Assuming this function exists for updating other user info in your database
import { AppContext } from '../../Context/AppContext';

const ProfileUpdate = () => {
  const { user, userData } = useContext(AppContext);
  const [newEmail, setNewEmail] = useState('');

  const handleEmailChange = async (e) => {
    e.preventDefault();
    try {
      await updateUserEmail(newEmail);
      await updateUserData(user.uid, { email: newEmail }); // Update email in your Realtime Database if needed
      // Provide feedback to the user about the email update success
    } catch (error) {
      // Handle errors (e.g., show error message to the user)
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleEmailChange}>
      <input
        type="email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        required
      />
      <button type="submit">Update Email</button>
    </form>
  );
};

export default ProfileUpdate;
