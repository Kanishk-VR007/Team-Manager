package com.example.TeamManger.repository;

import com.example.TeamManger.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface Userrepository extends JpaRepository<Users,Long>{
    public Boolean existsByEmail(String Email);
    public Users findByEmail(String Email);
    Optional<Users> findByGithubLinkContaining(String githubUsername);
    public Users findByUserName(String userName);
}
