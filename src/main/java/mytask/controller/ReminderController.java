package mytask.controller;

import mytask.entity.Reminder;
import mytask.entity.User;
import mytask.repository.ReminderRepository;
import mytask.repository.UserRepository;
import mytask.repository.NotificationRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/reminders")
@CrossOrigin(origins = "*")
public class ReminderController {

    @Autowired
    private ReminderRepository reminderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @PostMapping("/add")
    public Reminder createReminder(@RequestBody Map<String, Object> body) {

        Number userIdNum = (Number) body.get("user_id");
        int userId = userIdNum.intValue();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Reminder reminder = new Reminder();
        reminder.setUser(user);
        reminder.setTitle((String) body.get("title"));
        reminder.setDescription((String) body.get("description"));

        String time = (String) body.get("notificationTime");
        if (time != null && !time.isEmpty()) {
            reminder.setNotificationTime(LocalDateTime.parse(time));
        }

        Boolean completed = (Boolean) body.get("completed");
        reminder.setCompleted(completed != null && completed);

        return reminderRepository.save(reminder);
    }

    @GetMapping("/user/{userId}")
    public List<Reminder> getRemindersByUser(@PathVariable int userId) {
        return reminderRepository.findByUser_UserId(userId);
    }

    @GetMapping("/get/{id}")
    public Reminder getById(@PathVariable int id) {
        return reminderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reminder not found"));
    }

    @PutMapping("/update/{id}")
    public Reminder updateReminder(@PathVariable int id, @RequestBody Reminder updated) {
        Reminder existing = reminderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reminder not found"));

        existing.setTitle(updated.getTitle());
        existing.setDescription(updated.getDescription());
        existing.setNotificationTime(updated.getNotificationTime());
        existing.setCompleted(updated.isCompleted());

        return reminderRepository.save(existing);
    }

    @Transactional
    @DeleteMapping("/delete/{id}")
    public String deleteReminder(@PathVariable int id) {

        notificationRepository.deleteByReminder_ReminderId((long) id);
        reminderRepository.deleteById(id);

        return "Deleted";
    }

    // For popup notifications
    
    @GetMapping("/due")
    public List<Reminder> getDueReminders() {
        LocalDateTime now = LocalDateTime.now();
        return reminderRepository.findAllByNotificationTimeBeforeAndCompletedFalse(now);
    }
    
    @GetMapping("/overdue/{userId}")
    public List<Reminder> getOverdueReminders(@PathVariable int userId) {
        LocalDateTime now = LocalDateTime.now();
        return reminderRepository.findByUser_UserIdAndNotificationTimeBeforeAndCompletedFalse(userId, now);
    }

}
