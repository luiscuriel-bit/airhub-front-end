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
        throw error;
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
}

export { signup, signin, signout, getUser };