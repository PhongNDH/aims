package org.example.aims.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.example.aims.entities.DVDs;
import org.example.aims.exception.ResourceNotFoundException;
import org.example.aims.repository.DvdRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
public class DvdServiceImpl {
    @Autowired
    private final DvdRepository dvdrepository;


    public void addDVD(DVDs dvd) {
        dvdrepository.customInsert(dvd.getId(),
                dvd.getDiscType(),
                dvd.getDirector(),
                dvd.getRuntime(),
                dvd.getStudio(),
                dvd.getLanguage(),
                dvd.getSubtitles(),
                dvd.getReleaseDate().toString());
    }

    public List<DVDs> getDVDsByTitleContaining(String title) {
        return dvdrepository.findByTitleContaining(title);
    }

    public DVDs getDVDById(int id) {
        return dvdrepository.findById(id).orElse(null);
    }

    public List<DVDs> getAllDVDs() {
        return dvdrepository.findAll();
    }

    public DVDs updateDVD(int id, DVDs dvd) {
        DVDs dvds = dvdrepository.findById(id).orElse(null);
        if (dvds != null) {
            dvds.setDiscType(dvd.getDiscType());
            dvds.setDirector(dvd.getDirector());
            dvds.setRuntime(dvd.getRuntime());
            dvds.setStudio(dvd.getStudio());
            dvds.setLanguage(dvd.getLanguage());
            dvds.setSubtitles(dvd.getSubtitles());
            dvds.setReleaseDate(dvd.getReleaseDate());
            return dvdrepository.save(dvds);
        }
        else {
            throw new ResourceNotFoundException("DVD not found with id " + id);
        }
    }

    public void deleteDVD(int id) {
        dvdrepository.deleteById(id);
    }
}
