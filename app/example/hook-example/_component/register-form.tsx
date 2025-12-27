"use client";

import useRegisterForm from "../hooks/use-register-form";

export default function RegisterForm() {
  const {
    firstname,
    lastname,
    email,
    username,
    password,
    confirmPassword,
    handleFirstName,
    handleLastName,
    handleEmail,
    handleUsername,
    handlePassword,
    handleConfirmPassword,
    handleSubmit,
  } = useRegisterForm();

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="First Name"
        value={firstname}
        onChange={handleFirstName}
      />

      <input
        type="text"
        placeholder="Last Name"
        value={lastname}
        onChange={handleLastName}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleEmail}
      />

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={handleUsername}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePassword}
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={handleConfirmPassword}
      />

      <button type="submit">Register</button>
    </form>
  );
}

