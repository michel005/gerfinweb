package com.michel.gerfinweb.model;

import com.michel.gerfinweb.entity.Template;

import lombok.Data;

@Data
public class SimpleTemplateModel {
	
	private Long id;
	private String description;
	private Integer dueDay;
	
	public SimpleTemplateModel(Template template) {
		this.id = template.getId();
		this.description = template.getDescription();
		this.dueDay = template.getDueDay();
	}

}