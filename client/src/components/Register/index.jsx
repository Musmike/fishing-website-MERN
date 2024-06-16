import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import styles from "./styles.module.css";

const Register = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    })

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            setError("Niepoprawny format adresu e-mail.");
            return;
        }
    
        try {
            const url = "http://localhost:8089/auth/register";
            const { data: res } = await axios.post(url, data);
            navigate("/login");
            console.log(res);
        } 
        catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message); 
            } 
            else {
                setError("Wystąpił nieoczekiwany błąd.");
            }
        }
    };
    

    return (
        <div className={styles.signup_container}>

            <div className={styles.signup_form_container}>

                <div className={styles.left}>

                    <h2>Masz już konto?</h2>

                    <Link to="/login">
                        <button type="button" className={styles.login_btn}>
                            Zaloguj się
                        </button>
                    </Link>

                </div>

                <div className={styles.right}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>

                        <h2>Stwórz konto</h2>

                        <input
                            type="text"
                            placeholder="Imię"
                            name="firstName"
                            onChange={handleChange}
                            value={data.firstName}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Nazwisko"
                            name="lastName"
                            onChange={handleChange}
                            value={data.lastName}
                            required
                            className={styles.input}
                        />
                        <input
                            type="email"
                            placeholder="Adres email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Hasło"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className={styles.input}
                        />

                        {error && <div
                            className={styles.error_msg}>{error}</div>}

                        <button type="submit"
                            className={styles.register_btn}>
                            Zarejestruj się
                        </button>

                    </form>
                </div>

            </div>

        </div>
    );

};

export default Register;