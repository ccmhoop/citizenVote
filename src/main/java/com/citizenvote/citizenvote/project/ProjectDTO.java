package com.citizenvote.citizenvote.project;

import java.time.LocalDate;

public record ProjectDTO(String title, String description, Integer requiredVotes, Integer amountVotes,
                         LocalDate startDate, LocalDate endDate, ProjectProgress progress, ProjectCategory category) {


}
