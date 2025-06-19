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

import TCC.Trabalho.TCC.V.de.Vigilancia.Model.demandaApoiadorModel;
import TCC.Trabalho.TCC.V.de.Vigilancia.Service.demandaApoiadorService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping ("tcc/demanda_apoiador")

public class demandaApoiadorController {
    @Autowired 
    private demandaApoiadorService service;

    @GetMapping
    public List<demandaApoiadorModel> bsucar(){
        return service.buscar();
    }

    @GetMapping("/{id}")
    public ResponseEntity <demandaApoiadorModel> buscarPorId(@PathVariable Long id){
        return service.buscarPorID(id).map(ResponseEntity :: ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public demandaApoiadorModel adicionarDemanda(@RequestBody demandaApoiadorModel demanda){
        return service.adicionar(demanda);
    }

    @PutMapping("/{id}")
    public ResponseEntity <demandaApoiadorModel> editarDemanda(@RequestBody demandaApoiadorModel demanda, @PathVariable Long id){
        if (!service.buscarPorID(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }

        demanda.setId(id);
        return ResponseEntity.ok(service.adicionar(demanda));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity <Void> excluirDemanda(@PathVariable Long id){
        if (!service.buscarPorID(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
