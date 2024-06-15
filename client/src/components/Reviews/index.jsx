import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css'; 

const Reviews = ({ user }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await axios.get('http://localhost:8089/api/reviews'); // Zastąp odpowiednim adresem URL API
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleEdit = (commentId) => {
        // Przekierowanie do formularza edycji, np. history.push(`/edit/${commentId}`);
        console.log(`Edit comment with id ${commentId}`);
    };

    const handleDelete = async (commentId) => {
        if (window.confirm('Czy na pewno chcesz usunąć ten komentarz?')) {
            try {
                await axios.delete(`https://api.example.com/comments/${commentId}`); // Zastąp odpowiednim adresem URL API
                fetchComments(); // Odśwież listę po usunięciu
            } catch (error) {
                console.error('Error deleting comment:', error);
            }
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('pl-PL', options);
    };

    return (
        <div>
            {/* Nagłówek strony */}
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
                {/* Przycisk dodawania opinii (dla zalogowanych użytkowników) */}
                {user && (
                    <div className="footer-button">
                        <a href="/create" className="btn btn-secondary">Dodaj opinię</a>
                        <hr className="my-4" />
                    </div>
                )}

                {/* Lista opinii */}
                <div className="opinions-list">
                    {comments.map((comment) => (
                        <div key={comment._id} className="opinion-box py-3">
                            {/* Nagłówek opinii */}
                            <div className="opinion-header">
                                <span className="user">{comment.author.firstName} {comment.author.lastName}</span>
                                <span className="date opinion-box__date">{formatDate(comment.created_at)}</span>
                            </div>
                            {/* Treść opinii */}
                            <div className="opinion-body">
                                <p>{comment.content}</p>
                            </div>
                            {/* Akcje opinii (edycja/usuwanie) */}
                            {user && (comment.author._id === user._id || user.status === 'admin') && (
                                <div className="opinion-actions">
                                    <button className="btn btn-success btn-sm" onClick={() => handleEdit(comment._id)}>Edytuj</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(comment._id)}>Usuń</button>
                                </div>
                            )}
                            <hr className="my-4" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Reviews;
