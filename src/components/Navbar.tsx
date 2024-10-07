import { Link } from "@tanstack/react-router";
import { useSession } from "../hooks/useSession";
const Navbar = () => {
  const { user, signOut } = useSession();

  return (
    <nav className="flex justify-between m-auto px-6">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
      <p>
        {user ? (
          <>
            {user.email} <button onClick={signOut}>Sign Out</button>
          </>
        ) : (
          <Link to="/signin">Sign in</Link>
        )}
      </p>
    </nav>
  );
};

export default Navbar;
