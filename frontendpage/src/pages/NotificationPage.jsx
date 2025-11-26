import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NOTIFICATION_API } from "../services/api.js";


export default function NotificationPage() {
const { id } = useParams();
const [notifications, setNotifications] = useState([]);
const [time, setTime] = useState("");


useEffect(() => {
fetch(NOTIFICATION_API.BY_REMINDER(id))
.then(res => res.json())
.then(data => setNotifications(data));
}, []);


const addNotification = async () => {
await fetch(NOTIFICATION_API.CREATE, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
notificationTime: time,
reminder: { reminderId: Number(id) }
})
});
window.location.reload();
};


return (
<div className="list-container">
<h2>Notifications for Reminder #{id}</h2>


<input
type="datetime-local"
onChange={(e) => setTime(e.target.value)}
/>
<button onClick={addNotification}>Add Notification</button>


{notifications.map(n => (
<div key={n.id} className="list-item">
<p><strong>Notify At:</strong> {n.notificationTime}</p>
</div>
))}
</div>
);
}
