package com.citizenvote.citizenvote.projects;
import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;
import lombok.Singular;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Builder
@Getter
public class ProjectDTO {
    @NonNull
    private final String title;
    @NonNull
    private final ProjectCategory category;
    @NonNull
    private final ProjectProgress progress;

    @NonNull
    @Singular
    private final Set<AnswerDTO> answers;
    @NonNull
    private final String referenceToBook;
    @NonNull
    @Singular
    private final Set<TagDTO> tags;

    public static class Mapper {
        public static QuestionDTO toDto(Question question) {
            return QuestionDTO.builder()
                    .type(question.getType())
                    .title(question.getTitle())
                    .answers(AnswerDTO.Mapper.toDto(question.getAnswers()))
                    .referenceToBook(question.getReferenceToBook())
                    .tags(TagDTO.Mapper.toDto(question.getTags()))
                    .build();
        }

        public static List<QuestionDTO> toDto(List<Question> questions) {
            return questions.stream().map(Mapper::toDto).collect(Collectors.toList());
        }
    }
}


