/* Viveiro — lógica da página */

var estado = {
  pessoa: null,
  busca: "",
  tag: null,
  aba: "mural",
  pessoaAberta: null
};


/* ------------------------------------------------ atalhos aos dados */

function pessoaPorId(id) {

  for (var i = 0; i < DADOS.pessoas.length; i++) {

    if (DADOS.pessoas[i].id === id) {
      return DADOS.pessoas[i];
    }

  }

  return null;
}


function nomeDe(id) {

  var p = pessoaPorId(id);

  return p ? p.nome : "(desconhecido)";
}


function ideiaPorId(id) {

  for (var i = 0; i < DADOS.ideias.length; i++) {

    if (DADOS.ideias[i].id === id) {
      return DADOS.ideias[i];
    }

  }

  return null;
}


/* ------------------------------------------------ normalização */

function normalizar(texto) {

  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}


/* ------------------------------------------------ filtragem */

function ideiasVisiveis() {

  var resultado = [];

  for (var i = 0; i < DADOS.ideias.length; i++) {

    var ideia = DADOS.ideias[i];

    var casaTexto = true;

    if (estado.busca !== "") {

      var busca = normalizar(estado.busca);

      casaTexto =
        normalizar(ideia.titulo).includes(busca) ||
        normalizar(ideia.resumo).includes(busca);
    }


    var casaTag = true;

    if (estado.tag !== null) {

      casaTag =
        ideia.tags.indexOf(estado.tag) >= 0;
    }


    if (casaTexto && casaTag) {
      resultado.push(ideia);
    }

  }

  return resultado;
}


/* ------------------------------------------------ data */

function dataBonita(iso) {

  var partes = iso.split("-");

  return partes[2] + "/" + partes[1] + "/" + partes[0];
}


/* ------------------------------------------------ desenho geral */

function desenhar() {

  desenharSeletorDePessoas();

  desenharMural();

  desenharGrupos();

  document.getElementById("base").textContent =
    "base " + DADOS.codigo;
}


/* ------------------------------------------------ seletor */

function desenharSeletorDePessoas() {

  var alvo =
    document.getElementById("quem");


  if (alvo.options.length > 0) {

    alvo.value = estado.pessoa;

    return;
  }


  for (var i = 0; i < DADOS.pessoas.length; i++) {

    var p = DADOS.pessoas[i];

    var opcao =
      document.createElement("option");

    opcao.value = p.id;

    opcao.textContent =
      p.nome + " (" + p.curso + ")";

    alvo.appendChild(opcao);
  }


  alvo.value = estado.pessoa;
}


/* ------------------------------------------------ mural */

function desenharMural() {

  var lista =
    ideiasVisiveis();

  var alvo =
    document.getElementById("cartoes");

  alvo.innerHTML = "";


  for (var i = 0; i < lista.length; i++) {

    alvo.appendChild(
      montarCartao(lista[i])
    );

  }


  if (lista.length === 0) {

    var vazio =
      document.createElement("p");

    vazio.className =
      "mensagem";

    vazio.textContent =
      "Nenhuma ideia encontrada.";

    alvo.appendChild(vazio);
  }


  document.getElementById("contagem").textContent =
    lista.length +
    " de " +
    DADOS.ideias.length +
    " ideias";


  var aviso =
    document.getElementById("filtro-ativo");


  if (estado.tag !== null) {

    aviso.textContent =
      "mostrando apenas ideias com a etiqueta: " +
      estado.tag +
      " ";


    var limpar =
      document.createElement("button");

    limpar.textContent =
      "limpar filtro";


    limpar.onclick = function () {

      estado.tag = null;

      desenharMural();
    };


    aviso.appendChild(limpar);

  } else {

    aviso.textContent = "";

  }
}


/* ------------------------------------------------ cartão */

function montarCartao(ideia) {

  var cartao =
    document.createElement("div");

  cartao.className =
    "cartao";


  var titulo =
    document.createElement("h3");

  titulo.textContent =
    ideia.titulo;

  cartao.appendChild(titulo);


  var autoria =
    document.createElement("div");

  autoria.className =
    "autoria";


  var autor =
    document.createElement("button");

  autor.className =
    "link-pessoa";

  autor.textContent =
    nomeDe(ideia.autor);

  autor.onclick = function () {

    abrirPessoa(ideia.autor);

  };


  autoria.appendChild(autor);


  autoria.appendChild(
    document.createTextNode(
      " · " + dataBonita(ideia.data)
    )
  );


  cartao.appendChild(autoria);


  var resumo =
    document.createElement("p");

  resumo.className =
    "resumo";

  resumo.textContent =
    ideia.resumo;

  cartao.appendChild(resumo);


  var estadoIdeia =
    document.createElement("span");

  estadoIdeia.className =
    "estado-ideia estado-" +
    obterEstado(ideia);

  estadoIdeia.textContent =
    obterEstado(ideia);

  cartao.appendChild(estadoIdeia);


  var tags =
    document.createElement("div");

  tags.className =
    "tags";


  for (var i = 0; i < ideia.tags.length; i++) {

    var etiqueta =
      document.createElement("span");

    etiqueta.className =
      "etiqueta";

    etiqueta.textContent =
      ideia.tags[i];

    etiqueta.onclick =
      criarCliqueDeTag(ideia.tags[i]);

    tags.appendChild(etiqueta);
  }


  cartao.appendChild(tags);


  var rodape =
    document.createElement("div");

  rodape.className =
    "rodape";


  var botao =
    document.createElement("button");

  botao.className =
    "apoiar";

  botao.textContent =
    "apoiar";

  botao.onclick =
    criarCliqueDeApoio(ideia.id);

  rodape.appendChild(botao);


  var contador =
    document.createElement("span");

  contador.className =
    "apoios";

  contador.textContent =
    ideia.apoios +
    " apoios";

  rodape.appendChild(contador);


  cartao.appendChild(rodape);


  return cartao;
}


/* ------------------------------------------------ V-06 */

function obterEstado(ideia) {

  if (!ideia.estado) {
    ideia.estado = "semente";
  }

  return ideia.estado;
}


/* ------------------------------------------------ V-01 */

function abrirPessoa(id) {

  var pessoa =
    pessoaPorId(id);

  if (!pessoa) {
    return;
  }


  estado.pessoaAberta = id;


  document.getElementById("mural")
    .className = "escondido";

  document.getElementById("grupos")
    .className = "escondido";

  document.getElementById("pessoa")
    .className = "";


  document.getElementById("aba-mural")
    .className = "aba";

  document.getElementById("aba-grupos")
    .className = "aba";


  desenharPessoa(pessoa);
}


function desenharPessoa(pessoa) {

  var perfil =
    document.getElementById("perfil-pessoa");

  perfil.innerHTML = "";


  var nome =
    document.createElement("h2");

  nome.textContent =
    pessoa.nome;

  perfil.appendChild(nome);


  var tipo =
    document.createElement("p");

  tipo.innerHTML =
    "<strong>Tipo:</strong> " +
    pessoa.tipo;

  perfil.appendChild(tipo);


  var curso =
    document.createElement("p");

  curso.innerHTML =
    "<strong>Curso:</strong> " +
    pessoa.curso;

  perfil.appendChild(curso);


  var interesses =
    document.createElement("p");

  interesses.innerHTML =
    "<strong>Interesses:</strong> " +
    pessoa.interesses.join(", ");

  perfil.appendChild(interesses);


  var lista =
    document.getElementById("ideias-pessoa");

  lista.innerHTML = "";


  var encontrou = false;


  for (var i = 0; i < DADOS.ideias.length; i++) {

    if (DADOS.ideias[i].autor === pessoa.id) {

      encontrou = true;

      lista.appendChild(
        montarCartao(DADOS.ideias[i])
      );
    }
  }


  if (!encontrou) {

    var vazio =
      document.createElement("p");

    vazio.className =
      "mensagem";

    vazio.textContent =
      "ainda não publicou ideias";

    lista.appendChild(vazio);
  }
}


/* ------------------------------------------------ grupos */

function desenharGrupos() {

  var alvo =
    document.getElementById("lista-grupos");

  alvo.innerHTML = "";


  for (var i = 0; i < DADOS.grupos.length; i++) {

    var g = DADOS.grupos[i];

    var item =
      document.createElement("li");


    var quantos =
      document.createElement("span");

    quantos.className =
      "quantos";

    quantos.textContent =
      g.membros.length +
      " membros";

    item.appendChild(quantos);


    var nome =
      document.createElement("span");

    nome.className =
      "nome";

    nome.textContent =
      g.nome;

    item.appendChild(nome);


    var descricao =
      document.createElement("p");

    descricao.className =
      "descricao";

    descricao.textContent =
      g.descricao;

    item.appendChild(descricao);


    alvo.appendChild(item);
  }
}


/* ------------------------------------------------ V-03 — publicar */

function publicarIdeia(evento) {

  evento.preventDefault();


  var titulo =
    document.getElementById("titulo-ideia")
      .value.trim();

  var resumo =
    document.getElementById("resumo-ideia")
      .value.trim();

  var tagsTexto =
    document.getElementById("tags-ideia")
      .value.trim();

  var erro =
    document.getElementById("erro-ideia");


  /* título obrigatório */

  if (titulo === "") {

    erro.textContent =
      "Digite um título para publicar a ideia.";

    document.getElementById("titulo-ideia")
      .focus();

    return;
  }


  erro.textContent = "";


  /* encontra o maior ID */

  var maiorId = 0;

  for (var i = 0; i < DADOS.ideias.length; i++) {

    if (DADOS.ideias[i].id > maiorId) {
      maiorId = DADOS.ideias[i].id;
    }

  }


  /* tags */

  var tags = [];

  if (tagsTexto !== "") {

    var partes =
      tagsTexto.split(",");


    for (var i = 0; i < partes.length; i++) {

      var tag =
        partes[i].trim();

      if (tag !== "") {
        tags.push(tag);
      }

    }

  }


  /* data */

  var hoje =
    new Date()
      .toISOString()
      .split("T")[0];


  /* nova ideia */

  var novaIdeia = {

    id: maiorId + 1,

    titulo: titulo,

    resumo: resumo,

    autor: estado.pessoa,

    data: hoje,

    tags: tags,

    apoios: 0,

    estado: "semente"

  };


  /* coloca no topo */

  DADOS.ideias.unshift(novaIdeia);


  /* limpa formulário */

  document.getElementById("form-ideia").reset();


  /* atualiza mural */

  desenharMural();
}


/* ------------------------------------------------ ações */

function criarCliqueDeTag(tag) {

  return function () {

    estado.tag = tag;

    desenhar();

  };
}


function criarCliqueDeApoio(idIdeia) {

  return function () {

    var ideia =
      ideiaPorId(idIdeia);

    if (!ideia) {
      return;
    }


    ideia.apoios =
      ideia.apoios + 1;


    desenharMural();
  };
}


/* ------------------------------------------------ abas */

function trocarAba(qual) {

  estado.aba = qual;


  document.getElementById("pessoa")
    .className = "escondido";


  document.getElementById("mural")
    .className =
      qual === "mural"
        ? ""
        : "escondido";


  document.getElementById("grupos")
    .className =
      qual === "grupos"
        ? ""
        : "escondido";


  document.getElementById("aba-mural")
    .className =
      qual === "mural"
        ? "aba ativa"
        : "aba";


  document.getElementById("aba-grupos")
    .className =
      qual === "grupos"
        ? "aba ativa"
        : "aba";
}


/* ------------------------------------------------ início */

function iniciar() {

  estado.pessoa =
    DADOS.pessoas[0].id;


  document.getElementById("busca")
    .oninput = function (e) {

      estado.busca =
        e.target.value;

      desenharMural();
    };


  document.getElementById("quem")
    .onchange = function (e) {

      estado.pessoa =
        Number(e.target.value);
    };


  document.getElementById("form-ideia")
    .onsubmit = publicarIdeia;


  document.getElementById("aba-mural")
    .onclick = function () {

      trocarAba("mural");
    };


  document.getElementById("aba-grupos")
    .onclick = function () {

      trocarAba("grupos");
    };


  document.getElementById("voltar-mural")
    .onclick = function () {

      trocarAba("mural");
    };


  desenhar();
}


iniciar();
