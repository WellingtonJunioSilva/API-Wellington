package TCC.Trabalho.TCC.V.de.Vigilancia.Model.Demanda_Produtor;

import java.time.LocalDateTime;

import TCC.Trabalho.TCC.V.de.Vigilancia.Model.ProdutorModel;
import jakarta.persistence.*;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "demandaProdutor")
@Getter
@Setter
@NoArgsConstructor

public class DemandaProdutorModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "idProdutor", nullable = false)
    private ProdutorModel produtor;

    @Column(nullable = false)
    private String titulo;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Categoria_Demanda categoria;

    @Column(nullable = false)
    private LocalDateTime dataPostagem;

    @Enumerated(EnumType.STRING)
    private statusDemanda status;

    @Column (nullable = false)
    private String cidade;

    @Column (nullable = false)
    private String estado;




}
