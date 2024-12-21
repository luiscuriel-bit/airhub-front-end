const BASE_URL = `${import.meta.env.VITE_BACKEND_SERVER_URL}/auth`;

const signup = async (formData) => {
    try {
        const res = await fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const json = await res.json();

        if (!res.ok) {
            throw new Error(json.message);
        }

        if (json.token) {
            localStorage.setItem('token', json.token);
            const user = JSON.parse(atob(json.token.split('.')[1]));
            return user;
        }
    } catch (error) {
        console.error('Error during signup:', error);
        throw error;
    }
};

const signin = async (formData) => {
    try {
        const res = await fetch(`${BASE_URL}/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const json = await res.json();

        if (!res.ok) {
            throw new Error(json.message);
        }

        if (json.token) {
            localStorage.setItem('token', json.token);
            const user = JSON.parse(atob(json.token.split('.')[1]));
            return user;
        }
    } catch (error) {
        console.error('Error during signin:', error);
        throw error; // This will throw the error to the component
    }
};

const signout = () => {
    localStorage.removeItem('token');
};

const getUser = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const user = JSON.parse(atob(token.split('.')[1]));
    return user;
};

// new method needed for the edit profile form in the profile page.
const updateUser = async (formData, token) => {
    try {
        const res = await fetch(`${BASE_URL}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to update user.');
        }

        const updatedUser = await res.json();
        return updatedUser; // Optionally, update context or local storage with this new data -ChatGPT for this line.
    } catch (error) {
        console.error('Error updating user:', error.message);
        throw error;
    }
};

export { signup, signin, signout, getUser, updateUser };
