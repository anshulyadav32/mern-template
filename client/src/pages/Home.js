import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating data fetching
    setTimeout(() => {
      setPosts([
        { id: 1, title: 'Welcome to MERN Stack', content: 'This is a sample post', author: 'Admin' },
        { id: 2, title: 'Getting Started', content: 'Learn how to use this template', author: 'Admin' }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  return (
    <div className="home">
      <h1>Latest Posts</h1>
      {posts.length > 0 ? (
        <div className="posts">
          {posts.map((post) => (
            <div className="post-card" key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content.substring(0, 100)}...</p>
              <div className="post-footer">
                <span>By: {post.author}</span>
                <Link to={`/post/${post.id}`} className="btn btn-sm">Read More</Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No posts found</p>
      )}
    </div>
  );
}

export default Home;
