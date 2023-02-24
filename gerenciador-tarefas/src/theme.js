const form = document.querySelector('form');
const tarefas = document.querySelector('.tarefas');

let listaTarefas = JSON.parse(localStorage.getItem('listaTarefas')) || [];

function renderizaTarefas() {
  tarefas.innerHTML = '';
  listaTarefas.forEach((tarefa, index) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const titulo = document.createElement('h2');
    titulo.innerText = `${tarefa.redeSocial}`;
    
    const data = document.createElement('p');
    data.innerText = `Data de cadastro: ${formatarData(tarefa.data)}`;
    data.classList.add('data');

    const mensagem = document.createElement('p');
    mensagem.innerText = tarefa.mensagem;
    mensagem.classList.add('mensagem');

    const botaoExcluir = document.createElement('button');
    botaoExcluir.innerText = 'Excluir tarefa';
    botaoExcluir.addEventListener('click', () => {
      listaTarefas.splice(index, 1);
      localStorage.setItem('listaTarefas', JSON.stringify(listaTarefas));
      renderizaTarefas();
    });

    card.appendChild(titulo);
    card.appendChild(data);
    card.appendChild(mensagem);
    card.appendChild(botaoExcluir);
    tarefas.appendChild(card);
  });
}

renderizaTarefas();

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const redeSocial = document.querySelector('#rede-social').value;
  const data = document.querySelector('#data').value;
  const mensagem = document.querySelector('#mensagem').value;

  const tarefa = { redeSocial, data, mensagem };
  listaTarefas.push(tarefa);

  localStorage.setItem('listaTarefas', JSON.stringify(listaTarefas));

  renderizaTarefas();

  form.reset();
});

function formatarData(data) {
  const [ano, mes, dia] = data.split('-');
  return `${dia}/${mes}/${ano}`;
}
