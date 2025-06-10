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

import TCC.Trabalho.TCC.V.de.Vigilancia.Model.ProdutorModel;
import TCC.Trabalho.TCC.V.de.Vigilancia.Service.ProdutorService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("tcc/produtores")

public class ProdutorController {
    @Autowired
    private ProdutorService service;

    @GetMapping
    public List <ProdutorModel> listarProdutores(){
        return service.listarProdutores();
    }

    @GetMapping("/{id}")
    public ResponseEntity <ProdutorModel> buscarProdutoresPorID(@PathVariable Long id){
        return service.buscarProdutorPorID(id).map(ResponseEntity :: ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ProdutorModel salvarProdutores (@RequestBody ProdutorModel produtor){
        return service.salvarProdutor(produtor);
    }

    @PutMapping("/{id}")
    public ResponseEntity <ProdutorModel> editarDadosProdutor(@RequestBody ProdutorModel produtor, @PathVariable Long id){
        if(!service.buscarProdutorPorID(id).isPresent()){
            return ResponseEntity.notFound().build();
        }
        produtor.setId(id);
        return ResponseEntity.ok(service.salvarProdutor(produtor));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity <Void> deletarProdutores (@PathVariable Long id){
        if(!service.buscarProdutorPorID(id).isPresent()){
            return ResponseEntity.notFound().build();
        }
        service.deletarProdutor(id);
        return ResponseEntity.noContent().build();
    }
}
