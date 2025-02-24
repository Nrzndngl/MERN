import { useState } from "react";
export default function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <form>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
          value={name}
        />
        <br />
        <br />
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          value={email}
        />
        <br />
        <br />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          value={password}
        />
        <br />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
}
