
let banco = [];

//Pegando o item que está no local storage, mas eu tenho q transformar ele em JSON, (??) SE NÃO pego vazio
const getBanco = () => JSON.parse(localStorage.getItem ('todoList')) ?? [];
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco));

const criarItem = (tarefa, indice, status) => {

    const item = document.createElement('label');
    //Estou pegando o item, e adicionando uma classe nele
    item.classList.add('todo__item');
    //Estou criando o  elemento input no DOM
    item.innerHTML = `                          
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
    `;
    //Agora peguei a DIV todolist e passei o item que criei em cima dentro dele
    document.getElementById('todoList').appendChild(item);

};

//Função que fiz para não repetir as linhas do array
const limparTarefas = () => {
    const todoList = document.getElementById('todoList');
        //enquanto existir o primeiro filho irei remover o ultimo filho
    while(todoList.firstChild) {
        todoList.removeChild(todoList.lastChild)
    }
}


const atualizarTela = () => {
    limparTarefas();
   const banco = getBanco();
    //Estou pegando a variavel banco que contem um array e estou percorrendo ela para achar a tarefa e pegando o criar item, pegando um item mandando para criar um item e querendo apenas o ponto tarefa que é o que vai se rescrito
    banco.forEach((item, indice) => criarItem (item.tarefa, item.status, indice));
};



const inserirItem = (evento) => {
    // estou capturando a teclado q foi pressionada
    const tecla = evento.key;
    const texto = evento.target.value
    //Se a tecla Enter for pressionada estou inserindo um item no meu banco que é o array
    if (tecla === 'Enter') {
        //Lendo o banco
        const banco = getBanco();
        banco.push({'tarefa': texto, 'status': ''});
        setBanco(banco);
        atualizarTela();
        evento.target.value = ''
    }
};

const removerItem = (indice) => {
    // Recebendo do getBanco
    const banco = getBanco();
    //estou removendo a partir do indice que eu receber, remove o outro
    banco.splice(indice,1);
    setBanco(banco);
    atualizarTela();
};

const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBanco(banco);
    atualizarTela();
}

const clickItem = (evento) => {

    // Pegando o clique do usuario nas tarefas
    const elemento = evento.target;
    //pegando a propriedade do elemento e pegar o valor do indice
   const indice = elemento.dataset.indice;
    
   if(elemento.type === 'button') {
        removerItem(indice);
    } else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem (indice);
    }
};

//Pegando a ação do usuario ao clicar no input para passar no array o que será digitado
document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);

atualizarTela();

//Para trabalhar com LocalStore mandamos uma chave e um value para ele

