package mytask.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mytask.entity.Reminder;
import mytask.entity.User;
import mytask.repository.ReminderRepository;

@Service
public class ReminderService {
	@Autowired
    private ReminderRepository reminderRepository;

    public Reminder saveReminder(Reminder reminder) {
        return reminderRepository.save(reminder);
    }

    public List<Reminder> getAllReminders() {
        return reminderRepository.findAll();
    }

    public Reminder updateReminder(int id, Reminder reminder) {
        Reminder existing = reminderRepository.findById(id).orElseThrow();
        existing.setTitle(reminder.getTitle());
        existing.setDescription(reminder.getDescription());
        existing.setNotificationTime(reminder.getNotificationTime());
        existing.setCompleted(reminder.isCompleted());
        return reminderRepository.save(existing);
    }

    public void deleteReminder(int id) {
        reminderRepository.deleteById(id);
    }
}
