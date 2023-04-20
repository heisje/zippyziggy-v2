package com.zippyziggy.prompt.prompt.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
@Getter
@AllArgsConstructor
public class OriginerResponse {
	private String originerId;
	private String originerImg;
	private String originerNickname;
}
