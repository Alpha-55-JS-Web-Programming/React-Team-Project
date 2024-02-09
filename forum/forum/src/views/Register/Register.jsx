import React, { useState } from "react";

export function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
 
  return (
    <div>
      <h1>Register</h1>
      <label htmlFor="username">Username: </label> <input type="text" name="user-name" id="user-name" /> <br />
      <label htmlFor="email">Email: </label> <input type="email" name="email" id="email" /> <br />
      <label htmlFor="password">Password: </label> <input type="password" name="password" id="password" /> <br /> 
      <button>Register</button>
    </div>
  );
}
