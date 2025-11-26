package mytask.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import mytask.entity.Notification;
import mytask.entity.Reminder;
import mytask.repository.NotificationRepository;
import mytask.repository.ReminderRepository;
import mytask.service.NotificationValidator;

@RestController
@RequestMapping("/notifications")
@CrossOrigin(origins = "*")
public class NotificationController {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private ReminderRepository reminderRepository;

    @PostMapping
    public Notification createNotification(@RequestBody Notification notification) {
       
        if (notification.getReminder() == null || notification.getReminder().getReminderId() == 0) {
            throw new IllegalArgumentException("Reminder ID is required");
        }

        Reminder reminder = reminderRepository.findById(notification.getReminder().getReminderId())
            .orElseThrow(() -> new RuntimeException("Reminder not found"));

        notification.setReminder(reminder);

        
        if (notification.getPriority() == null) notification.setPriority("MEDIUM");
        notification.setEnabled(true);

       
        NotificationValidator.validate(notification);

        return notificationRepository.save(notification);
    }


    @PutMapping("/{id}")
    public Notification updateNotification(@PathVariable Long id, @RequestBody Notification notification) {
        NotificationValidator.validate(notification);
        notification.setId(id);

        if (notification.getReminder() != null && notification.getReminder().getReminderId() > 0) {
            Reminder reminder = reminderRepository.findById(notification.getReminder().getReminderId())
                    .orElseThrow(() -> new RuntimeException("Reminder not found"));
            notification.setReminder(reminder);
        }

        return notificationRepository.save(notification);
    }


    @GetMapping("/reminder/{reminderId}")
    public List<Notification> getNotificationsByReminder(@PathVariable Long reminderId) {
        return notificationRepository.findByReminder_ReminderId(reminderId);
    }
}
