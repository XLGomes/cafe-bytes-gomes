// ===== Café Byte: script =====

// ----- Saudação e "aberto agora" -----
console.log('O script do Café Byte foi carregado!');

const agora = new Date();
const hora = agora.getHours();    // de 0 a 23
const diaDaSemana = agora.getDay(); // 0 = domingo, 6 = sábado

console.log('Agora são ' + hora + ' horas. Dia da semana: ' + diaDaSemana);

function saudacao(h) {
  if (h < 12) {
    return 'Bom dia! ☀️';
  } else if (h < 18) {
    return 'Boa tarde! 🌤️';
  } else {
    return 'Boa noite! 🌙';
  }
}

document.querySelector('#saudacao').textContent = saudacao(hora);

function estaAberto(dia, h) {
  if (dia === 0) {
    return false;                  // domingo: fechado
  } else if (dia === 6) {
    return h >= 8 && h < 18;       // sábado: 8h às 18h
  } else {
    return h >= 7 && h < 20;       // segunda a sexta: 7h às 20h
  }
}

const avisoStatus = document.querySelector('#status');

if (estaAberto(diaDaSemana, hora)) {
  avisoStatus.textContent = '🟢 Estamos abertos agora!';
  avisoStatus.classList.add('aberto-agora');
} else {
  avisoStatus.textContent = '🔴 Estamos fechados agora. Volte mais tarde!';
  avisoStatus.classList.add('fechado-agora');
}

// ----- Modo escuro -----
const botaoTema = document.querySelector('#botao-tema');

function atualizarIconeTema() {
  if (document.body.classList.contains('escuro')) {
    botaoTema.textContent = '☀️';
  } else {
    botaoTema.textContent = '🌙';
  }
}

botaoTema.addEventListener('click', function () {
  document.body.classList.toggle('escuro');
  atualizarIconeTema();
});

// ----- Menu do celular -----
const botaoMenu = document.querySelector('#botao-menu');
const menu = document.querySelector('#menu');

botaoMenu.addEventListener('click', function () {
  menu.classList.toggle('mostrar');
});

// Clicou em um link do menu? Fecha o menu.
menu.addEventListener('click', function () {
  menu.classList.remove('mostrar');
});

// ----- Cardápio: os dados -----
const produtos = [
  { id: 1, nome: 'Café expresso', categoria: 'bebida', preco: 6.5,
    emoji: '☕', descricao: 'Curto, encorpado e cheiroso.' },
  { id: 2, nome: 'Cappuccino', categoria: 'bebida', preco: 9.9,
    emoji: '🥛', descricao: 'Café, leite vaporizado e canela.' },
  { id: 3, nome: 'Chocolate quente', categoria: 'bebida', preco: 11,
    emoji: '🍫', descricao: 'Cremoso, perfeito para dias frios.' },
  { id: 4, nome: 'Suco de laranja', categoria: 'bebida', preco: 8,
    emoji: '🍊', descricao: 'Natural e geladinho.' },
  { id: 5, nome: 'Bolo de cenoura', categoria: 'doce', preco: 8.5,
    emoji: '🍰', descricao: 'Com cobertura de chocolate.' },
  { id: 6, nome: 'Cookie', categoria: 'doce', preco: 6,
    emoji: '🍪', descricao: 'Gotas de chocolate e casquinha crocante.' },
  { id: 7, nome: 'Pão de queijo', categoria: 'salgado', preco: 5,
    emoji: '🧀', descricao: 'Quentinho, saído do forno.' },
  { id: 8, nome: 'Misto quente', categoria: 'salgado', preco: 12,
    emoji: '🥪', descricao: 'Pão de forma, queijo e presunto.' }
];

console.log('Produtos no cardápio: ' + produtos.length);

// ----- Cardápio: mostrar na página -----
const listaProdutos = document.querySelector('#lista-produtos');
const busca = document.querySelector('#busca');
const filtros = document.querySelectorAll('.filtro');
let categoriaAtual = 'todos';

function formatarPreco(valor) {
  return 'R$ ' + valor.toFixed(2).replace('.', ',');
}

function mostrarProdutos() {
  const texto = busca.value.toLowerCase();
  let encontrados = 0;
  listaProdutos.innerHTML = '';

  produtos.forEach(function (produto) {
    const daCategoria = categoriaAtual === 'todos' || produto.categoria === categoriaAtual;
    const combinaBusca = produto.nome.toLowerCase().includes(texto);

    if (daCategoria && combinaBusca) {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <span class="emoji">${produto.emoji}</span>
        <h3>${produto.nome}</h3>
        <p>${produto.descricao}</p>
        <p class="preco">${formatarPreco(produto.preco)}</p>
      `;
      listaProdutos.appendChild(card);
      encontrados = encontrados + 1;
    }
  });

  if (encontrados === 0) {
    listaProdutos.innerHTML = '<p>Nenhum produto encontrado. 😕</p>';
  }
}

mostrarProdutos();

// Digitou na busca? Mostra de novo, já filtrando
busca.addEventListener('input', mostrarProdutos);

// Clicou em um filtro? Troca a categoria e marca o botão
filtros.forEach(function (botao) {
  botao.addEventListener('click', function () {
    filtros.forEach(function (outro) {
      outro.classList.remove('ativo');
    });
    botao.classList.add('ativo');
    categoriaAtual = botao.dataset.categoria;
    mostrarProdutos();
  });
});