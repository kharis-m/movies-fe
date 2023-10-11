import { useState } from "react";
import Input from "./form/Input";
import { useNavigate, useOutletContext } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [password, setPassword] = useState("");

    const { setJwtToken } = useOutletContext();
    const { setAlertClassName } = useOutletContext();
    const { setAlertMessage } = useOutletContext();
    const { toogleRefresh } = useOutletContext();

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const isEmailValid = validateEmail(email);
        if (!isEmailValid) {
            // If email is not valid, set isEmailValid state to false and prevent form submission
            setIsEmailValid(false);
            return;
        }

        let payload = {
            email: email,
            password: password,
        }

        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(payload),
        }
        
        fetch(`${process.env.REACT_APP_BACKEND}/authenticate`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    setAlertClassName("alert-danger");
                    setAlertMessage(data.message);
                } else {
                    setJwtToken(data.access_token);
                    setAlertClassName("d-none");
                    setAlertMessage("");
                    toogleRefresh(true);
                    navigate("/")
                }
            })
            .catch(error => {
                setAlertClassName("alert-danger");
                setAlertMessage(error);
            })
        setIsEmailValid(true);
    }

    return (
        <div className="col-md-6 offset-md-3">
            <h2>Please Login</h2>
            <hr />

            <form onSubmit={handleSubmit} className="needs-validation">
                <Input
                    title="Email Address"
                    type="email"
                    className={`form-control ${isEmailValid ? '' : 'is-invalid'}`}
                    name="email"
                    autoComplete="email-new"
                    onChange={(event) => setEmail(event.target.value)}
                />

                <Input
                    title="Password"
                    type="password"
                    className="form-control"
                    name="password"
                    autoComplete="password-new"
                    onChange={(event) => setPassword(event.target.value)}
                />

                <hr />

                <input 
                    type="submit"
                    className="btn btn-primary"
                    value="Login"
                />
            </form>
        </div>
    )
}

function validateEmail(email) {
    // Implement your email validation logic here
    // For example, you can use a regular expression to check the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export default Login;