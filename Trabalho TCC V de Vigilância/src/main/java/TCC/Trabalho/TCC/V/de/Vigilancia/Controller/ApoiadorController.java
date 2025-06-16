package TCC.Trabalho.TCC.V.de.Vigilancia.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import TCC.Trabalho.TCC.V.de.Vigilancia.Model.Apoiador.ApoiadorModel;
import TCC.Trabalho.TCC.V.de.Vigilancia.Service.ApoiadorService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("tcc/apoiadores")

public class ApoiadorController {

    @Autowired
    private ApoiadorService service;

    @GetMapping
    public List <ApoiadorModel> listarApoiadores(){
        return service.listarApoiadores();
    }

    @GetMapping("/{id}")
    public ResponseEntity <ApoiadorModel> buscarApoiadoreID(@PathVariable Long id){
        return service.buscarApoiadoresPeloID(id).map(ResponseEntity :: ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ApoiadorModel cadastroApoiador(@RequestBody ApoiadorModel apoiador){
        return service.salvarApoiador(apoiador);
    }

    @PutMapping("/{id}")
    public ResponseEntity <ApoiadorModel> editar(@RequestBody ApoiadorModel apoiador, @PathVariable Long id){
            if (!service.buscarApoiadoresPeloID(id).isPresent()) {
                return ResponseEntity.notFound().build();
            }
        apoiador.setId(id);;
        return ResponseEntity.ok(service.salvarApoiador(apoiador));
    }
}
