package com.citizenvote.citizenvote.product;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.annotation.Nullable;
import lombok.*;

import java.util.ArrayList;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Nullable
@Builder
public class ProductResponse {

    private String id;

    private String name;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String description;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String category;

    private String points;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private ArrayList<String> image;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String labelImage;
}
