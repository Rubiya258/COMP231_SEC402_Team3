package mytask.entity;

import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "reminders")
public class Reminder {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int reminderId;

	    @ManyToOne
	    @JoinColumn(name = "user_id", nullable = false)
	    @JsonIgnore 
	    private User user;

	    @NotBlank
	    private String title;

	    private String description;

	    
	    @Column(name = "notification_time")
	    private LocalDateTime notificationTime;

	    @Column(name = "is_completed", nullable = false)
	    private boolean completed = false;

	    // Getters and Setters
	    public int getReminderId() { return reminderId; }
	    public void setReminderId(int reminderId) { this.reminderId = reminderId; }
	    public User getUser() { return user; }
	    public void setUser(User user) { this.user = user; }
	    public String getTitle() { return title; }
	    public void setTitle(String title) { this.title = title; }
	    public String getDescription() { return description; }
	    public void setDescription(String description) { this.description = description; }
	    public LocalDateTime getNotificationTime() { return notificationTime; }
	    public void setNotificationTime(LocalDateTime notificationTime) { this.notificationTime = notificationTime; }
	    public boolean isCompleted() { return completed; }
	    public void setCompleted(boolean completed) { this.completed = completed; }
	}
