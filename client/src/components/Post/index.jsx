import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Post = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);

    const fetchPost = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8089/api/post/${postId}`);
            setPost(response.data);
        } 
        catch (error) {
            console.error("Error fetching post:", error);
        }
    }, [postId]);

    useEffect(() => {
        fetchPost();
    }, [fetchPost]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <main className="mb-4 mt-5">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7 text-center">
                        <h2 className="post-title">{post.title}</h2>
                        <p className="post-meta">Opublikowano przez <b>{post.author}</b> dnia {new Date(post.created_at).toLocaleDateString('pl-PL')}</p>
                        <img className="img-fluid" src={post.image_link} alt="Opis zdjęcia" />
                        <p>{post.content}</p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Post;
