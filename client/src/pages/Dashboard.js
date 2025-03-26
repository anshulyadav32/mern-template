import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Simulate loading user posts
    setTimeout(() => {
      setPosts([
        { id: 1, title: 'My First Post', content: 'This is a post I created', createdAt: new Date().toISOString() },
        { id: 2, title: 'Getting Started with MERN', content: 'Learning the MERN stack', createdAt: new Date().toISOString() }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const deletePost = (id) => {
    // In a real app, this would be an API call
    setPosts(posts.filter(post => post.id !== id));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <section className="heading">
        <h1>Dashboard</h1>
        <p>Welcome {user?.name}</p>
      </section>

      <Link to="/create-post" className="btn">
        Create New Post
      </Link>

      <section className="content">
        {posts.length > 0 ? (
          <>
            <h2>Your Posts</h2>
            <div className="posts">
              {posts.map((post) => (
                <div className="post-item" key={post.id}>
                  <div>
                    <h3>{post.title}</h3>
                    <p className="post-date">
                      {new Date(post.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="post-actions">
                    <Link to={`/post/${post.id}`} className="btn btn-sm">
                      View
                    </Link>
                    <button
                      onClick={() => deletePost(post.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div>
            <h2>You have not created any posts</h2>
            <p>Start creating content now</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
