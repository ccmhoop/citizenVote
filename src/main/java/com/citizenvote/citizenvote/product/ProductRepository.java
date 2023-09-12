package com.citizenvote.citizenvote.product;

import com.citizenvote.citizenvote.imageData.ImageData;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {

    Optional<Product> findById(Long id);

}
