package mytask.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import mytask.entity.Reminder;
import mytask.repository.ReminderRepository;

@Service
public class NotificationService {

    @Autowired
    private ReminderRepository reminderRepository;

    // Automatically runs every 60 seconds
    @Scheduled(fixedRate = 60_000)
    public void checkNotifications() {
        runDueReminderCycle();
    }

    // Manual run (also used by Hasan's controller endpoint)
    public int runDueReminderCycle() {
        LocalDateTime now = LocalDateTime.now();
        System.out.println("🕒 Current system time (JVM): " + now);

        List<Reminder> due = reminderRepository
                .findAllByNotificationTimeBeforeAndCompletedFalse(now);

        int count = 0;

        for (Reminder r : due) {
            // Hasan's task: simulate notification
            System.out.println("🔔 Notification Triggered: " + getReminderTitle(r) + " - " + getReminderDescription(r));

            // Try to set last_triggered timestamp
            try {
                r.getClass().getMethod("setLastTriggered", LocalDateTime.class).invoke(r, now);
            } catch (Exception ignored) {
                System.out.println("⚠️ Could not update last_triggered for reminder");
            }

            // Sama's task: recurrence management
            String recur = null;
            try {
                recur = (String) r.getClass().getMethod("getRecurrenceType").invoke(r);
            } catch (Exception ignored) {
                // skip if missing
            }

            if (recur != null) recur = recur.trim().toLowerCase();

            boolean rescheduled = false;
            if ("daily".equals(recur)) {
                r.setNotificationTime(r.getNotificationTime().plusDays(1));
                rescheduled = true;
            } else if ("weekly".equals(recur)) {
                r.setNotificationTime(r.getNotificationTime().plusWeeks(1));
                rescheduled = true;
            } else if ("monthly".equals(recur)) {
                r.setNotificationTime(r.getNotificationTime().plusMonths(1));
                rescheduled = true;
            }

            if (rescheduled) {
                r.setCompleted(false);
            } else {
                r.setCompleted(true);
            }

            reminderRepository.save(r);
            count++;
        }

        return count;
    }

    // --- Helper methods ---
    private String getReminderTitle(Reminder r) {
        try {
            return (String) r.getClass().getMethod("getTitle").invoke(r);
        } catch (Exception e) {
            return "(unknown title)";
        }
    }

    private String getReminderDescription(Reminder r) {
        try {
            return (String) r.getClass().getMethod("getDescription").invoke(r);
        } catch (Exception e) {
            return "(no description)";
        }
    }
}
