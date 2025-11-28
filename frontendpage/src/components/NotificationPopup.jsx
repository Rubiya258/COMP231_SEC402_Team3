import "../styles/NotificationPopup.css";

export default function NotificationPopup({ title, description, time, onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup-box">

        <div className="popup-header">
          <span className="popup-icon">⏰</span>
          <h3>Reminder Alert</h3>
        </div>

        <div className="popup-content">
          <p><strong>Title:</strong> {title}</p>

          {description && (
            <p><strong>Description:</strong> {description}</p>
          )}

          {time && (
            <p><strong>Due at:</strong> {new Date(time).toLocaleString()}</p>
          )}
        </div>

        <div className="popup-actions">
          <button onClick={onClose} className="popup-close-btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
