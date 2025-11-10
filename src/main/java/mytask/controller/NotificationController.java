package mytask.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import mytask.service.NotificationValidator;
import mytask.entity.Notification;
import mytask.repository.NotificationRepository;
import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationController {
	@Autowired
    private NotificationRepository notificationRepository;

    @PostMapping
    public Notification createNotification(@RequestBody Notification notification) {
        NotificationValidator.validate(notification);
        return notificationRepository.save(notification);
    }

    @PutMapping("/{id}")
    public Notification updateNotification(@PathVariable Long id, @RequestBody Notification notification) {
        NotificationValidator.validate(notification);
        notification.setId(id);
        return notificationRepository.save(notification);
    }

    @GetMapping("/reminder/{reminderId}")
    public List<Notification> getNotificationsByReminder(@PathVariable Long reminderId) {
        return notificationRepository.findByReminderId(reminderId);
    }
}
