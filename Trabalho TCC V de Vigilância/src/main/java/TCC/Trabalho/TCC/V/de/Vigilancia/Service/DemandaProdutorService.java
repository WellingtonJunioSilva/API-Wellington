package TCC.Trabalho.TCC.V.de.Vigilancia.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import TCC.Trabalho.TCC.V.de.Vigilancia.Model.Demanda_Produtor.DemandaProdutorModel;
import TCC.Trabalho.TCC.V.de.Vigilancia.Repository.DemandaProdutorRepository;

@Service
public class DemandaProdutorService {
    @Autowired
    private DemandaProdutorRepository repository;

    public List<DemandaProdutorModel> buscarDemandasProd(){
        return repository.findAll();
    }

    public Optional <DemandaProdutorModel> buscarDemandaId(Long id){
        return repository.findById(id);
    }

    public DemandaProdutorModel cadastrarDemandar(DemandaProdutorModel demandaProdutor){
        return repository.save(demandaProdutor);
    }

    public void excluirDemanda(Long id){
         repository.deleteById(id);
    }


}
