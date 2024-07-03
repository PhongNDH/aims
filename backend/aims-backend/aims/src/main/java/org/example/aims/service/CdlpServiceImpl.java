package org.example.aims.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.example.aims.entities.CDLPs;
import org.example.aims.exception.ResourceNotFoundException;
import org.example.aims.repository.CdlpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
public class CdlpServiceImpl {
    @Autowired
    private final CdlpRepository cdlprepository;

    public void addCDLPs(CDLPs cdlps) {
        cdlprepository.customInsert(
                cdlps.getId(),
                cdlps.getArtist(),
                cdlps.getRecordLabel(),
                cdlps.getTrackList()
        );
    }

    public List<CDLPs> getCDLPsByTitleContaining(String title) {
        return cdlprepository.findByTitleContaining(title);
    }

    public CDLPs getCDLPs(int id) {
        return cdlprepository.findById(id).orElse(null);
    }

    public List<CDLPs> getAllCDLPs() {
        return cdlprepository.findAll();
    }

    public CDLPs updateCDLPs(int id, CDLPs cdlps) {
        CDLPs cdlp = cdlprepository.findById(id).orElse(null);
        if (cdlp != null) {
            cdlp.setArtist(cdlps.getArtist());
            cdlp.setRecordLabel(cdlps.getRecordLabel());
            cdlp.setTrackList(cdlps.getTrackList());
            return cdlprepository.save(cdlp);
        }
        else {
            throw new ResourceNotFoundException("CDLP not found with id " + id);
        }
    }

    public void deleteCDLP(int id) {
        cdlprepository.deleteById(id);
    }

    public void deleteAllCDLPs() {
        cdlprepository.deleteAll();
    }
}
