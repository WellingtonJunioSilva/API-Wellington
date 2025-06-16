package TCC.Trabalho.TCC.V.de.Vigilancia.Model.Demanda_Produtor;

public enum Categoria_Demanda {

    GRAOS ("Grãos"),
    FEIJOES_RAIZES ("Feijões e Raízes"),
    FRUTAS_HORTALICAS ("Frutas e Hortaliças"),
    VERDURAS_ERVAS ("Verduras e Ervas"),
    OUTROS ("Outros");

    private final String categoriaDemanda;

    Categoria_Demanda(String categoriaDemanda){
        this.categoriaDemanda = categoriaDemanda;
    }

}
