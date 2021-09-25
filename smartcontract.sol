// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0 <0.9.0;

function calculaApolice(uint valor) pure returns(uint premio){
    uint inteiro;
    inteiro = valor;
    uint metade;
    metade = valor / 2;
    uint total = inteiro+metade;
    premio = total;
}

function calculaSinistro(uint valor) pure returns(uint sinistro){
    sinistro = valor;
}

contract seguradora{
    //instancia segurado sair,trocar lista segurado por um mapping,struct para um cliente,contador pra pagamentos,
    
    address private Seguradora = 0x42D367E725C8ca4E7110afa11Fb370d0faAB50cc;
    
    struct Segurado{
        address carteira;           //carteira utilizada pelo cliente      
        uint pagamentoPremio;       //contador de pagamentos efetuados pelo cliente
        uint recebimentoSinistro;   //contador de sinistralidade do cliente
        uint duracaoContrato;       //tempo de locação do contrato        
        bool ehSegurado;            //booleano para identificar se essa pessoa eh segurado ou não
        uint valorApolice;          //valor do seguro,calculado de acordo com o aluguel
        uint valorSinistro;         //valor do sinistro = valor do aluguel
        uint aluguel;               //valor do aluguel
        uint parcelasApolice;       //parcelas em que o segurado deseja pagar a apolice
    }
    
    mapping(uint => Segurado) listaSegurados;
    mapping(address => uint) listaCadastro;
    
    uint montanteSeguro = 0;
    uint montanteSeguradora = 0;
    uint contSegurado = 0;
    uint contTotal = 0;
    
    
    function contratarSeguro(uint duracaoContrato,uint aluguel,uint parcelas) public returns (uint cadastro){//contratarSeguro
        require(msg.sender != Seguradora);
        cadastro = contSegurado;
        Segurado memory novoSegurado = Segurado(msg.sender,0,0,duracaoContrato,true,calculaApolice(aluguel),calculaSinistro(aluguel),aluguel,parcelas);
        
        listaSegurados[contSegurado] = novoSegurado;
        listaCadastro[msg.sender] = contSegurado;
        contSegurado++;
        contTotal++;
        return(cadastro);
    }
    //usar a carteira como identificacao
    function pagarPremio() public payable{
        require(msg.sender != Seguradora);
        uint cadastro = listaCadastro[msg.sender];
        Segurado storage aux = listaSegurados[cadastro];
        require(aux.ehSegurado == true && aux.carteira == msg.sender,"Instruso");
        require(aux.pagamentoPremio < aux.parcelasApolice,"Ja efetuou todos os pagamentos");
        
        uint premioParcelado;
        premioParcelado = aux.valorApolice / aux.parcelasApolice;
        
        uint seg1;
        uint seg2;
        seg1 = premioParcelado * 30;
        seg2 = seg1 / 100;//taxa fixa mensal da seguradora
        
        uint premioParcelado1;
        premioParcelado1 = premioParcelado - seg2;//valor que vai pro pool.
        
        montanteSeguro = montanteSeguro + premioParcelado1;
        montanteSeguradora = montanteSeguradora + seg2;
        aux.pagamentoPremio++;

    }
    function receberSinistro(uint cadastro) public payable{
        require(msg.sender == Seguradora);
        
        Segurado storage aux = listaSegurados[cadastro];
        require(aux.ehSegurado == true);
        require(montanteSeguro >=aux.valorSinistro,"Sem dinheiro no montante");       
        montanteSeguro = montanteSeguro - aux.valorSinistro;
        aux.recebimentoSinistro++;
        aux.ehSegurado = false;
        contTotal--;
    }

    function getDados(uint cadastro) public view returns (
        address carteira, uint pagamentos, uint recebimentoSinistro, uint duracaoContrato,bool ehSegurado,uint valorApolice,uint ParcelaPremio,uint valorSinistro,uint aluguel,uint parcelasApolice
    ) {
        require(msg.sender == Seguradora);
        Segurado storage aux = listaSegurados[cadastro];
        uint premioParcelado;
        premioParcelado = aux.valorApolice / aux.parcelasApolice;
        return (
            aux.carteira,
            aux.pagamentoPremio,
            aux.recebimentoSinistro,
            aux.duracaoContrato,
            aux.ehSegurado,
            aux.valorApolice,
            premioParcelado,
            aux.valorSinistro,
            aux.aluguel,
            aux.parcelasApolice
        );
    }
    function getInformacao() public view returns (
         address,uint,uint,uint,uint
    ) {
        uint cadastro = listaCadastro[msg.sender];
        Segurado storage aux = listaSegurados[cadastro];
        uint premioParcelado;
        premioParcelado = aux.valorApolice / aux.parcelasApolice;
        return (
            aux.carteira,
            aux.pagamentoPremio,
            aux.valorApolice,
            premioParcelado,
            aux.parcelasApolice
        );
    }
    function getMontante() public view returns (
        uint,uint,uint
    ) {
        require(msg.sender == Seguradora);
        
        return (
            montanteSeguradora,
            montanteSeguro,
            contTotal
        );
    }
    
    function devolucao() public view returns(uint dinheiroDevolvido){
        require(msg.sender == Seguradora);
        dinheiroDevolvido = montanteSeguro / contTotal;
        
        return(dinheiroDevolvido);
    }
}

//tempo de contrato altera a apolice.
//Sim,a apolice eh anual.
//mensalmente a seguradora pega sua parte,ou ela recolhe no final do pool
//seguradora retira seu ganho mensalmente.
//resseguro como ocorre
//uma porcentagem do pool aciona o resseguro
//pagar sinistro->proprietario ou segurado


//adicionar parcelas->cliente decide em quantas parcelas ele paga
//pegar lucro individual no mes.->montanteSeguro montante Seguradora


//devoluçao
//resseguro
