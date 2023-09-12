package com.citizenvote.citizenvote.imageData;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ImageDataRepository extends JpaRepository<ImageData,Long> {

    List<ImageData> findAll();
    Optional<ImageData> findByName(String fileName);
    Optional<ImageData> findById(Long id);

}
