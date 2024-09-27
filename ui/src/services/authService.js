const API_URL = "`${process.env.VUE_APP_API_URL}/users`";

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
            .then(data => {
                localStorage.setItem('token', data.token);
                return data;
            })
            .catch(error => {
                console.error('Error during login:', error);
                throw error;
            });
    },

    signup(firstName, lastName, email, password) {
        return fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName, email, password }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Signup failed');
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error during signup:', error);
                throw error;
            });
    },

    logout() {
        localStorage.removeItem('token');
        return Promise.resolve();
    },

    getToken() {
        return localStorage.getItem('token');
    },

    isAuthenticated() {
        const token = this.getToken();
        return !!token;
    }
};
