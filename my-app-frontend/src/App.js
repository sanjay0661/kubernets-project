import React, { useState } from "react";
import axios from "axios";

function App() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");  // Email input field
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [token, setToken] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Send both email and username along with the password to the backend
            const response = await axios.post("http://localhost:5000/login", {
                username,
                email,
                password,
            });

            setMessage(response.data.message);
            setToken(response.data.token);
        } catch (error) {
            setMessage(error.response ? error.response.data.message : "Login failed");
        }
    };

    return (
        <div>
            <h1>Login</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email</label>  {/* New field for email */}
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {token && (
                <div>
                    <h2>Authenticated</h2>
                    <p>Your token: {token}</p>
                </div>
            )}
        </div>
    );
}

export default App;
