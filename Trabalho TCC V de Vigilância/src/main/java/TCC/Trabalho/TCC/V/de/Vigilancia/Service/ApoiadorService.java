package TCC.Trabalho.TCC.V.de.Vigilancia.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import TCC.Trabalho.TCC.V.de.Vigilancia.Model.Apoiador.ApoiadorModel;
import TCC.Trabalho.TCC.V.de.Vigilancia.Repository.ApoiadorRepository;

@Service
public class ApoiadorService {

    @Autowired
    private ApoiadorRepository repository;

    public List <ApoiadorModel> listarApoiadores(){
       return repository.findAll();
    }

    public Optional <ApoiadorModel> buscarApoiadoresPeloID(Long id){
        return repository.findById(id);
    }

    public ApoiadorModel salvarApoiador(ApoiadorModel apoiador){
        return repository.save(apoiador);
    }

    public void deletarApoiador(Long id){
        repository.deleteById(id);
    }
}
