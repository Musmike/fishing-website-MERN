import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomModal from './CustomModal'; 
import Joi from 'joi';
import './styles.css';

const Reviews = ({ user }) => {
    const token = localStorage.getItem('token'); 
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState("");
    const [editingReview, setEditingReview] = useState(null);
    const [reviewToDelete, setReviewToDelete] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchReviews();
    }, []);
    
    const fetchReviews = async () => {
        try {
            const response = await axios.get('http://localhost:8089/api/reviews');
            setReviews(response.data);
        } 
        catch (error) {
            console.error('Błąd przy pobieraniu opinii:', error);
        }
    };

    const handleEdit = (review) => {
        setEditingReview(review);
    };

    const handleSaveEdit = async () => {

        const schema = Joi.object({
            content: Joi.string().required().max(500).messages({
                'any.required': 'Treść recenzji jest wymagana.',
                'string.empty': 'Treść recenzji nie może być pusta.',
                'string.max': 'Treść recenzji może mieć maksymalnie {#limit} znaków.'
            })
        });

        const { error } = schema.validate({ content: editingReview.content });

        if (error) {
            setErrorMessage(error.details[0].message);
            return;
        }
        
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

    const handleAddReview = async () => {

        const schema = Joi.object({
            content: Joi.string().required().max(500).messages({
                'any.required': 'Treść recenzji jest wymagana.',
                'string.empty': 'Treść recenzji nie może być pusta.',
                'string.max': 'Treść recenzji może mieć maksymalnie {#limit} znaków.'
            })
        });

        const { error } = schema.validate(newReview);

        if (error) {
            setErrorMessage(error.details[0].message);
            setSuccessMessage('');
            return;
        }

        if (newReview.trim()) {
            try {
                const config = {
                    headers: {
                        'x-access-token': token 
                    }
                };
                await axios.post('http://localhost:8089/api/review', { content: newReview }, config);
                setNewReview("");
                fetchReviews();
            } 
            catch (error) {
                console.error('Błąd przy dodawaniu opinii:', error);
            }
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('pl-PL', options);
    };

    return (
        <div>
            <header className="masthead" style={{ backgroundImage: "url('https://www.sheknows.com/wp-content/uploads/2022/09/right-time-to-express-opinions.jpg?w=1440')" }}>
                <div className="container position-relative px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <div className="site-heading text-center">
                                <h1>Opinie o naszym sklepie</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container my-4">

                {user && (
                    <div className="footer-button">
                        <textarea
                            className="form-control"
                            placeholder="Dodaj opinię"
                            value={newReview}
                            onChange={(e) => setNewReview(e.target.value)}
                        />
                        <button onClick={handleAddReview} className="btn btn-secondary mt-2">Dodaj opinię</button>
                        <hr className="my-4" />
                    </div>
                )}

                <div className="opinions-list">
                    {reviews.map((review) => (
                        <div key={review._id} className="opinion-box py-3">

                            <div className="opinion-header">
                                <span className="user">{review.author.firstName} {review.author.lastName}</span>
                                <span className="date opinion-box__date">{formatDate(review.updated_at)}</span>
                            </div>

                            <div className="opinion-body">
                                {editingReview && editingReview._id === review._id ? (
                                    <>
                                        <textarea
                                            className="form-control"
                                            value={editingReview.content}
                                            onChange={(e) => setEditingReview({ ...editingReview, content: e.target.value })}
                                        />
                                        <button onClick={handleSaveEdit} className="btn btn-success btn-sm mt-2">Zapisz</button>
                                    </>
                                ) : (
                                    <p>{review.content}</p>
                                )}
                            </div>

                            {user && (review.author._id === user._id || user.status === 'admin') && (
                                <div className="opinion-actions">
                                    <button className="btn btn-success btn-sm" onClick={() => handleEdit(review)}>Edytuj</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => setReviewToDelete(review._id)}>Usuń</button>
                                </div>
                            )}
                            <hr className="my-4" />
                        </div>
                    ))}
                </div>
            </div>

            <CustomModal
                isOpen={!!reviewToDelete}
                onClose={() => setReviewToDelete(null)}
            >
                <div className="modal-content">
                    <p>Czy na pewno chcesz usunąć tę opinię?</p>
                    <button onClick={handleDelete} className="btn btn-danger narrow-button">Usuń</button>
                    <button onClick={() => setReviewToDelete(null)} className="btn btn-secondary narrow-button">Anuluj</button>
                </div>
            </CustomModal>
        </div>
    );
};

export default Reviews;
