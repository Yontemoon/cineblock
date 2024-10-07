import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import supabase from "../config/supabaseClient";

export const Route = createFileRoute("/signin")({
  component: SignIn,
});

function SignIn() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert(error.message);
    } else {
      alert("Signed in successfully!");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSignIn}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Loading" : "Sign In"}
      </button>
    </form>
  );
}

export default SignIn;
