package mytask.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import mytask.entity.Notification;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
	List<Notification> findByReminderId(Long reminderId);

}
