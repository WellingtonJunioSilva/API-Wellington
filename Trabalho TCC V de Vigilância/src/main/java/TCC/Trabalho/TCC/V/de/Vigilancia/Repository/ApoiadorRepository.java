package TCC.Trabalho.TCC.V.de.Vigilancia.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import TCC.Trabalho.TCC.V.de.Vigilancia.Model.Apoiador.ApoiadorModel;

@Repository
public interface ApoiadorRepository extends JpaRepository <ApoiadorModel, Long>{
}
