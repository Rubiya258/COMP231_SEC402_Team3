package mytask.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import mytask.service.NotificationService;


import mytask.entity.Reminder;
import mytask.service.ReminderService;

@RestController
@RequestMapping("/api/reminders")
@CrossOrigin(origins = "*")
public class ReminderController {
	@Autowired
    private ReminderService reminderService;

    
    @PostMapping("/add")
    public Reminder createReminder(@RequestBody Reminder reminder) {
        return reminderService.saveReminder(reminder);
    }

    
    @GetMapping("/all")
    public List<Reminder> getAllReminders() {
        return reminderService.getAllReminders();
    }

   
    @PutMapping("/update/{id}")
    public Reminder updateReminder(@PathVariable int id, @RequestBody Reminder reminder) {
        return reminderService.updateReminder(id, reminder);
    }

   
    @DeleteMapping("/delete/{id}")
    public String deleteReminder(@PathVariable int id) {
        reminderService.deleteReminder(id);
        return "Reminder deleted successfully!";
    }
    
    @Autowired
    private NotificationService notificationService;

    @GetMapping("/run-notifications")
    public String runNotificationsNow() {
        int processed = notificationService.runDueReminderCycle();
        return "Processed " + processed + " due reminders.";
    }
}
