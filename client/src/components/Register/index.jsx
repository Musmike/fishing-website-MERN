import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import Joi from 'joi';
import passwordComplexity from 'joi-password-complexity';
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

        const schema = Joi.object({
            firstName: Joi.string().min(2).max(30).required().messages({
                'any.required': 'Pole Imię jest wymagane!',
                'string.empty': 'Pole Imię nie może być puste!',
                'string.min': 'Imię powinno mieć co najmniej {#limit} znaki!',
                'string.max': 'Imię powinno mieć maksymalnie {#limit} znaków!'
            }),
            lastName: Joi.string().min(2).max(30).required().messages({
                'any.required': 'Pole Nazwisko jest wymagane!',
                'string.empty': 'Pole Nazwisko nie może być puste!',
                'string.min': 'Nazwisko powinno mieć co najmniej {#limit} znaki!',
                'string.max': 'Nazwisko powinno mieć maksymalnie {#limit} znaków!'
            }),
            email: Joi.string().email({ tlds: false }).required().messages({
                'any.required': 'Pole Email jest wymagane!',
                'string.empty': 'Pole Email nie może być puste!',
                'string.email': 'Podaj adres email w poprawnej formie!'
            }),
            password: passwordComplexity().required().messages({
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
                            minLength={2}
                            maxLength={20}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Nazwisko"
                            name="lastName"
                            onChange={handleChange}
                            value={data.lastName}
                            minLength={2}
                            maxLength={20}
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