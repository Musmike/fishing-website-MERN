import React, { useState } from 'react';
import axios from 'axios';
import styles from "./styles.module.css";
import Users from './Users';

const Home = () => {

    const [dane, ustawDane] = useState([])
    const [message, setMessage] = useState('');

    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }

    const handleGetUsers = async (e) => {
        e.preventDefault()

        const token = localStorage.getItem("token")

        if (token) {
            try {
                const config = {
                    method: 'get',
                    url: 'http://localhost:8080/api/users',
                    headers: { 'Content-Type': 'application/json', 'x-access-token': token }
                }

                const { data: res } = await axios(config)
                setMessage(res.message);
                ustawDane(res.data)
            }
            catch (error) {
                if (error.response && error.response.status >= 400
                    && error.response.status <= 500) {
                    localStorage.removeItem("token")
                    window.location.reload()
                }
            }
        }
    }

    const handleGetUserDetails = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (token) {
            try {
                const config = {
                    method: 'get',
                    url: 'http://localhost:8080/api/users/details',
                    headers: { 'Content-Type': 'application/json', 'x-access-token': token }
                }

                const { data: res } = await axios(config);
                setMessage(res.message);
                ustawDane([res.data]); 
            }
            catch (error) {
                if (error.response && error.response.status >= 400
                    && error.response.status <= 500) {
                    localStorage.removeItem("token");
                    window.location.reload();
                }
            }
        }
    }

    const handleDeleteAccount = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (token) {
            const confirmDelete = window.confirm("Czy na pewno chcesz usunąć swoje konto?");
            if (confirmDelete) {
                try {
                    const config = {
                        method: 'delete',
                        url: 'http://localhost:8080/api/users',
                        headers: { 'Content-Type': 'application/json', 'x-access-token': token }
                    }

                    const { data: res } = await axios(config);
                    setMessage(res.message);
                    localStorage.removeItem("token");
                    window.location.reload();
                }
                catch (error) {
                    if (error.response && error.response.status >= 400
                        && error.response.status <= 500) {
                        localStorage.removeItem("token");
                        window.location.reload();
                    }
                }
            }
        }
    }

    return (
        <div className={styles.main_container}>
            <h1>Moja stronka</h1>

            <nav className={styles.navbar}>     

                <button className={styles.white_btn} onClick={handleGetUsers}>
                    Użytkownicy
                </button>

                <button className={styles.white_btn} onClick={handleGetUserDetails}>
                    Szczegóły konta
                </button>

                <button className={styles.white_btn} onClick={handleDeleteAccount}>
                    Usuń konto
                </button>

                <button className={styles.white_btn} onClick={handleLogout}>
                    Wyloguj się
                </button>

            </nav>

            <h2>{message}</h2>
            
            {dane.length === 1 ? (
                <div>
                    <h3>{dane[0].firstName} {dane[0].lastName}</h3>
                    <p>id: {dane[0]._id}</p>
                    <p>email: {dane[0].email}</p>
                </div>
            ) : (
                dane.length > 0 ? <Users users={dane} /> : <p></p>
            )}

        </div>
    )

}
export default Home