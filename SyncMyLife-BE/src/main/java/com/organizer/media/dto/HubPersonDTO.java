package com.organizer.media.dto;

import lombok.Data;

@Data
public class HubPersonDTO {
    private Integer id;
    private String imgUrl;
    private String name;
    private String pseudoName;
    private String birthday;
    private String details;
}
