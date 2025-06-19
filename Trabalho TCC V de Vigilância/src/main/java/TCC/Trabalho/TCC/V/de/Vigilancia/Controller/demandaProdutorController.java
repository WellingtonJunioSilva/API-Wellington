package TCC.Trabalho.TCC.V.de.Vigilancia.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import TCC.Trabalho.TCC.V.de.Vigilancia.Model.Demanda_Produtor.DemandaProdutorModel;
import TCC.Trabalho.TCC.V.de.Vigilancia.Service.DemandaProdutorService;
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("tcc/demanda_produtor")
public class demandaProdutorController {
    @Autowired 
    private DemandaProdutorService service;

    @GetMapping
    public List<DemandaProdutorModel> buscar (){
        return service.buscarDemandasProd();
    }

    @GetMapping("/{id}")
    public ResponseEntity <DemandaProdutorModel> buscarPorID(@PathVariable Long id){
        return service.buscarDemandaId(id).map(ResponseEntity :: ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public DemandaProdutorModel adicionarDemandaProd(@RequestBody DemandaProdutorModel demanda){
        return service.cadastrarDemandar(demanda);
    }

    @PutMapping ("/{id}")
    public ResponseEntity <DemandaProdutorModel> editarDemanda(@PathVariable Long id, @RequestBody DemandaProdutorModel demanda){
        if (!service.buscarDemandaId(id).isPresent()){
            return ResponseEntity.notFound().build();
        }

        demanda.setId(id);
        return ResponseEntity.ok(service.cadastrarDemandar(demanda));
    }

    @DeleteMapping ("/{id}")
    public ResponseEntity <Void> excluirDemanda(@PathVariable Long id){
         if (!service.buscarDemandaId(id).isPresent()){
            return ResponseEntity.notFound().build();
        }
        service.excluirDemanda(id);
        return ResponseEntity.noContent().build();
    }

    
}
