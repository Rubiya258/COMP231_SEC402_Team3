package mytask;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class TaskAppBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(TaskAppBackendApplication.class, args);
		System.out.println("Spring Boot MVC JPA app is ready Practice test...");
	}

}
