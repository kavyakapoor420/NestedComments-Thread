import React, { useState, useEffect, useContext } from 'react';
    import { AuthContext } from '../Context/AuthContext'
    import CommentInput from '../Components/Common/CommentInput'
    import CommentItem from '../Components/Common/CommentItem';

    interface CommentsSectionProps {
      currentUserId: number;
    }

    const CommentsSection: React.FC<CommentsSectionProps> = ({ currentUserId }) => {
      const [comments, setComments] = useState<Comment[]>([]);
      const [loading, setLoading] = useState<boolean>(true);
      const [error, setError] = useState<string>('');
      const { token } = useContext(AuthContext);

      const fetchComments = async () => {
        setLoading(true);
        setError('');
        try {
          const response = await fetch(`${API_BASE_URL}/comments`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data: Comment[] = await response.json();
          if (response.ok) {
            const commentMap = new Map<number, Comment>();
            data.forEach((c) => {
              commentMap.set(c.id, { ...c, replies: [] });
            });

            const rootComments: Comment[] = [];
            data.forEach((c) => {
              if (c.parent_id) {
                const parent = commentMap.get(c.parent_id);
                if (parent) {
                  parent.replies!.push(commentMap.get(c.id)!);
                }
              } else {
                rootComments.push(commentMap.get(c.id)!);
              }
            });

            const sortReplies = (commentsArray: Comment[]) => {
              commentsArray.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
              commentsArray.forEach((c) => {
                if (c.replies!.length > 0) {
                  sortReplies(c.replies!);
                }
              });
            };
            sortReplies(rootComments);

            setComments(rootComments);
          } else {
            setError(data.message || 'Failed to fetch comments.');
          }
        } catch (err) {
          console.error('Error fetching comments:', err);
          setError('Network error: Failed to fetch comments.');
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        if (token) {
          fetchComments();
        }
      }, [token]);

      const handleCommentPosted = () => {
        fetchComments();
      };

      const handleCommentUpdated = (updatedComment: Comment) => {
        const updateCommentInTree = (commentsArr: Comment[]): Comment[] =>
          commentsArr.map((c) => {
            if (c.id === updatedComment.id) {
              return { ...c, content: updatedComment.content, updated_at: updatedComment.updated_at };
            }
            if (c.replies && c.replies.length > 0) {
              return { ...c, replies: updateCommentInTree(c.replies) };
            }
            return c;
          });
        setComments(updateCommentInTree(comments));
      };

      const handleCommentDeletedOrRestored = () => {
        fetchComments();
      };

      const renderComments = (commentList: Comment[]) =>
        commentList.map((comment) => (
          <div key={comment.id} className="mb-4">
            <CommentItem
              comment={comment}
              onCommentUpdated={handleCommentUpdated}
              onCommentDeleted={handleCommentDeletedOrRestored}
              onReplyPosted={handleCommentPosted}
              currentUserId={currentUserId}
            />
            {comment.replies && comment.replies.length > 0 && (
              <div className="ml-6 mt-4 border-l-2 border-gray-200 pl-4">{renderComments(comment.replies)}</div>
            )}
          </div>
        ));

      if (loading) return <p className="text-center text-gray-600 mt-8">Loading comments...</p>;
      if (error) return <p className="text-center text-red-600 mt-8">{error}</p>;

      return (
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Comments</h2>
          <CommentInput onCommentPosted={handleCommentPosted} />
          {comments.length === 0 ? (
            <p className="text-center text-gray-500">No comments yet. Be the first to comment!</p>
          ) : (
            <div>{renderComments(comments)}</div>
          )}
        </div>
      );
    };

    export default CommentsSection;