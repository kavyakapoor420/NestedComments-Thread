import React, { useState, useContext } from 'react';
    import { AuthContext } from '../../Context/AuthContext'
    import CommentInput from './CommentInput';

    interface CommentItemProps {
      comment: Comment;
      onCommentUpdated: (comment: Comment) => void;
      onCommentDeleted: (id: number) => void;
      onReplyPosted: (comment: Comment) => void;
      currentUserId: number;
    }

    const API_BASE_URL='http://locahost:3000'

    const CommentItem: React.FC<CommentItemProps> = ({
      comment,
      onCommentUpdated,
      onCommentDeleted,
      onReplyPosted,
      currentUserId,
    }) => {
      const { token } = useContext(AuthContext);
      const [isEditing, setIsEditing] = useState<boolean>(false);
      const [editedContent, setEditedContent] = useState<string>(comment.content);
      const [showReplyInput, setShowReplyInput] = useState<boolean>(false);
      const [error, setError] = useState<string>('');

      const isAuthor = comment.user_id === currentUserId;
      const canEdit =
        isAuthor &&
        !comment.is_deleted &&
        (new Date().getTime() - new Date(comment.created_at).getTime()) / (1000 * 60) <= 15;
      const canDelete = isAuthor && !comment.is_deleted;
      const canRestore =
        isAuthor &&
        comment.is_deleted &&
        comment.deleted_at &&
        (new Date().getTime() - new Date(comment.deleted_at).getTime()) / (1000 * 60) <= 15;

      const handleEdit = async () => {
        setError('');
        if (!editedContent.trim()) {
          setError('Comment cannot be empty.');
          return;
        }
        try {
          const response = await fetch(`${API_BASE_URL}/comments/${comment.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ content: editedContent }),
          });
          const data = await response.json();
          if (response.ok) {
            onCommentUpdated(data.comment);
            setIsEditing(false);
          } else {
            setError(data.message || 'Failed to edit comment.');
          }
        } catch (err) {
          console.error('Error editing comment:', err);
          setError('Network error: Failed to edit comment.');
        }
      };

      const handleDelete = async () => {
        setError('');
        if (window.confirm('Are you sure you want to delete this comment? You have 15 minutes to restore it.')) {
          try {
            const response = await fetch(`${API_BASE_URL}/comments/${comment.id}`, {
              method: 'DELETE',
              headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            if (response.ok) {
              onCommentDeleted(comment.id);
            } else {
              setError(data.message || 'Failed to delete comment.');
            }
          } catch (err) {
            console.error('Error deleting comment:', err);
            setError('Network error: Failed to delete comment.');
          }
        }
      };

      const handleRestore = async () => {
        setError('');
        try {
          const response = await fetch(`${API_BASE_URL}/comments/${comment.id}/restore`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          if (response.ok) {
            onCommentDeleted(comment.id);
          } else {
            setError(data.message || 'Failed to restore comment.');
          }
        } catch (err) {
          console.error('Error restoring comment:', err);
          setError('Network error: Failed to restore comment.');
        }
      };

      return (
        <div className={`bg-gray-50 p-4 rounded-lg shadow-sm mb-3 ${comment.is_deleted ? 'opacity-60 italic' : ''}`}>
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm font-semibold text-gray-700">{comment.username}</p>
            <p className="text-xs text-gray-500">
              {new Date(comment.created_at).toLocaleString()}
              {comment.updated_at !== comment.created_at && <span className="ml-2">(Edited)</span>}
              {comment.is_deleted && <span className="ml-2 text-red-500">(Deleted)</span>}
            </p>
          </div>
          {isEditing ? (
            <div>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                rows={2}
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              ></textarea>
              {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEdit}
                  className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-800 break-words">{comment.content}</p>
          )}
          {!comment.is_deleted && !isEditing && (
            <div className="flex gap-2 mt-3 text-sm">
              {isAuthor && canEdit && (
                <button onClick={() => setIsEditing(true)} className="text-blue-600 hover:underline">
                  Edit
                </button>
              )}
              {isAuthor && canDelete && (
                <button onClick={handleDelete} className="text-red-600 hover:underline">
                  Delete
                </button>
              )}
              {!isAuthor && (
                <button
                  onClick={() => setShowReplyInput(!showReplyInput)}
                  className="text-gray-600 hover:underline"
                >
                  {showReplyInput ? 'Cancel Reply' : 'Reply'}
                </button>
              )}
            </div>
          )}
          {comment.is_deleted && canRestore && (
            <div className="flex gap-2 mt-3 text-sm">
              <button onClick={handleRestore} className="text-green-600 hover:underline">
                Restore
              </button>
            </div>
          )}
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          {showReplyInput && (
            <div className="mt-4 pl-4 border-l-2 border-gray-200">
              <CommentInput
                parentId={comment.id}
                onCommentPosted={onReplyPosted}
                onCancelReply={() => setShowReplyInput(false)}
              />
            </div>
          )}
        </div>
      );
    };

    export default CommentItem;