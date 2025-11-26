package mytask.repository;



import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import mytask.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    Optional<User> findByUsernameAndPassword(String username, String password);
}
