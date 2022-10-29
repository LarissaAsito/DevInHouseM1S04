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
        document.getElementById('alerta').innerText = `Conta criada com sucesso! Número: ${conta.conta}`;
        //alert(`Conta criada com sucesso! Número: ${conta.conta}`);
    }else {
        document.getElementById('alerta').innerText = 'Senhas diferentes.';
        //alert('Senhas diferentes.');
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

const obterConta = (conta) => {
    const contaCliente = contasClientes.find((c) => c.conta === conta)
    return contaCliente;
}

const sacar = (conta, valor) => {
    if(validarValor(valor)){

        if(validarSaldo(conta, valor)){
            let saldoAtual
            const contasAtualizadas = contasClientes.map((c)=> {
                if(c.conta === conta){
                    saldoAtual = c.saldo - valor;
                    return { ...c, saldo: saldoAtual };
                }
                return c;
            });

            contasClientes = contasAtualizadas;
            //alert(`Deposito efetuado com sucesso! Saldo atual ${saldoAtual}`);
            document.getElementById('alerta').innerText = `Deposito efetuado com sucesso! Saldo atual ${saldoAtual}`;
        }else{
            //alert(`Saldo insuficiente`);
            document.getElementById('alerta').innerText = `Saldo insuficiente`;
        }
        
    }else{
        //alert('Valor inválido');
        document.getElementById('alerta').innerText = 'Valor inválido';
    }

};
const depositar = (conta, valor) => {
    if(validarValor(valor)){
        const contaCliente = {...obterConta(conta)};
        contaCliente.saldo += valor;
        const contasAtualizadas = contasClientes.filter((c)=> c.conta!==conta)
        contasAtualizadas.push(contaCliente);
        contasClientes = contasAtualizadas;

        /* isso resolveria
        const contaCliente = {...obterConta(conta)};
        contaCliente.saldo += valor; */
        
        //alert(`Deposito efetuado com sucesso! Saldo atual ${contaCliente.saldo}`);
        document.getElementById('alerta').innerText = `Deposito efetuado com sucesso! Saldo atual ${contaCliente.saldo}`;
    }else{
        //alert('Valor inválido');
        document.getElementById('alerta').innerText = 'Valor inválido';
    }
};

const consultarSaldo = (conta) => {
    const contaCliente = obterConta(conta);
    //alert(`Saldo atual: ${contaCliente.saldo}`);
    document.getElementById('alerta').innerText = `Saldo atual: ${contaCliente.saldo}`;
};

const validarConta = (conta, senha) => {
    const contaCliente = obterConta(conta);
    
    if(contaCliente && contaCliente.senha === senha){
        return true;
    }

    return false;
};

const validarValor = (valor) => {
    if(!isNaN(valor) && valor > 0){
        return true;
    }
    return false;
}

const validarSaldo = (conta, valor) => {
    const contaCliente = obterConta(conta);

    return contaCliente.saldo >= valor;
};

const efetuarOperacao = (evento) => {
    evento.preventDefault();
    const conta = parseInt(evento.target.conta.value);
    const senha = evento.target.senha.value;
    const valor = parseInt(evento.target.valor.value);
    const contaValida = validarConta(conta, senha);

    if(contaValida)
    {
        switch(evento.target.operacao.value){
            case 'SAQUE':
                sacar(conta, valor);
                break;
            case 'DEPOSITO':
                depositar(conta, valor);
                break;
            case 'SALDO':
                consultarSaldo(conta);
                break;
            default: 
                //alert('Operacao inválida!');
                document.getElementById('alerta').innerText = 'Operacao inválida!';
        }
    }else{
        //alert('Dados inválidos da conta!');
        document.getElementById('alerta').innerText = 'Dados inválidos da conta!';
    }
};

const operacao = document.getElementById('operacao');
operacao.addEventListener('change', trocarOperacao);

const formAcoes = document.getElementById('form-acoes');
formAcoes.addEventListener('submit', efetuarOperacao);
