import React, { useState, useEffect, useContext } from 'react';
    import { AuthContext } from  '../Context/AuthContext'

  

    const NotificationsSection: React.FC = () => {
      const [notifications, setNotifications] = useState<Notification[]>([]);
      const [loading, setLoading] = useState<boolean>(true);
      const [error, setError] = useState<string>('');
      const { token } = useContext(AuthContext);

        const API_BASE_URL='http://localhost:3000'

      const fetchNotifications = async () => {
        setLoading(true);
        setError('');
        try {
          const response = await fetch(`${API_BASE_URL}/notifications`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data: Notification[] = await response.json();
          if (response.ok) {
            setNotifications(data);
          } else {
            setError(data.message || 'Failed to fetch notifications.');
          }
        } catch (err) {
          console.error('Error fetching notifications:', err);
          setError('Network error: Failed to fetch notifications.');
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        if (token) {
          fetchNotifications();
        }
      }, [token]);

      const markAsRead = async (id: number) => {
        setError('');
        try {
          const response = await fetch(`${API_BASE_URL}/notifications/${id}/read`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          if (response.ok) {
            setNotifications((prev) =>
              prev.map((notif) => (notif.id === id ? { ...notif, is_read: true } : notif))
            );
          } else {
            setError(data.message || 'Failed to mark notification as read.');
          }
        } catch (err) {
          console.error('Error marking notification as read:', err);
          setError('Network error: Failed to mark notification as read.');
        }
      };

      if (loading) return <p className="text-center text-gray-600 mt-8">Loading notifications...</p>;
      if (error) return <p className="text-center text-red-600 mt-8">{error}</p>;

      return (
        <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Notifications</h2>
          {notifications.length === 0 ? (
            <p className="text-center text-gray-500">No new notifications.</p>
          ) : (
            <ul className="space-y-4">
              {notifications.map((notif) => (
                <li
                  key={notif.id}
                  className={`p-4 rounded-md flex items-center justify-between ${
                    notif.is_read ? 'bg-gray-100 text-gray-600' : 'bg-blue-50 text-blue-800 font-medium'
                  }`}
                >
                  <div>
                    <p className="text-sm">
                      <span className="font-semibold">{notif.reply_author_username}</span> replied to your
                      comment: "{notif.original_comment_content.substring(0, 50)}..."
                    </p>
                    <p className="text-xs mt-1 text-gray-500">
                      "{notif.reply_content.substring(0, 50)}..."
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{new Date(notif.created_at).toLocaleString()}</p>
                  </div>
                  {!notif.is_read && (
                    <button
                      onClick={() => markAsRead(notif.id)}
                      className="ml-4 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs transition duration-200"
                    >
                      Mark as Read
                    </button>
                  )}
                </li>
             ))))

            </ul>
          )}
        </div>
      );
    };

    export default NotificationsSection;