package TCC.Trabalho.TCC.V.de.Vigilancia.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import TCC.Trabalho.TCC.V.de.Vigilancia.Model.ProdutorModel;
import TCC.Trabalho.TCC.V.de.Vigilancia.Repository.ProdutorRepository;

@Service
public class ProdutorService {
    @Autowired
    private ProdutorRepository repository;

    public List<ProdutorModel> listarProdutores(){
        return repository.findAll();
    }

    public Optional <ProdutorModel> buscarProdutorPorID(Long id){
        return repository.findById(id);
    }

    public ProdutorModel salvarProdutor(ProdutorModel produtor){
        return repository.save(produtor);
    }

    public void deletarProdutor (Long id){
        repository.deleteById(id);
    }
}
