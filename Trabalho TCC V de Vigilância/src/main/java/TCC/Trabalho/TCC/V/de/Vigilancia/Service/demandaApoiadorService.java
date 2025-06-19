package TCC.Trabalho.TCC.V.de.Vigilancia.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import TCC.Trabalho.TCC.V.de.Vigilancia.Model.demandaApoiadorModel;
import TCC.Trabalho.TCC.V.de.Vigilancia.Repository.demandaApoiadorRepository;

@Service
public class demandaApoiadorService {
    @Autowired
    private demandaApoiadorRepository repository;

    public List<demandaApoiadorModel> buscar(){
        return repository.findAll();
    }

    public Optional <demandaApoiadorModel> buscarPorID(Long id){
        return repository.findById(id);
    }

    public demandaApoiadorModel adicionar(demandaApoiadorModel demanda){
        return repository.save(demanda);
    }

    public void excluir (Long id){
        repository.deleteById(id);
    }

}
