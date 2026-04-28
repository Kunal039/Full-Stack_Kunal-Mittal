import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <header className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="logo">
          Job<span>Hub</span>
        </NavLink>

        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/jobs">Jobs</NavLink>
          <NavLink to="/post-job">Post Job</NavLink>
          {isAuthenticated ? (
            <>
              <span className="nav-user">Hi, {user?.name?.split(" ")[0]}</span>
              <button type="button" className="nav-logout" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className="btn">
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
