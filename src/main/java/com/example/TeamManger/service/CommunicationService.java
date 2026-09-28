package com.example.TeamManger.service;

import com.example.TeamManger.entity.ChannelType;
import com.example.TeamManger.entity.CommunicationLog;
import com.example.TeamManger.entity.Role;
import com.example.TeamManger.entity.Users;
import com.example.TeamManger.repository.CommunicationLogRepository;
import com.example.TeamManger.repository.Userrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommunicationService {

    @Autowired
    private CommunicationLogRepository communicationLogRepository;

    @Autowired
    private Userrepository userRepository;

    public void sendMessage(String username, ChannelType type, Long teamId, String content) {
        Users user = userRepository.findByUserName(username);
        if (user == null) {
            // Also try email since username might map to email in spring security
            user = userRepository.findByEmail(username);
        }
        
        if (user == null) {
            throw new SecurityException("User not found");
        }

        if (type == ChannelType.LEAD_GLOBAL) {
            if (user.getRole() != Role.TEAM_LEAD && user.getRole() != Role.PROJECT_MANAGER && user.getRole() != Role.ADMIN) {
                throw new SecurityException("Unauthorized: Only Leads can access global chat");
            }
        } else if (type == ChannelType.INTER_TEAM) {
            if (user.getTeam() == null || !user.getTeam().getId().equals(teamId)) {
                // If they don't belong to the team, check if they have admin/PM role as a fallback, or strictly throw
                // Prompt: "check if the user belongs to the provided teamId or is the Team Lead of that team."
                // Wait, if they are the Team Lead of that team, their teamId WOULD BE that teamId, presumably.
                // We'll just check if their teamId matches the requested teamId.
                throw new SecurityException("Unauthorized: You do not belong to this team");
            }
        }

        CommunicationLog log = new CommunicationLog();
        log.setSender(user);
        log.setChannelType(type);
        log.setTeamId(type == ChannelType.INTER_TEAM ? teamId : null);
        log.setContent(content);
        communicationLogRepository.save(log);
    }
}
