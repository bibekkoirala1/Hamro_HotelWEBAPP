import { useState, ChangeEvent } from "react";

export default function Page() {
  const [name, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  return (
    <div className="mx-auto my-2 p-3 border rounded w-64">
      <div className="m-2">
        <label>Username</label>
        <input
          className="p-2 border rounded w-full"
          onChange={handleUsername}
          value={name}
        />
      </div>

      <button
        onClick={() => alert(name)}
        className="p-2 bg-red-400 text-white rounded"
      >
        Test
      </button>
    </div>
  );
}
