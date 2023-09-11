package com.citizenvote.citizenvote.imageData;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ImageDataRepository extends JpaRepository<ImageData,Long> {

    List<ImageData> findAll();
    Optional<ImageData> findByName(String fileName);
    Optional<ImageData> findById(Long id);

}
