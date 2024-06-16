import React, { useState } from 'react';
import { Alert, Container } from 'react-bootstrap';
import styles from './styles.module.css';

const EditProfile = () => {
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

    const handleProfileUpdate = async () => {
        try {
            // Logic to update user profile
            setSuccessMessage('Profil użytkownika zaktualizowany pomyślnie.');
        } 
        catch (error) {
            setErrorMessage('Błąd podczas aktualizacji profilu.');
        }
    };

    const handlePasswordChange = async () => {
        try {
            // Logic to change user password
            setSuccessMessage('Hasło użytkownika zmienione pomyślnie.');
        } 
        catch (error) {
            setErrorMessage('Błąd podczas zmiany hasła.');
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm('Czy na pewno chcesz usunąć konto?')) {
            try {

            } 
            catch (error) {
                setErrorMessage('Błąd podczas usuwania konta.');
            }
        }
    };

    const handleSaveEdit = async () => {
        try {
            const config = {
                headers: {
                    'x-access-token': token 
                }
            };
            await axios.patch(`http://localhost:8089/api/review/${editingReview._id}`, { content: editingReview.content }, config);
            setEditingReview(null);
            fetchReviews();
        } 
        catch (error) {
            console.error('Błąd przy edytowaniu opinii:', error);
        }
    };

    const handleDelete = async () => {
        if (reviewToDelete) {
            try {
                const config = {
                    headers: {
                        'x-access-token': token 
                    }
                };
                await axios.delete(`http://localhost:8089/api/review/${reviewToDelete}`, config);
                setReviewToDelete(null);
                fetchReviews();
            } 
            catch (error) {
                console.error('Błąd przy usuwaniu opinii:', error);
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
                            onChange={handlePasswordChangeInput}
                        />
                    </div>

                    <button className={`btn btn-primary ${styles.button}`} onClick={handlePasswordChange}>
                        Zmień hasło
                    </button>
                </div>

                <hr className={styles.hr} />

                <button className={`btn btn-danger ${styles.button} ${styles.deleteButton}`} onClick={handleDeleteAccount}>
                    Usuń konto
                </button>
            </div>
        </div>
    );
};

export default EditProfile;
