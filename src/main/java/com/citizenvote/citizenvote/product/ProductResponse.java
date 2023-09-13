
package com.citizenvote.citizenvote.product;


import lombok.*;

import java.util.ArrayList;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductResponse {

 private Long id;

 private String name;

 private ArrayList<String> image;

}
