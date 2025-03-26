import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function CreatePost() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { title, content } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (!title || !content) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      toast.success('Post created successfully');
      navigate('/dashboard');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="create-post">
      <section className="heading">
        <h1>Create New Post</h1>
        <p>Share your thoughts</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={title}
              placeholder="Enter post title"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              className="form-control"
              id="content"
              name="content"
              value={content}
              placeholder="Write your post content here..."
              onChange={onChange}
              rows="6"
              required
            ></textarea>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block" disabled={loading}>
              {loading ? 'Creating...' : 'Create Post'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default CreatePost;
