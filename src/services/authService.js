const API_URL = 'http://localhost:3000/v1/users';

export const authService = {
    login(email, password) {
        return fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Login failed');
                }
                return response.json();
            })
            .then(data => data)
            .catch(error => {
                console.error('Error during login:', error);
                throw error;
            });
    },

    signup(name, email, password) {
        return fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Signup failed');
                }
                return response.json();
            })
            .then(data => data)
            .catch(error => {
                console.error('Error during signup:', error);
                throw error;
            });
    },

    logout() {
        localStorage.removeItem('token');
        return Promise.resolve();
    },
};
