package mytask.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Table(name = "notifications")
public class Notification {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private LocalDateTime notificationTime;
	private String priority; //consists of Low, Medium, and High
	private boolean enabled;
	
	@ManyToOne
	@JoinColumn(name = "reminderId")
	private Reminder reminder;

	//Getters and Setters
	public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDateTime getNotificationTime() { return notificationTime; }
    public void setNotificationTime(LocalDateTime notificationTime) { this.notificationTime = notificationTime; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public boolean isEnabled() { return enabled; }
    public void setEnabled(boolean enabled) { this.enabled = enabled; }

    //waiting for the crud operations from raphael 
    public Reminder getReminder() { return reminder; }
    public void setReminder(Reminder reminder) { this.reminder = reminder; }
}
