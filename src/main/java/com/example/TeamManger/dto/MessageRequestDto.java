package com.example.TeamManger.dto;

import com.example.TeamManger.entity.ChannelType;

public class MessageRequestDto {
    private ChannelType channelType;
    private Long teamId;
    private String content;

    public ChannelType getChannelType() {
        return channelType;
    }

    public void setChannelType(ChannelType channelType) {
        this.channelType = channelType;
    }

    public Long getTeamId() {
        return teamId;
    }

    public void setTeamId(Long teamId) {
        this.teamId = teamId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
