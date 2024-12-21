export const registerUser = async ({ email, password }) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/auth/register`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password
            })
        });
        if (!response.ok) {
            const errorData = await response.json(); // Get the error response body
            throw new Error(errorData.error || "Something went wrong");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error registering user: " + error);
        throw error;
    }
}

export const loginUser = async ({ email, password }) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/auth/login`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        if (!response.ok) {
            const errorData = await response.json(); // Get the error response body
            throw new Error(errorData.error || "Something went wrong");
        }
        const data = await response.json();
        
        
        return data.user;
    } catch (error) {
        console.error("Error login user: " + error);
        throw error;
    }
}

export const loginMainatiner = async ({ email, password }) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/auth/login-maintainer`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password
            })
        });
        if (!response.ok) {
            const errorData = await response.json(); // Get the error response body
            console.log(errorData);
            
            throw new Error(errorData.error || "Something went wrong");
        }
        const data = await response.json();
        return data.maintainer;
    } catch (error) {
        console.error("Error login maintainer: " + error);
        throw error;
    }
}