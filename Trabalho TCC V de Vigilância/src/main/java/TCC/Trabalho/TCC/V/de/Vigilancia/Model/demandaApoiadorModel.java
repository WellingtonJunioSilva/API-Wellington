package TCC.Trabalho.TCC.V.de.Vigilancia.Model;

import jakarta.persistence.Entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import TCC.Trabalho.TCC.V.de.Vigilancia.Model.Apoiador.ApoiadorModel;
import TCC.Trabalho.TCC.V.de.Vigilancia.Model.Demanda_Produtor.statusDemanda;
import jakarta.persistence.*;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "demandaApoiador")
@Getter
@Setter
@NoArgsConstructor

public class demandaApoiadorModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 250)
    private String titulo;

    @Column (nullable = false)
    private String descricao;

    @Column(nullable = false)
    private String cidade;

    @Column (nullable = false)
    private String estado;

    @Column(nullable = false)
    private LocalDateTime dataPostagem;

    @Column(nullable = false)
    private LocalDate validade_oferta;

    @Enumerated(EnumType.STRING)
    private statusDemanda status;

    

}
