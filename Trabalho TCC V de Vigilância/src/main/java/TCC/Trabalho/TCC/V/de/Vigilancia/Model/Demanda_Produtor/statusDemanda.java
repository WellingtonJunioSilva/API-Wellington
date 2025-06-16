package TCC.Trabalho.TCC.V.de.Vigilancia.Model.Demanda_Produtor;

public enum statusDemanda {

    ABERTA ("Aberta"),
    FECHADA ("Fechada");

    private String status;

    statusDemanda (String status){
        this.status = status;
    }
}
