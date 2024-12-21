import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';

const Homepage = () => {
    const { user } = useContext(AuthedUserContext);

    return (
        <div className="container text-center mt-5">
            <h1 className="display-3">Welcome to AirHub</h1>
            <p className="lead mb-4">Your ultimate destination for seamless travel booking and management.</p>

            <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Link to="/flights">
                    <button className="btn btn-primary btn-lg">Search Flights</button>
                </Link>

                {user ? (
                    <>
                        <Link to="/dashboard">
                            <button className="btn btn-secondary btn-lg">Dashboard</button>
                        </Link>
                        <Link to="/bookings">
                            <button className="btn btn-info btn-lg">My Bookings</button>
                        </Link>
                        <Link to="/profile">
                            <button className="btn btn-success btn-lg">Profile</button>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/auth/signup">
                            <button className="btn btn-outline-primary btn-lg">Sign Up</button>
                        </Link>
                        <Link to="/auth/signin">
                            <button className="btn btn-outline-success btn-lg">Sign In</button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Homepage;