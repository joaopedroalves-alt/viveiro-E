/* Viveiro — lógica da página
   Histórias implementadas:
   V-01 — Página da pessoa
   V-04 — Encontrar ideias que combinam comigo
   V-06 — Estados da ideia
*/

var estado = {
  pessoa: null,
  busca: "",
  tag: null,
  aba: "mural",
  perfil: null
};


/* =========================================================
   ATALHOS AOS DADOS
   ========================================================= */

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


/* =========================================================
   NORMALIZAÇÃO
   ========================================================= */

function normalizar(texto) {

  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

}


/* =========================================================
   V-04 — BUSCA
   ========================================================= */

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


/* =========================================================
   DESENHO
   ========================================================= */

function desenhar() {

  desenharSeletorDePessoas();
  desenharMural();
  desenharGrupos();

  document.getElementById("base").textContent =
    "base " + DADOS.codigo;

}


/* =========================================================
   SELETOR DE PESSOAS
   ========================================================= */

function desenharSeletorDePessoas() {

  var alvo = document.getElementById("quem");

  if (alvo.options.length > 0) {
    return;
  }

  for (var i = 0; i < DADOS.pessoas.length; i++) {

    var p = DADOS.pessoas[i];

    var opcao = document.createElement("option");

    opcao.value = p.id;

    opcao.textContent =
      p.nome + " (" + p.curso + ")";

    alvo.appendChild(opcao);

  }

  alvo.value = estado.pessoa;

}


/* =========================================================
   MURAL
   ========================================================= */

function desenharMural() {

  var lista = ideiasVisiveis();

  var alvo = document.getElementById("cartoes");

  alvo.innerHTML = "";


  for (var i = 0; i < lista.length; i++) {

    alvo.appendChild(
      montarCartao(lista[i])
    );

  }


  /* B-02 */

  if (lista.length === 0) {

    var vazio = document.createElement("p");

    vazio.className = "vazio";

    vazio.textContent =
      "Nenhuma ideia encontrada.";

    alvo.appendChild(vazio);

  }


  document.getElementById("contagem").textContent =
    lista.length +
    " de " +
    DADOS.ideias.length +
    " ideias";


  /* B-01 */

  var aviso =
    document.getElementById("filtro-ativo");


  if (estado.tag !== null) {

    aviso.textContent =
      "mostrando apenas ideias com a etiqueta: " +
      estado.tag +
      " ";


    var limpar =
      document.createElement("button");

    limpar.className = "limpar";

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


/* =========================================================
   DATA
   ========================================================= */

function dataBonita(iso) {

  var partes = iso.split("-");

  return (
    partes[2] +
    "/" +
    partes[1] +
    "/" +
    partes[0]
  );

}


/* =========================================================
   V-06 — ESTADO DA IDEIA
   ========================================================= */

function estadoBonito(estadoAtual) {

  if (estadoAtual === "semente") {
    return "Semente";
  }

  if (estadoAtual === "germinando") {
    return "Germinando";
  }

  if (estadoAtual === "proposta") {
    return "Proposta";
  }

  return "Semente";
}


/* =========================================================
   CARTÃO
   ========================================================= */

function montarCartao(ideia) {

  var cartao =
    document.createElement("div");

  cartao.className = "cartao";


  /* título */

  var titulo =
    document.createElement("h3");

  titulo.textContent =
    ideia.titulo;

  titulo.className =
    "titulo-ideia";

  titulo.onclick = function () {

    abrirIdeia(ideia.id);

  };

  cartao.appendChild(titulo);


  /* autoria */

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

    abrirPerfil(ideia.autor);

  };


  autoria.appendChild(autor);


  autoria.appendChild(
    document.createTextNode(
      " · " + dataBonita(ideia.data)
    )
  );


  cartao.appendChild(autoria);


  /* resumo */

  var resumo =
    document.createElement("p");

  resumo.className =
    "resumo";

  resumo.textContent =
    ideia.resumo;

  cartao.appendChild(resumo);


  /* V-06 — estado */

  var estadoDiv =
    document.createElement("div");

  estadoDiv.className =
    "estado-ideia";


  var estadoTitulo =
    document.createElement("strong");

  estadoTitulo.textContent =
    "Estado: ";

  estadoDiv.appendChild(estadoTitulo);


  var estadoValor =
    document.createElement("span");

  estadoValor.className =
    "estado " + ideia.estado;

  estadoValor.textContent =
    estadoBonito(ideia.estado);

  estadoDiv.appendChild(estadoValor);


  cartao.appendChild(estadoDiv);


  /* tags */

  var tags =
    document.createElement("div");

  tags.className =
    "tags";


  for (var i = 0; i < ideia.tags.length; i++) {

    var etiqueta =
      document.createElement("button");

    etiqueta.className =
      "etiqueta";

    etiqueta.textContent =
      ideia.tags[i];

    etiqueta.onclick =
      criarCliqueDeTag(ideia.tags[i]);

    tags.appendChild(etiqueta);

  }


  cartao.appendChild(tags);


  /* rodapé */

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
    ideia.apoios + " apoios";

  rodape.appendChild(contador);


  cartao.appendChild(rodape);


  return cartao;

}


/* =========================================================
   V-01 — PERFIL
   ========================================================= */

function abrirPerfil(id) {

  var pessoa =
    pessoaPorId(id);

  if (!pessoa) {
    return;
  }


  estado.perfil = id;


  document.getElementById("mural")
    .className = "escondido";

  document.getElementById("grupos")
    .className = "escondido";

  document.getElementById("perfil")
    .className = "";


  var conteudo =
    document.getElementById("conteudo-perfil");

  conteudo.innerHTML = "";


  var titulo =
    document.createElement("h2");

  titulo.textContent =
    pessoa.nome;

  conteudo.appendChild(titulo);


  var informacoes =
    document.createElement("div");

  informacoes.className =
    "informacoes-pessoa";


  var tipo =
    document.createElement("p");

  tipo.innerHTML =
    "<strong>Tipo:</strong> " +
    pessoa.tipo;

  informacoes.appendChild(tipo);


  var curso =
    document.createElement("p");

  curso.innerHTML =
    "<strong>Curso:</strong> " +
    pessoa.curso;

  informacoes.appendChild(curso);


  var interesses =
    document.createElement("p");

  interesses.innerHTML =
    "<strong>Interesses:</strong> " +
    pessoa.interesses.join(", ");

  informacoes.appendChild(interesses);


  conteudo.appendChild(informacoes);


  var tituloIdeias =
    document.createElement("h3");

  tituloIdeias.textContent =
    "Ideias publicadas";

  conteudo.appendChild(tituloIdeias);


  var ideiasPessoa = [];


  for (var i = 0; i < DADOS.ideias.length; i++) {

    if (DADOS.ideias[i].autor === id) {

      ideiasPessoa.push(
        DADOS.ideias[i]
      );

    }

  }


  if (ideiasPessoa.length === 0) {

    var nenhuma =
      document.createElement("p");

    nenhuma.className =
      "sem-ideias";

    nenhuma.textContent =
      "ainda não publicou ideias";

    conteudo.appendChild(nenhuma);

  } else {

    var lista =
      document.createElement("div");

    lista.className =
      "lista-ideias-pessoa";


    for (var j = 0; j < ideiasPessoa.length; j++) {

      var ideiaLink =
        document.createElement("button");

      ideiaLink.className =
        "ideia-link";

      ideiaLink.textContent =
        ideiasPessoa[j].titulo;

      ideiaLink.onclick =
        criarCliqueDeIdeia(
          ideiasPessoa[j].id
        );

      lista.appendChild(ideiaLink);

    }


    conteudo.appendChild(lista);

  }

}


/* =========================================================
   V-01 — PÁGINA DA IDEIA
   ========================================================= */

function abrirIdeia(id) {

  var ideia =
    ideiaPorId(id);

  if (!ideia) {
    return;
  }


  var pessoa =
    pessoaPorId(ideia.autor);


  estado.perfil = null;


  document.getElementById("mural")
    .className = "escondido";

  document.getElementById("grupos")
    .className = "escondido";

  document.getElementById("perfil")
    .className = "";


  var conteudo =
    document.getElementById("conteudo-perfil");

  conteudo.innerHTML = "";


  var titulo =
    document.createElement("h2");

  titulo.textContent =
    ideia.titulo;

  conteudo.appendChild(titulo);


  var resumo =
    document.createElement("p");

  resumo.className =
    "resumo";

  resumo.textContent =
    ideia.resumo;

  conteudo.appendChild(resumo);


  var autor =
    document.createElement("p");

  autor.innerHTML =
    "<strong>Publicado por:</strong> ";

  var autorLink =
    document.createElement("button");

  autorLink.className =
    "link-pessoa";

  autorLink.textContent =
    pessoa ? pessoa.nome : "(desconhecido)";

  autorLink.onclick = function () {

    abrirPerfil(ideia.autor);

  };

  autor.appendChild(autorLink);

  conteudo.appendChild(autor);


  var data =
    document.createElement("p");

  data.innerHTML =
    "<strong>Data:</strong> " +
    dataBonita(ideia.data);

  conteudo.appendChild(data);


  var estadoDiv =
    document.createElement("p");

  estadoDiv.innerHTML =
    "<strong>Estado:</strong> " +
    estadoBonito(ideia.estado);

  conteudo.appendChild(estadoDiv);


  var tags =
    document.createElement("p");

  tags.innerHTML =
    "<strong>Tags:</strong> " +
    ideia.tags.join(", ");

  conteudo.appendChild(tags);

}


/* =========================================================
   VOLTAR
   ========================================================= */

function voltarAoMural() {

  estado.perfil = null;

  document.getElementById("perfil")
    .className = "escondido";

  document.getElementById("grupos")
    .className = "escondido";

  document.getElementById("mural")
    .className = "";

  trocarAba("mural");

}


/* =========================================================
   GRUPOS
   ========================================================= */

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
      g.membros.length + " membros";

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


/* =========================================================
   AÇÕES
   ========================================================= */

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


function criarCliqueDeIdeia(idIdeia) {

  return function () {

    abrirIdeia(idIdeia);

  };

}


/* =========================================================
   ABAS
   ========================================================= */

function trocarAba(qual) {

  estado.aba = qual;

  estado.perfil = null;


  document.getElementById("mural")
    .className =
    (qual === "mural")
      ? ""
      : "escondido";


  document.getElementById("grupos")
    .className =
    (qual === "grupos")
      ? ""
      : "escondido";


  document.getElementById("perfil")
    .className = "escondido";


  document.getElementById("aba-mural")
    .className =
    (qual === "mural")
      ? "aba ativa"
      : "aba";


  document.getElementById("aba-grupos")
    .className =
    (qual === "grupos")
      ? "aba ativa"
      : "aba";

}


/* =========================================================
   INÍCIO
   ========================================================= */

function iniciar() {

  estado.pessoa =
    DADOS.pessoas[0].id;


  document.getElementById("busca").oninput =
    function (e) {

      estado.busca =
        e.target.value;

      desenharMural();

    };


  document.getElementById("quem").onchange =
    function (e) {

      estado.pessoa =
        Number(e.target.value);

    };


  document.getElementById("aba-mural").onclick =
    function () {

      trocarAba("mural");

    };


  document.getElementById("aba-grupos").onclick =
    function () {

      trocarAba("grupos");

    };


  document.getElementById("voltar-mural").onclick =
    function () {

      voltarAoMural();

    };


  desenhar();

}


iniciar();
