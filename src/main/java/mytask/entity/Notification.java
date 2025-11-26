package mytask.entity;

import java.time.LocalDateTime;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "notifications")
public class Notification {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private LocalDateTime notificationTime;
	    private String priority; 
	    private boolean enabled;

	    @ManyToOne
	    @JoinColumn(name = "reminder_id")
	    private Reminder reminder;

	    // Getters and Setters
	    public Long getId() { return id; }
	    public void setId(Long id) { this.id = id; }

	    public LocalDateTime getNotificationTime() { return notificationTime; }
	    public void setNotificationTime(LocalDateTime notificationTime) { this.notificationTime = notificationTime; }

	    public String getPriority() { return priority; }
	    public void setPriority(String priority) { this.priority = priority; }

	    public boolean isEnabled() { return enabled; }
	    public void setEnabled(boolean enabled) { this.enabled = enabled; }

	    public Reminder getReminder() { return reminder; }
	    public void setReminder(Reminder reminder) { this.reminder = reminder; }
}

