package TCC.Trabalho.TCC.V.de.Vigilancia.Model.Apoiador;

public enum TipoApoiador {
    PESSOA_FISICA ("Pessoa Física"),
    ONG ("ONG"),
    EMPRESAS_COMERCIO ("Empresas/Comércio"),
    PARCEIRO_CONVENIADO ("Parceiro Conveniado");

    private final String tipoApoiador;

    TipoApoiador(String tipoApoiador){
        this.tipoApoiador = tipoApoiador;
    }

    public String getTipoApoiador(){
        return tipoApoiador;
    }

    
}
