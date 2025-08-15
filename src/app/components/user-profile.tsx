"use client";

interface UserProfileProps {
  name: string;
  email: string;
}

function UserProfile({ name, email }: UserProfileProps) {
  return (
    <div>
      <h2 className="text-2xl">USER</h2>
      <p>name: {name}</p>
      <p>email: {email}</p>
    </div>
  );
}

export default UserProfile;
