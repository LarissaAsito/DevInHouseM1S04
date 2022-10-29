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

const operacao = document.getElementById('operacao');
operacao.addEventListener('change', trocarOperacao);
