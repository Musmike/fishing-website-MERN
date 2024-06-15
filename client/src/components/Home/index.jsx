import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import React Router Link

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

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Intl.DateTimeFormat('pl-PL', options).format(new Date(dateString));
    };

    return (
        <>
            {/* Header */}
            <header className="masthead" style={{ backgroundImage: `url('https://images.pexels.com/photos/1630039/pexels-photo-1630039.jpeg?cs=srgb&dl=pexels-tomasz-filipek-1630039.jpg&fm=jpg')` }}>
                <div className="container position-relative px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <div className="site-heading">
                                <h1>Wędkarstwo naszą pasją</h1>
                                <span className="subheading">Strona dla początkujących i zaawansowanych wędkarzy</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <Container className="px-4 px-lg-5">
                <Row className="gx-4 gx-lg-5 justify-content-center" id="posty">
                    {posts.map(post => (
                        <Col key={post._id} md={10} lg={8} xl={7}>
                            <div className="post-preview">
                                <div className="d-flex justify-content-center">
                                    <img className="img-fluid" src={post.image_link} alt="Opis zdjęcia" />
                                </div>
                                <Link to={`/post/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <h2 className="post-title">{post.title}</h2>
                                    <h3 className="post-subtitle">{post.short_description}</h3>
                                </Link>
                                <p className="post-meta">
                                    Opublikowano przez <b>{post.author}</b> dnia {formatDate(post.created_at)}
                                </p>
                            </div>
                            <hr className="my-4" />
                        </Col>
                    ))}
                </Row>

                {/* Load More Button */}
                {hasMore && (
                    <Row className="justify-content-end mb-4">
                        <Col md={6} className="text-end">
                            <Button variant="primary" onClick={loadMorePosts} className="text-uppercase" id="loadMore">Więcej →</Button>
                        </Col>
                    </Row>
                )}
            </Container>
        </>
    );
};

export default Home;
