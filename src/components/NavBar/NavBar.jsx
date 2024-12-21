import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';

const NavBar = ({ handleSignout }) => {
    const { user } = useContext(AuthedUserContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">AirHub</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {!user ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/auth/signin">Sign In</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/auth/signup">Sign Up</Link>
                                </li>
                            </>
                        ) : (user.role === 'admin' ? (
                            <>
                                <li className="nav-item">
                                    <button className="btn btn-outline-danger" onClick={handleSignout}>Sign Out</button>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/bookings">Bookings</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile">Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/flights/new">Create Flight</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/flights">Show Flights</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <button className="btn btn-outline-danger" onClick={handleSignout}>Sign Out</button>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/bookings">Bookings</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile">Profile</Link>
                                </li>
                            </>
                        )
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;