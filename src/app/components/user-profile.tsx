"use client";

interface UserProfileProps {
  name: string;
  email: string;
}

function UserProfile({ name, email }: UserProfileProps) {
  return (
    <div>
      <h1>{name}</h1>
      <p>{email}</p>
    </div>
  );
}

export default UserProfile;
