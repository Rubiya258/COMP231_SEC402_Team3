package mytask.service;

import java.time.LocalDateTime;
import mytask.entity.Notification;

public class NotificationValidator {
	public static void validate(Notification notification) {
        if (notification == null) {
            throw new IllegalArgumentException("Notification cannot be null.");
        }

        validateNotificationTime(notification);
        validatePriority(notification);
        validateReminder(notification);
    }
	
	
	private static void validateNotificationTime(Notification notification) {
        LocalDateTime time = notification.getNotificationTime();

        if (time == null) {
            throw new IllegalArgumentException("Notification time cannot be null.");
        }

        if (time.isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Notification time must be set in the future.");
        }
    }
	

	 private static void validatePriority(Notification notification) {
	        String priority = notification.getPriority();

	        if (priority == null || priority.trim().isEmpty()) {
	          
	            return;
	        }

	        if (!priority.matches("LOW|MEDIUM|HIGH")) {
	            throw new IllegalArgumentException("Priority must be LOW, MEDIUM, or HIGH (case-insensitive) if provided.");
	        }
	    }
	 

	 private static void validateReminder(Notification notification) {
	        if (notification.getReminder() == null) {
	            throw new IllegalArgumentException("Notification must be linked to a Reminder.");
	        }
	    }
}
