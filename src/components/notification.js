import React, { useState } from "react";
import "./../styles/notification.css";
import { Link } from "react-router-dom";
const Notification = (props) => {
  const { notifications } = props;
  //   const [showNotifications, setShowNotifications] = useState(true);

  // const handleClick = () => {
  //   setShowNotifications(!showNotifications);
  // };

  const handleRead = (notification) => {
    if (notification.isRead === 0) {
      fetch(`http://localhost:9999/notification/${notification.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          isRead: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then(() => window.location.reload())
        .then((json) => console.log(json));
    }
  };

  return (
    <div className="notification-overlay">
      <div className="notification-container">
        <ul className="notification-list">
          {/* <li>sadsadw</li> */}
          {/* <li>sadsadw</li> */}
          <h2 className="text-primary text-center">Notification</h2>
          {notifications.map((notification) => (
            <li key={notification.id}>
              <Link
                to={`/story/reading/${notification.storyId}`}
                className={notification.isRead === 0 ? "unread" : "read"}
                onClick={(e) => handleRead(notification)}
                style={{color: "black"}}
              >
                {notification.content}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notification;
