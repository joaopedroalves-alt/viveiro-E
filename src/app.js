/* =====================================================
   VIVEIRO — aplicação
===================================================== */


/* ==============================
   ESTADO
============================== */

var estado = {
  pessoa: null,
  busca: "",
  tag: null,
  aba: "mural",
  pagina: "mural",
  pessoaAberta: null,
  ideiaAberta: null
};


/* ==============================
   PESSOAS E IDEIAS
============================== */

function pessoaPorId(id) {

  return DADOS.pessoas.find(function (pessoa) {
    return Number(pessoa.id) === Number(id);
  });

}


function ideiaPorId(id) {

  return DADOS.ideias.find(function (ideia) {
    return Number(ideia.id) === Number(id);
  });

}


function nomeDe(id) {

  var pessoa = pessoaPorId(id);

  if (!pessoa) {
    return "Pessoa desconhecida";
  }

  return pessoa.nome;

}


/* ==============================
   ARQUIVO
============================== */

function lerArquivadas() {

  try {

    var dados =
      localStorage.getItem("viveiro_arquivadas");

    return dados ? JSON.parse(dados) : [];

  } catch (erro) {

    return [];

  }

}


function salvarArquivadas(lista) {

  localStorage.setItem(
    "viveiro_arquivadas",
    JSON.stringify(lista)
  );

}


function ideiaArquivada(id) {

  return (
    lerArquivadas().indexOf(Number(id)) !== -1
  );

}


function arquivarIdeia(id) {

  var lista = lerArquivadas();

  id = Number(id);

  if (lista.indexOf(id) === -1) {

    lista.push(id);

    salvarArquivadas(lista);

  }

  desenhar();

}


function desarquivarIdeia(id) {

  id = Number(id);

  var lista =
    lerArquivadas().filter(function (item) {

      return Number(item) !== id;

    });

  salvarArquivadas(lista);

  desenhar();

}


/* ==============================
   NOTIFICAÇÕES
============================== */

function lerNotificacoes() {

  try {

    var dados =
      localStorage.getItem("viveiro_notificacoes");

    return dados ? JSON.parse(dados) : [];

  } catch (erro) {

    return [];

  }

}


function salvarNotificacoes(lista) {

  localStorage.setItem(
    "viveiro_notificacoes",
    JSON.stringify(lista)
  );

}


function criarNotificacao(idIdeia, idInteressado) {

  var ideia = ideiaPorId(idIdeia);

  if (!ideia) {
    return;
  }

  if (
    Number(ideia.autor) ===
    Number(idInteressado)
  ) {
    return;
  }

  var lista = lerNotificacoes();

  lista.unshift({

    id: Date.now(),

    ideia: Number(idIdeia),

    interessado: Number(idInteressado),

    autor: Number(ideia.autor),

    lida: false,

    data: new Date().toISOString()

  });

  salvarNotificacoes(lista);

}


function atualizarContadorNotificacoes() {

  var contador =
    document.getElementById(
      "contador-notificacoes"
    );

  if (!contador) {
    return;
  }

  var atual =
    Number(estado.pessoa);

  var quantidade =
    lerNotificacoes().filter(
      function (notificacao) {

        return (
          Number(notificacao.autor) === atual &&
          !notificacao.lida
        );

      }
    ).length;

  contador.textContent =
    quantidade;

}


function marcarTodasComoLidas() {

  var atual =
    Number(estado.pessoa);

  var lista =
    lerNotificacoes();

  lista.forEach(
    function (notificacao) {

      if (
        Number(notificacao.autor) ===
        atual
      ) {

        notificacao.lida = true;

      }

    }
  );

  salvarNotificacoes(lista);

  desenharNotificacoes();

  atualizarContadorNotificacoes();

}


function marcarNotificacaoComoLida(id) {

  var lista =
    lerNotificacoes();

  lista.forEach(
    function (notificacao) {

      if (
        Number(notificacao.id) ===
        Number(id)
      ) {

        notificacao.lida = true;

      }

    }
  );

  salvarNotificacoes(lista);

  desenharNotificacoes();

  atualizarContadorNotificacoes();

}


/* ==============================
   IDEIAS VISÍVEIS
============================== */

function ideiasVisiveis() {

  var texto =
    estado.busca
      .trim()
      .toLowerCase();

  var arquivadas =
    lerArquivadas();

  return DADOS.ideias

    .filter(
      function (ideia) {

        return (
          arquivadas.indexOf(
            Number(ideia.id)
          ) === -1
        );

      }
    )

    .filter(
      function (ideia) {

        if (!texto) {
          return true;
        }

        var conteudo = [

          ideia.titulo,

          ideia.resumo,

          (ideia.tags || []).join(" ")

        ]
          .join(" ")
          .toLowerCase();

        return (
          conteudo.indexOf(texto) !== -1
        );

      }
    )

    .filter(
      function (ideia) {

        if (!estado.tag) {
          return true;
        }

        return (
          ideia.tags || []
        ).some(
          function (tag) {

            return (
              tag.toLowerCase() ===
              estado.tag.toLowerCase()
            );

          }
        );

      }
    )

    .sort(
      function (a, b) {

        return (
          Number(b.id) -
          Number(a.id)
        );

      }
    );

}


/* ==============================
   CARD
============================== */

function montarCartao(ideia) {

  var card =
    document.createElement("article");

  card.className =
    "cartao";


  /* título */

  var titulo =
    document.createElement("h3");

  var botaoTitulo =
    document.createElement("button");

  botaoTitulo.type =
    "button";

  botaoTitulo.textContent =
    ideia.titulo;

  botaoTitulo.addEventListener(
    "click",
    function () {

      abrirIdeia(ideia.id);

    }
  );

  titulo.appendChild(
    botaoTitulo
  );

  card.appendChild(
    titulo
  );


  /* resumo */

  var resumo =
    document.createElement("p");

  resumo.textContent =
    ideia.resumo ||
    "Sem resumo.";

  card.appendChild(
    resumo
  );


  /* autor */

  var autor =
    document.createElement("p");

  autor.className =
    "autor";

  autor.textContent =
    nomeDe(ideia.autor);

  autor.addEventListener(
    "click",
    function () {

      abrirPessoa(
        ideia.autor
      );

    }
  );

  card.appendChild(
    autor
  );


  /* data */

  var data =
    document.createElement("span");

  data.className =
    "data";

  data.textContent =
    ideia.data || "";

  card.appendChild(
    data
  );


  /* tags */

  var tags =
    document.createElement("div");

  tags.className =
    "tags";


  (ideia.tags || []).forEach(
    function (nomeTag) {

      var tag =
        document.createElement("button");

      tag.type =
        "button";

      tag.className =
        "tag";

      tag.textContent =
        "#" + nomeTag;

      tag.addEventListener(
        "click",
        function () {

          estado.tag =
            nomeTag;

          desenharMural();

        }
      );

      tags.appendChild(
        tag
      );

    }
  );


  card.appendChild(
    tags
  );


  /* apoios */

  var apoios =
    document.createElement("div");

  apoios.className =
    "apoios";


  var quantidade =
    document.createElement("span");

  quantidade.textContent =
    "♡ " +
    Number(ideia.apoios || 0) +
    " apoios";

  apoios.appendChild(
    quantidade
  );


  var atual =
    Number(estado.pessoa);


  /* interesse */

  if (
    Number(ideia.autor) !==
    atual
  ) {

    var apoiar =
      document.createElement("button");

    apoiar.type =
      "button";

    apoiar.className =
      "botao-secundario";

    apoiar.textContent =
      "Demonstrar interesse";

    apoiar.addEventListener(
      "click",
      function () {

        ideia.apoios =
          Number(ideia.apoios || 0) + 1;

        criarNotificacao(
          ideia.id,
          atual
        );

        desenhar();

      }
    );

    apoios.appendChild(
      apoiar
    );

  }


  /* arquivar */

  if (
    Number(ideia.autor) ===
    atual
  ) {

    var arquivar =
      document.createElement("button");

    arquivar.type =
      "button";

    arquivar.className =
      "botao-secundario";

    arquivar.textContent =
      ideiaArquivada(ideia.id)
        ? "Desarquivar"
        : "Arquivar";

    arquivar.addEventListener(
      "click",
      function () {

        if (
          ideiaArquivada(
            ideia.id
          )
        ) {

          desarquivarIdeia(
            ideia.id
          );

        } else {

          arquivarIdeia(
            ideia.id
          );

        }

      }
    );

    apoios.appendChild(
      arquivar
    );

  }


  card.appendChild(
    apoios
  );


  return card;

}


/* ==============================
   MURAL
============================== */

function desenharMural() {

  var area =
    document.getElementById(
      "cartoes"
    );

  if (!area) {
    return;
  }

  area.innerHTML =
    "";


  var ideias =
    ideiasVisiveis();


  var contagem =
    document.getElementById(
      "contagem"
    );

  if (contagem) {

    contagem.textContent =
      ideias.length +
      (
        ideias.length === 1
          ? " ideia"
          : " ideias"
      );

  }


  var filtro =
    document.getElementById(
      "filtro-ativo"
    );


  if (filtro) {

    if (estado.tag) {

      filtro.innerHTML =
        'Filtro ativo: <strong>#' +
        estado.tag +
        '</strong> ' +
        '<button id="limpar-filtro" ' +
        'class="botao-secundario" ' +
        'type="button">limpar</button>';

      document
        .getElementById(
          "limpar-filtro"
        )
        .addEventListener(
          "click",
          function () {

            estado.tag =
              null;

            desenharMural();

          }
        );

    } else {

      filtro.textContent =
        "";

    }

  }


  if (
    ideias.length === 0
  ) {

    var vazio =
      document.createElement("div");

    vazio.className =
      "vazio";

    vazio.innerHTML =
      "<strong>Nenhuma ideia encontrada</strong>" +
      "Tente mudar a busca ou remover o filtro.";

    area.appendChild(
      vazio
    );

    return;

  }


  ideias.forEach(
    function (ideia) {

      area.appendChild(
        montarCartao(
          ideia
        )
      );

    }
  );

}


/* ==============================
   PÁGINA DA IDEIA
============================== */

function abrirIdeia(id) {

  estado.ideiaAberta =
    Number(id);

  estado.pagina =
    "pagina-ideia";

  mostrarPaginaAtual();

  desenharIdeia();

}


function desenharIdeia() {

  var area =
    document.getElementById(
      "conteudo-ideia"
    );

  var ideia =
    ideiaPorId(
      estado.ideiaAberta
    );


  if (
    !area ||
    !ideia
  ) {
    return;
  }


  area.innerHTML =
    "";


  var titulo =
    document.createElement("h2");

  titulo.textContent =
    ideia.titulo;

  area.appendChild(
    titulo
  );


  var autor =
    document.createElement("p");

  autor.textContent =
    "Publicado por " +
    nomeDe(ideia.autor) +
    " em " +
    ideia.data;

  area.appendChild(
    autor
  );


  var resumo =
    document.createElement("p");

  resumo.className =
    "resumo";

  resumo.textContent =
    ideia.resumo ||
    "Sem resumo.";

  area.appendChild(
    resumo
  );


  var tags =
    document.createElement("div");

  tags.className =
    "tags";


  (ideia.tags || []).forEach(
    function (nomeTag) {

      var tag =
        document.createElement("button");

      tag.type =
        "button";

      tag.className =
        "tag";

      tag.textContent =
        "#" + nomeTag;

      tag.addEventListener(
        "click",
        function () {

          estado.tag =
            nomeTag;

          estado.pagina =
            "mural";

          estado.aba =
            "mural";

          mostrarPaginaAtual();

          desenharMural();

        }
      );

      tags.appendChild(
        tag
      );

    }
  );


  area.appendChild(
    tags
  );


  var info =
    document.createElement("div");

  info.className =
    "apoios";

  info.textContent =
    "♡ " +
    Number(ideia.apoios || 0) +
    " pessoas demonstraram interesse";

  area.appendChild(
    info
  );


  var atual =
    Number(estado.pessoa);


  if (
    Number(ideia.autor) !==
    atual
  ) {

    var apoiar =
      document.createElement("button");

    apoiar.type =
      "button";

    apoiar.className =
      "botao-principal";

    apoiar.textContent =
      "Demonstrar interesse";

    apoiar.addEventListener(
      "click",
      function () {

        ideia.apoios =
          Number(ideia.apoios || 0) + 1;

        criarNotificacao(
          ideia.id,
          atual
        );

        desenharIdeia();

        atualizarContadorNotificacoes();

      }
    );

    area.appendChild(
      apoiar
    );

  }


  if (
    Number(ideia.autor) ===
    atual
  ) {

    var arquivar =
      document.createElement("button");

    arquivar.type =
      "button";

    arquivar.className =
      "botao-secundario";

    arquivar.style.marginLeft =
      "8px";

    arquivar.textContent =
      ideiaArquivada(ideia.id)
        ? "Desarquivar"
        : "Arquivar";

    arquivar.addEventListener(
      "click",
      function () {

        if (
          ideiaArquivada(
            ideia.id
          )
        ) {

          desarquivarIdeia(
            ideia.id
          );

        } else {

          arquivarIdeia(
            ideia.id
          );

        }

        desenharIdeia();

      }
    );

    area.appendChild(
      arquivar
    );

  }

}


/* ==============================
   PÁGINA DA PESSOA
============================== */

function abrirPessoa(id) {

  estado.pessoaAberta =
    Number(id);

  estado.pagina =
    "pagina-pessoa";

  mostrarPaginaAtual();

  desenharPessoa();

}


function desenharPessoa() {

  var area =
    document.getElementById(
      "conteudo-pessoa"
    );

  var pessoa =
    pessoaPorId(
      estado.pessoaAberta
    );


  if (
    !area ||
    !pessoa
  ) {
    return;
  }


  area.innerHTML =
    "";


  var titulo =
    document.createElement("h2");

  titulo.textContent =
    pessoa.nome;

  area.appendChild(
    titulo
  );


  var tipo =
    document.createElement("p");

  tipo.textContent =
    (pessoa.tipo || "usuário") +
    " • " +
    (pessoa.curso || "");

  area.appendChild(
    tipo
  );


  if (
    pessoa.interesses &&
    pessoa.interesses.length
  ) {

    var tituloInteresses =
      document.createElement("h3");

    tituloInteresses.textContent =
      "Interesses";

    area.appendChild(
      tituloInteresses
    );


    var interesses =
      document.createElement("div");

    interesses.className =
      "interesses";


    pessoa.interesses.forEach(
      function (interesse) {

        var tag =
          document.createElement("span");

        tag.className =
          "tag";

        tag.textContent =
          "#" + interesse;

        interesses.appendChild(
          tag
        );

      }
    );


    area.appendChild(
      interesses
    );

  }


  var tituloIdeias =
    document.createElement("h3");

  tituloIdeias.textContent =
    "Ideias publicadas";

  tituloIdeias.style.marginTop =
    "30px";

  area.appendChild(
    tituloIdeias
  );


  var ideias =
    DADOS.ideias.filter(
      function (ideia) {

        return (
          Number(ideia.autor) ===
          Number(pessoa.id)
        );

      }
    ).filter(
      function (ideia) {

        return !ideiaArquivada(
          ideia.id
        );

      }
    );


  if (
    ideias.length === 0
  ) {

    var vazio =
      document.createElement("p");

    vazio.textContent =
      "Esta pessoa ainda não publicou ideias.";

    area.appendChild(
      vazio
    );

    return;

  }


  ideias.forEach(
    function (ideia) {

      var mini =
        document.createElement("div");

      mini.className =
        "cartao";

      mini.style.marginTop =
        "12px";


      var titulo =
        document.createElement("h3");


      var botao =
        document.createElement("button");

      botao.type =
        "button";

      botao.textContent =
        ideia.titulo;

      botao.addEventListener(
        "click",
        function () {

          abrirIdeia(
            ideia.id
          );

        }
      );


      titulo.appendChild(
        botao
      );

      mini.appendChild(
        titulo
      );


      var resumo =
        document.createElement("p");

      resumo.textContent =
        ideia.resumo;

      mini.appendChild(
        resumo
      );


      area.appendChild(
        mini
      );

    }
  );

}


/* ==============================
   GRUPOS
============================== */

function desenharGrupos() {

  var lista =
    document.getElementById(
      "lista-grupos"
    );

  if (!lista) {
    return;
  }

  lista.innerHTML =
    "";


  if (
    !DADOS.grupos ||
    DADOS.grupos.length === 0
  ) {

    lista.innerHTML =
      "<li>Nenhum grupo disponível.</li>";

    return;

  }


  DADOS.grupos.forEach(
    function (grupo) {

      var item =
        document.createElement("li");


      var titulo =
        document.createElement("h3");

      titulo.textContent =
        grupo.nome;

      item.appendChild(
        titulo
      );


      var descricao =
        document.createElement("p");

      descricao.textContent =
        grupo.descricao || "";

      item.appendChild(
        descricao
      );


      var membros =
        document.createElement("p");

      membros.textContent =
        (grupo.membros || []).length +
        " membros";

      item.appendChild(
        membros
      );


      lista.appendChild(
        item
      );

    }
  );

}


/* ==============================
   ARQUIVO
============================== */

function desenharArquivo() {

  var area =
    document.getElementById(
      "lista-arquivo"
    );

  if (!area) {
    return;
  }

  area.innerHTML =
    "";


  var atual =
    Number(estado.pessoa);


  var ideias =
    DADOS.ideias.filter(
      function (ideia) {

        return (
          Number(ideia.autor) === atual &&
          ideiaArquivada(
            ideia.id
          )
        );

      }
    );


  if (
    ideias.length === 0
  ) {

    area.innerHTML =
      "<div class='vazio'>" +
      "<strong>Nenhuma ideia arquivada</strong>" +
      "As ideias que você arquivar aparecerão aqui." +
      "</div>";

    return;

  }


  ideias.forEach(
    function (ideia) {

      var card =
        montarCartao(
          ideia
        );

      card.classList.add(
        "arquivada"
      );

      area.appendChild(
        card
      );

    }
  );

}


/* ==============================
   NOTIFICAÇÕES
============================== */

function desenharNotificacoes() {

  var area =
    document.getElementById(
      "lista-notificacoes"
    );

  if (!area) {
    return;
  }

  area.innerHTML =
    "";


  var atual =
    Number(estado.pessoa);


  var lista =
    lerNotificacoes().filter(
      function (notificacao) {

        return (
          Number(notificacao.autor) ===
          atual
        );

      }
    );


  if (
    lista.length === 0
  ) {

    area.innerHTML =
      "<div class='vazio'>" +
      "<strong>Nenhuma notificação</strong>" +
      "Quando alguém demonstrar interesse em uma das suas ideias, aparecerá aqui." +
      "</div>";

    return;

  }


  lista.forEach(
    function (notificacao) {

      var ideia =
        ideiaPorId(
          notificacao.ideia
        );


      if (!ideia) {
        return;
      }


      var card =
        document.createElement("div");

      card.className =
        "notificacao";


      if (
        !notificacao.lida
      ) {

        card.classList.add(
          "nao-lida"
        );

      }


      var texto =
        document.createElement("p");

      texto.innerHTML =
        "<strong>" +
        nomeDe(
          notificacao.interessado
        ) +
        "</strong> demonstrou interesse na ideia <strong>" +
        ideia.titulo +
        "</strong>.";

      card.appendChild(
        texto
      );


      var data =
        document.createElement("small");

      data.textContent =
        notificacao.lida
          ? "Notificação lida"
          : "Nova notificação";

      card.appendChild(
        data
      );


      if (
        !notificacao.lida
      ) {

        var botao =
          document.createElement("button");

        botao.type =
          "button";

        botao.className =
          "botao-secundario";

        botao.textContent =
          "Marcar como lida";

        botao.addEventListener(
          "click",
          function () {

            marcarNotificacaoComoLida(
              notificacao.id
            );

          }
        );

        card.appendChild(
          botao
        );

      }


      area.appendChild(
        card
      );

    }
  );

}


/* ==============================
   PUBLICAR IDEIA
============================== */

function publicarIdeia() {

  var titulo =
    document.getElementById(
      "titulo-ideia"
    ).value.trim();


  var resumo =
    document.getElementById(
      "resumo-ideia"
    ).value.trim();


  var tagsTexto =
    document.getElementById(
      "tags-ideia"
    ).value.trim();


  var erro =
    document.getElementById(
      "erro-ideia"
    );


  /* limpa mensagem */

  erro.textContent =
    "";


  /* título obrigatório */

  if (
    titulo === ""
  ) {

    erro.textContent =
      "Digite um título para a ideia.";

    return;

  }


  /* tags */

  var tags = [];

  if (
    tagsTexto !== ""
  ) {

    tags =
      tagsTexto
        .split(",")
        .map(
          function (tag) {

            return tag.trim();

          }
        )
        .filter(
          function (tag) {

            return tag !== "";

          }
        );

  }


  /* remove tags repetidas */

  tags =
    tags.filter(
      function (tag, indice) {

        return (
          tags.indexOf(tag) ===
          indice
        );

      }
    );


  /* próximo ID */

  var maiorId = 0;

  DADOS.ideias.forEach(
    function (ideia) {

      var id =
        Number(ideia.id);

      if (
        id > maiorId
      ) {

        maiorId =
          id;

      }

    }
  );


  /* nova ideia */

  var novaIdeia = {

    id:
      maiorId + 1,

    titulo:
      titulo,

    resumo:
      resumo,

    autor:
      Number(estado.pessoa),

    tags:
      tags,

    data:
      new Date()
        .toLocaleDateString(
          "pt-BR"
        ),

    apoios:
      0

  };


  /* adiciona a ideia */

  DADOS.ideias.unshift(
    novaIdeia
  );


  /* limpa formulário */

  document
    .getElementById(
      "form-ideia"
    )
    .reset();


  /* limpa busca/filtro */

  estado.busca =
    "";

  estado.tag =
    null;


  document
    .getElementById(
      "busca"
    )
    .value =
    "";


  /* mostra sucesso */

  erro.textContent =
    "Ideia publicada com sucesso!";


  /* atualiza tudo */

  desenhar();


  /* mantém no mural */

  estado.aba =
    "mural";

  estado.pagina =
    "mural";

  mostrarPaginaAtual();


  setTimeout(
    function () {

      erro.textContent =
        "";

    },
    2500
  );

}


/* ==============================
   PÁGINAS
============================== */

function mostrarPaginaAtual() {

  var paginas = [

    "mural",

    "grupos",

    "arquivo",

    "notificacoes",

    "pagina-pessoa",

    "pagina-ideia",

    "pagina-publicar"

  ];


  paginas.forEach(
    function (id) {

      var elemento =
        document.getElementById(
          id
        );

      if (elemento) {

        elemento.classList.add(
          "escondido"
        );

      }

    }
  );


  var atual =
    document.getElementById(
      estado.pagina
    );


  if (atual) {

    atual.classList.remove(
      "escondido"
    );

  }


  atualizarAbas();

}


/* ==============================
   TROCAR ABA
============================== */

function trocarAba(qual) {

  estado.aba =
    qual;

  estado.pagina =
    qual;

  mostrarPaginaAtual();

  desenhar();

}


/* ==============================
   ABAS
============================== */

function atualizarAbas() {

  var abas = [

    {
      id: "aba-mural",
      pagina: "mural"
    },

    {
      id: "aba-grupos",
      pagina: "grupos"
    },

    {
      id: "aba-arquivo",
      pagina: "arquivo"
    },

    {
      id: "aba-notificacoes",
      pagina: "notificacoes"
    }

  ];


  abas.forEach(
    function (item) {

      var botao =
        document.getElementById(
          item.id
        );

      if (!botao) {
        return;
      }

      botao.classList.toggle(
        "ativa",
        estado.aba ===
        item.pagina
      );

    }
  );

}


/* ==============================
   DESENHAR TUDO
============================== */

function desenhar() {

  desenharMural();

  desenharGrupos();

  desenharArquivo();

  desenharNotificacoes();

  desenharPessoa();

  desenharIdeia();

  atualizarContadorNotificacoes();

}


/* ==============================
   INICIAR
============================== */

function iniciar() {

  if (
    !DADOS.pessoas ||
    DADOS.pessoas.length === 0
  ) {

    console.error(
      "Nenhuma pessoa encontrada em DADOS."
    );

    return;

  }


  /* pessoa inicial */

  estado.pessoa =
    Number(
      DADOS.pessoas[0].id
    );


  /* ==========================
     NAVEGANDO COMO
  ========================== */

  var seletor =
    document.getElementById(
      "quem"
    );


  if (seletor) {

    seletor.innerHTML =
      "";

    DADOS.pessoas.forEach(
      function (pessoa) {

        var option =
          document.createElement(
            "option"
          );

        option.value =
          pessoa.id;

        option.textContent =
          pessoa.nome;

        seletor.appendChild(
          option
        );

      }
    );


    seletor.value =
      estado.pessoa;


    seletor.addEventListener(
      "change",
      function () {

        estado.pessoa =
          Number(
            this.value
          );

        estado.aba =
          "mural";

        estado.pagina =
          "mural";

        mostrarPaginaAtual();

        desenhar();

      }
    );

  }


  /* ==========================
     ABAS
  ========================== */

  var abaMural =
    document.getElementById(
      "aba-mural"
    );

  if (abaMural) {

    abaMural.addEventListener(
      "click",
      function () {

        trocarAba(
          "mural"
        );

      }
    );

  }


  var abaGrupos =
    document.getElementById(
      "aba-grupos"
    );

  if (abaGrupos) {

    abaGrupos.addEventListener(
      "click",
      function () {

        trocarAba(
          "grupos"
        );

      }
    );

  }


  var abaArquivo =
    document.getElementById(
      "aba-arquivo"
    );

  if (abaArquivo) {

    abaArquivo.addEventListener(
      "click",
      function () {

        trocarAba(
          "arquivo"
        );

      }
    );

  }


  var abaNotificacoes =
    document.getElementById(
      "aba-notificacoes"
    );

  if (abaNotificacoes) {

    abaNotificacoes.addEventListener(
      "click",
      function () {

        trocarAba(
          "notificacoes"
        );

      }
    );

  }


  /* ==========================
     BUSCA
  ========================== */

  var busca =
    document.getElementById(
      "busca"
    );

  if (busca) {

    busca.addEventListener(
      "input",
      function () {

        estado.busca =
          this.value;

        desenharMural();

      }
    );

  }


  /* ==========================
     PUBLICAR IDEIA
  ========================== */

  var formIdeia =
    document.getElementById(
      "form-ideia"
    );


  if (formIdeia) {

    formIdeia.addEventListener(
      "submit",
      function (evento) {

        evento.preventDefault();

        publicarIdeia();

      }
    );

  }


  /* ==========================
     VOLTAR PESSOA
  ========================== */

  var voltarPessoa =
    document.getElementById(
      "voltar-pessoa"
    );

  if (voltarPessoa) {

    voltarPessoa.addEventListener(
      "click",
      function () {

        estado.pagina =
          "mural";

        estado.aba =
          "mural";

        mostrarPaginaAtual();

        desenharMural();

      }
    );

  }


  /* ==========================
     VOLTAR IDEIA
  ========================== */

  var voltarIdeia =
    document.getElementById(
      "voltar-ideia"
    );

  if (voltarIdeia) {

    voltarIdeia.addEventListener(
      "click",
      function () {

        estado.pagina =
          "mural";

        estado.aba =
          "mural";

        mostrarPaginaAtual();

        desenharMural();

      }
    );

  }


  /* ==========================
     VOLTAR PUBLICAÇÃO
  ========================== */

  var voltarPublicar =
    document.getElementById(
      "voltar-publicar"
    );

  if (voltarPublicar) {

    voltarPublicar.addEventListener(
      "click",
      function () {

        estado.pagina =
          "mural";

        estado.aba =
          "mural";

        mostrarPaginaAtual();

        desenharMural();

      }
    );

  }


  /* ==========================
     NOTIFICAÇÕES
  ========================== */

  var marcarNotificacoes =
    document.getElementById(
      "marcar-notificacoes"
    );

  if (marcarNotificacoes) {

    marcarNotificacoes.addEventListener(
      "click",
      function () {

        marcarTodasComoLidas();

      }
    );

  }


  /* ==========================
     BASE
  ========================== */

  var base =
    document.getElementById(
      "base"
    );

  if (base) {

    base.textContent =
      "base: " +
      DADOS.codigo;

  }


  /* ==========================
     INICIAR
  ========================== */

  mostrarPaginaAtual();

  desenhar();

}


/* ==============================
   EXECUTAR
============================== */

iniciar();
