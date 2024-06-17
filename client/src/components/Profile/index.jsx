import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import styles from './styles.module.css';
import axios from 'axios';
import CustomModal from './CustomModal'; 

const EditProfile = ({ user }) => {

    const token = localStorage.getItem('token'); 

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleProfileUpdate = async () => {

        const schema = Joi.object({
            firstName: Joi.string().min(2).max(30).allow('').label("Imię").messages({
                'string.min': 'Pole Imię powinno mieć co najmniej {#limit} znaki!',
                'string.max': 'Pole Imię powinno mieć maksymalnie {#limit} znaków!'
            }),
            lastName: Joi.string().min(2).max(30).allow('').label("Nazwisko").messages({
                'string.min': 'Pole Nazwisko powinno mieć co najmniej {#limit} znaki!',
                'string.max': 'Pole Nazwisko powinno mieć maksymalnie {#limit} znaków!'
            }),
            email: Joi.string().email().allow('').label("Email").messages({
                'string.email': 'Podaj adres email w poprawnej formie!'
            }),
        });

        const { error } = schema.validate(formData);

        if (error) {
            setErrorMessage(error.details[0].message);
            setSuccessMessage('');
            return;
        }

        try {
            const config = {
                headers: {
                    'x-access-token': token 
                }
            };

            await axios.patch("http://localhost:8089/api/user", {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email
            }, config);

            setSuccessMessage('Profil użytkownika zaktualizowany pomyślnie.');
            setErrorMessage('');
        } 
        catch (error) {
            setSuccessMessage('');
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setErrorMessage(error.response.data.message); 
            } 
            else {
                setErrorMessage("Wystąpił nieoczekiwany błąd.");

            }
        }
    };

    const handlePasswordChange = async () => {

        const schema = Joi.object({
            currentPassword: Joi.string().required().label("Aktualne hasło").messages({
                'any.required': "Pole 'Aktualne hasło' jest wymagane!",
                'string.empty': "Pole 'Aktualne hasło' nie może być puste!"
            }),
            newPassword: passwordComplexity().required().label("Nowe hasło").custom((value, helpers) => {
                if (value === helpers.state.ancestors[0].currentPassword) {
                    return helpers.message("Nowe hasło nie może być identyczne z aktualnym hasłem!");
                }
                return value;
            }).messages({
                'any.required': "Pole 'Nowe hasło' jest wymagane!",
                'string.empty': "Pole 'Nowe hasło' nie może być puste!"
            }),
            confirmNewPassword: Joi.string().valid(Joi.ref("newPassword")).required().label("Potwierdzenie nowego hasła").messages({
                "any.only": "Pola z nowym hasłem muszą być identyczne!",
                'any.required': "Pole 'Potwierdź nowe hasło' jest wymagane!",
                'string.empty': "Pole 'Potwierdź nowe hasło' nie może być puste!"
            }),
        });
    
        const { error } = schema.validate(formData);

        if (error) {
            setErrorMessage(error.details[0].message);
            setSuccessMessage('');
            return;
        }

        try {

            const config = {
                headers: {
                    'x-access-token': token 
                }
            };

            await axios.patch("http://localhost:8089/api/user", {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
                confirmNewPassword: passwordData.confirmNewPassword
            }, config);

            setSuccessMessage('Hasło użytkownika zmienione pomyślnie.');
            setErrorMessage('');
        } 
        catch (error) {
            setSuccessMessage('');
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setErrorMessage(error.response.data.message); 
            } 
            else {
                setErrorMessage("Wystąpił nieoczekiwany błąd.");

            }
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const config = {
                headers: {
                    'x-access-token': token 
                }
            };
            await axios.delete("http://localhost:8089/api/user", config);
            localStorage.removeItem("token");
            window.location.reload();
        } 
        catch (error) {
            setSuccessMessage('');
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setErrorMessage(error.response.data.message); 
            } 
            else {
                setErrorMessage("Wystąpił nieoczekiwany błąd.");

            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePasswordChangeInput = (e) => {
        const { name, value } = e.target;
        setPasswordData({ ...passwordData, [name]: value });
    };

    return (
        <div className={styles.mainContainer}>

            <div className={`${styles.container} mt-4`}>
                <div className={styles.formSection}>
                    <h2>Edycja konta użytkownika</h2>

                    {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                    {successMessage && <Alert variant="success">{successMessage}</Alert>}


                    <div className={styles.formGroup}>
                        <label>Imię</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Wprowadź imię"
                            name="firstName"
                            value={formData.firstName}
                            minLength={2}
                            maxLength={20}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Nazwisko</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Wprowadź nazwisko"
                            name="lastName"
                            value={formData.lastName}
                            minLength={2}
                            maxLength={20}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Adres email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Wprowadź email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <button className={`btn btn-primary ${styles.button}`} onClick={handleProfileUpdate}>
                        Zapisz zmiany
                    </button>
                </div>

                <hr className={styles.hr} />

                <div className={styles.formSection}>
                    <div className={styles.formGroup}>
                        <label>Aktualne hasło</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Wprowadź aktualne hasło"
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            required
                            onChange={handlePasswordChangeInput}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Nowe hasło</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Wprowadź nowe hasło"
                            name="newPassword"
                            value={passwordData.newPassword}
                            required
                            onChange={handlePasswordChangeInput}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Potwierdź nowe hasło</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Potwierdź nowe hasło"
                            name="confirmNewPassword"
                            value={passwordData.confirmNewPassword}
                            required
                            onChange={handlePasswordChangeInput}
                        />
                    </div>

                    <button className={`btn btn-primary ${styles.button}`} onClick={handlePasswordChange}>
                        Zmień hasło
                    </button>
                </div>

                <hr className={styles.hr} />

                <button className={`btn btn-danger ${styles.button} ${styles.deleteButton}`} onClick={() => setShowDeleteModal(true)}>
                    Usuń konto
                </button>

                <CustomModal
                    isOpen={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={handleDeleteAccount}
                >
                    <div className="modal-content">
                        <p>Czy na pewno chcesz usunąć swoje konto?</p>
                        <p>To działanie jest nieodwracalne!</p>
                    </div>
                </CustomModal>

            </div>
        </div>
    );
};

export default EditProfile;
