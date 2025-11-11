package mytask.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mytask.entity.Reminder;
import mytask.entity.User;

@Repository
public interface ReminderRepository extends JpaRepository<Reminder, Integer> {
	List<Reminder> findAllByNotificationTimeBeforeAndCompletedFalse(LocalDateTime time);

}
