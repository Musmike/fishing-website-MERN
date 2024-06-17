import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" })

    const [error, setError] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const schema = Joi.object({
            email: Joi.string().email().required().messages({
                'any.required': 'Pole Email jest wymagane!',
                'string.empty': 'Pole Email nie może być puste!',
                'string.email': 'Podaj adres email w poprawnej formie!'
            }),
            password: Joi.string().required().messages({
                'any.required': 'Pole Hasło jest wymagane!',
                'string.empty': 'Pole Hasło nie może być puste!'
            }),
        });
    
        const { error } = schema.validate(data);

        if (error) {
            setError(error.details[0].message);
            return;
        }
    
        try {
            const url = "http://localhost:8089/auth/login";
            const { data: res } = await axios.post(url, data);
            localStorage.setItem("token", res.data);
            window.location = "/";
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
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>

                <div className={styles.left}>

                    <form className={styles.form_container} onSubmit={handleSubmit}>

                        <h2>Zaloguj się na swoje konto</h2>

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

                        <button type="submit" className={styles.login_btn}>
                            Zaloguj się
                        </button>

                    </form>
                </div>

                <div className={styles.right}>

                    <h2>Nie masz konta?</h2>

                    <Link to="/register">
                        <button type="button" className={styles.register_btn}>
                            Zarejestruj się
                        </button>
                    </Link>

                </div>

            </div>
        </div>
    );

};

export default Login;