package TCC.Trabalho.TCC.V.de.Vigilancia.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.*;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Produtor")
@Getter
@Setter
@NoArgsConstructor

public class ProdutorModel {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 200, nullable = false)
    private String nome;

    @Column(length = 11, nullable = false, unique = true)
    private String documento;

    @Column (nullable = false, length = 60)
    private String cidade;

    @Column(length = 60, nullable = false)
    private String estado;

    @Lob
    @Column(nullable = false)
    private String biografia;

    @Lob
    @Column(nullable = false)
    private String fotoPerfil;
}
