package com.citizenvote.citizenvote.imageData;

import com.citizenvote.citizenvote.product.Product;
import com.citizenvote.citizenvote.project.Project;
import com.citizenvote.citizenvote.product.ProductRepository;
import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Optional;

@Service
public class ImageDataService {
    @Autowired
    private ImageDataRepository imageDataRepository;

    @Autowired
    private ProductRepository productRepository;


//    public String uploadImage(MultipartFile[] files, Object object) throws IOException {
//        Long objectId = object instanceof Product ? ((Product) object).getId() : ((Project) object).getId();
//        for (MultipartFile image : files) {
//            ImageData imageData = object instanceof Project ? new ProjectImageData() : new ProductImageData();
//            imageData.setName(image.getOriginalFilename());
//            imageData.setType(image.getContentType());
//            imageData.setImageData(ImageDataUtils.compressImage(image.getBytes()));
//            imageData.setUrl("http://localhost:8080/api/v1/auth/auth/image/" + objectId);
//            imageData.setLink(object);
//            imageDataRepository.save(imageData);
//        }
//        return "Saved";
//    }


    public ImageData setImageData(Object object){
        if (object instanceof Product){
            return new ProductImageData();
        } else if (object instanceof Project) {
            return new ProjectImageData();
        }
        return null;
    }
    public Long setObjectId(Object object){
        if (object instanceof Product){
            return  ((Product) object).getId();
        } else if (object instanceof Project) {
            return  ((Project) object).getId();
        }
        return null;
    }

    public MultipartFile seedImage(String path) throws IOException {
        File imageFile = new File(path);
        String name = "image";
        String originalFilename = imageFile.getName();
        String contentType = Files.probeContentType(imageFile.toPath());
        byte[] content = Files.readAllBytes(imageFile.toPath());
        return new MultipartImage(name, originalFilename, contentType, content);
    }

public String uploadImage(MultipartFile[] files, Object object,String type) throws IOException {
        Long objectId = setObjectId(object);
        int count = 1;
        for (MultipartFile image : files) {
            ImageData imageData = setImageData(object);
            imageData.setName(image.getOriginalFilename());
            imageData.setType(image.getContentType());
            imageData.setImageData(ImageDataUtils.compressImage(image.getBytes()));
            imageData.setUrl("http://localhost:8080/api/v1/auth/auth/image/"+type+"/"+objectId+count++);
            imageData.setLink(object);
            imageDataRepository.save(imageData);
        }
        return "Saved";
    }

        @Transactional
        public byte[] downloadImage (String type,String objectId){
            Optional<ImageData> dbImageData = imageDataRepository.findByUrlContaining(
                    "http://localhost:8080/api/v1/auth/auth/image/"+type+"/"+objectId);
            return ImageDataUtils.decompressImage(dbImageData.get().getImageData());
        }
    }

