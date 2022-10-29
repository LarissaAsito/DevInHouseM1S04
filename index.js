let contasClientes = []

const validarDados = (evento) => {
    /*if(evento.target.nome === '') {
        console.log(teste);
    }*/

    if(evento.target.senha.value === evento.target.confirmacao.value) {
        return true;
    }
    return false;

};

const handleSubmit = (evento) => {
    evento.preventDefault();
    if (validarDados(evento)) {
        const conta = {
            nome: evento.target.nome.value,
            cpf: evento.target.cpf.value,
            celular: evento.target.celular.value,
            senha: evento.target.senha.value,
            conta: Math.floor(1000 + Math.random() * 90000),
            saldo: 0
        };

        contasClientes.push(conta);
        alert(`Conta criada com sucesso! Número: ${conta.conta}`);
    }else {
        alert('Senhas diferentes.');
    }

};

const form = document.getElementById('form');
form.addEventListener('submit', handleSubmit);

// Operações

const trocarOperacao = (evento) => {
    const valor = document.getElementById('valor');
    valor.disabled = evento.target.value === 'SALDO';
    valor.required = evento.target.value !== 'SALDO';
};

const sacar = (evento) => {};
const depositar = (evento) => {};
const consultarSaldo = (evento) => {};

const validarConta = (conta, senha) => {
    const contaCliente = contasClientes.find((c) => c.conta === conta)

    if(contaCliente && contaCliente.senha === senha){
        return true;
    }

    return false;
}

const efetuarOperacao = (evento) => {
    evento.preventDefault();

    if(validarConta(parseInt(evento.target.conta.value), evento.target.senha.value))
    {
        switch(evento.target.operacao.value){
            case 'SAQUE':
                sacar();
                break;
            case 'DEPOSITO':
                depositar();
                break;
            case 'SAQUE':
                consultarSaldo();
                break;
            default: 
                alert('Operacao inválida!');
        }
    }else{
        alert('Dados inválidos da conta!');
    }
};

const operacao = document.getElementById('operacao');
operacao.addEventListener('change', trocarOperacao);

const formAcoes = document.getElementById('form-acoes');
operacao.addEventListener('submit', trocarOperacao);
