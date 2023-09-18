package com.citizenvote.citizenvote.imageData;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ImageDataRepository<T extends ImageData> extends JpaRepository<T,Long> {
    Optional<T> findById(Long id);
    Optional<ImageData> findByUrlContaining(String url);

}
