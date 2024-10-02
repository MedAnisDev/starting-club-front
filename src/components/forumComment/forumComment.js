import React, { useState } from 'react';
import './Comment.css';

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  return (
    <div className="comment-section">
      {/* Comments List shown above */}
      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="comment-item">
              <p>{comment}</p>
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to share your thoughts!</p>
        )}
      </div>

      
      <div className="comment-form">
        <textarea 
          placeholder="Share your thoughts..." 
          value={newComment} 
          onChange={(e) => setNewComment(e.target.value)} 
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
    </div>
  );
};

export default Comment;