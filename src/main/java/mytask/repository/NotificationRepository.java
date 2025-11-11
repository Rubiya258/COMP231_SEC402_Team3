package mytask.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import mytask.entity.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByReminder_ReminderId(Long reminderId);
}

