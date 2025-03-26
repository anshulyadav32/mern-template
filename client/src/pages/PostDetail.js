import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function PostDetail() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Simulate fetching post details
    setTimeout(() => {
      // Mock post data
      const postData = {
        id: parseInt(id),
        title: `Post ${id} Title`,
        content: `This is the detailed content for post ${id}. It contains all the information about this particular post.`,
        author: 'Demo User',
        authorId: '123', // Same as the mock user ID
        createdAt: new Date().toISOString()
      };
      
      setPost(postData);
      setLoading(false);
    }, 500);
  }, [id]);

  const deletePost = () => {
    // In a real app, this would be an API call
    setTimeout(() => {
      toast.success('Post deleted successfully');
      navigate('/dashboard');
    }, 500);
  };

  if (loading) {
    return <div>Loading post details...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="post-detail">
      <Link to="/" className="btn btn-back">
        Back to Posts
      </Link>
      
      <div className="post-header">
        <h1>{post.title}</h1>
        <div className="post-meta">
          <p>By: {post.author}</p>
          <p>Posted on: {new Date(post.createdAt).toLocaleString()}</p>
        </div>
      </div>

      <div className="post-content">
        <p>{post.content}</p>
      </div>

      {user && user.id === post.authorId && (
        <div className="post-actions">
          <button onClick={deletePost} className="btn btn-danger">
            Delete Post
          </button>
        </div>
      )}
    </div>
  );
}

export default PostDetail;
