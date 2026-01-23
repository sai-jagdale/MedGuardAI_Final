import { useState } from "react";
import { login } from "../services/authService";

export default function AuthPage() {
  const [form, setForm] = useState({ username: "", password: "" });

  const submit = async () => {
    const res = await login(form);
    console.log(res.data); // access & refresh token
  };

  return (
    <div>
      <input placeholder="username" onChange={e=>setForm({...form,username:e.target.value})}/>
      <input type="password" placeholder="password" onChange={e=>setForm({...form,password:e.target.value})}/>
      <button onClick={submit}>Login</button>
    </div>
  );
}
