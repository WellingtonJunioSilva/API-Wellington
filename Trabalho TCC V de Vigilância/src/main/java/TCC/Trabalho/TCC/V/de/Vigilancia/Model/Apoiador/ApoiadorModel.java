package TCC.Trabalho.TCC.V.de.Vigilancia.Model.Apoiador;


import org.springframework.beans.factory.annotation.Autowired;

import TCC.Trabalho.TCC.V.de.Vigilancia.Service.ApoiadorService;
import jakarta.persistence.*;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Apoiador")
@Getter
@Setter
@NoArgsConstructor

public class ApoiadorModel {
    @Autowired
    private ApoiadorService service;

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (nullable = false, length = 100)
    private String nome; 

    @Enumerated(EnumType.STRING)
    @Column (nullable = false)
    private TipoApoiador tipo;

    @Column(nullable= false)
    private String contato;

    @Column
    private String foto;

    @Column(nullable = false)
    private String documento;

    @Column(nullable = false, length = 60)
    private String cidade;

    @Column(nullable = false, length = 60)
    private String estado;
}
