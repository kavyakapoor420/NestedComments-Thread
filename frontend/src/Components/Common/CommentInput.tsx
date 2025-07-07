import React, { useState, useContext } from 'react';
    import { AuthContext } from '../../Context/AuthContext'

    interface CommentInputProps {
      onCommentPosted: (comment: Comment) => void;
      parentId?: number | null;
      onCancelReply?: () => void;
    }

     const API_BASE_URL = 'http://localhost:3000';
     
    const CommentInput: React.FC<CommentInputProps> = ({ onCommentPosted, parentId = null, onCancelReply }) => {
      const [content, setContent] = useState<string>('');
      const [error, setError] = useState<string>('');
      const { token } = useContext(AuthContext);

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!content.trim()) {
          setError('Comment cannot be empty.');
          return;
        }

        try {
          const response = await fetch(`${API_BASE_URL}/comments`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ content, parent_id: parentId }),
          });

          const data = await response.json();

          if (response.ok) {
            setContent('');
            onCommentPosted(data.comment);
            if (onCancelReply) onCancelReply();
          } else {
            setError(data.message || 'Failed to post comment.');
          }
        } catch (err) {
          console.error('Error posting comment:', err);
          setError('Network error: Failed to post comment. Please try again.');
        }
      };

      return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md mb-4">
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
            rows={3}
            placeholder={parentId ? 'Write a reply...' : 'Write a new comment...'}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          <div className="flex justify-end gap-2 mt-2">
            {onCancelReply && (
              <button
                type="button"
                onClick={onCancelReply}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-200"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              {parentId ? 'Post Reply' : 'Post Comment'}
            </button>
          </div>
        </form>
      );
    };

    export default CommentInput;