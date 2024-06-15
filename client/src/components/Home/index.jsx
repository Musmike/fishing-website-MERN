import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from "./styles.module.css";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchPosts(page);
    }, [page]);

    const fetchPosts = async (page) => {
        try {
            const response = await axios.get(`http://localhost:8089/api/posts?page=${page}`);
            if (response.data.length === 0) {
                setHasMore(false);
            } else {
                setPosts(prevPosts => [...prevPosts, ...response.data]);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const loadMorePosts = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <Container className="px-4 px-lg-5">
            <Row className="gx-4 gx-lg-5 justify-content-center" id="posty">
                {posts.map(post => (
                    <Col key={post._id} md={10} lg={8} xl={7}>
                        <div className="post-preview">
                            <div className="d-flex justify-content-center">
                                <img className="img-fluid" src={post.image_link} alt="Opis zdjęcia" />
                            </div>
                            <a href={`/posts/${post._id}`}>
                                <h2 className="post-title">{post.title}</h2>
                                <h3 className="post-subtitle">{post.short_description}</h3>
                            </a>
                            <p className="post-meta">
                                Opublikowano przez <b>{post.author}</b> dnia {new Date(post.created_at).toLocaleDateString()}
                            </p>
                        </div>
                        <hr className="my-4" />
                    </Col>
                ))}
            </Row>

            {hasMore && (
                <Row className="justify-content-end mb-4">
                    <Col md={6} className="text-end">
                        <Button variant="primary" onClick={loadMorePosts} className="text-uppercase" id="loadMore">Więcej →</Button>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default Home;
