var estado = {
  pessoa: null,
  busca: "",
  tag: null,
  aba: "mural",
  pagina: "mural",
  pessoaAberta: null,
  ideiaAberta: null
};


/* =========================================================
   PESSOAS
========================================================= */

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

  if (pessoa) {
    return pessoa.nome;
  }

  return "Pessoa desconhecida";
}


/* =========================================================
   ARQUIVO
========================================================= */

function lerArquivadas() {
  try {
    return JSON.parse(
      localStorage.getItem("viveiro_arquivadas") || "[]"
    );
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
  return lerArquivadas().includes(Number(id));
}


function arquivarIdeia(id) {
  var lista = lerArquivadas();

  if (!lista.includes(Number(id))) {
    lista.push(Number(id));
  }

  salvarArquivadas(lista);

  estado.pagina = "mural";
  estado.aba = "mural";

  desenhar();
}


function desarquivarIdeia(id) {
  var lista = lerArquivadas().filter(function (item) {
    return Number(item) !== Number(id);
  });

  salvarArquivadas(lista);

  desenhar();
}


/* =========================================================
   NOTIFICAÇÕES
========================================================= */

function lerNotificacoes() {
  try {
    return JSON.parse(
      localStorage.getItem("viveiro_notificacoes") || "[]"
    );
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


function criarNotificacao(texto, pessoaId) {
  var lista = lerNotificacoes();

  lista.unshift({
    id: Date.now(),
    texto: texto,
    pessoa: pessoaId,
    lida: false,
    data: new Date().toLocaleDateString("pt-BR")
  });

  salvarNotificacoes(lista);

  atualizarContadorNotificacoes();
}


function atualizarContadorNotificacoes() {
  var contador = document.getElementById(
    "contador-notificacoes"
  );

  if (!contador) {
    return;
  }

  var lista = lerNotificacoes();

  var naoLidas = lista.filter(function (notificacao) {
    return !notificacao.lida;
  }).length;

  contador.textContent = naoLidas;

  if (naoLidas === 0) {
    contador.style.display = "none";
  } else {
    contador.style.display = "inline-flex";
  }
}


function marcarTodasComoLidas() {
  var lista = lerNotificacoes();

  lista.forEach(function (notificacao) {
    notificacao.lida = true;
  });

  salvarNotificacoes(lista);

  atualizarContadorNotificacoes();

  desenharNotificacoes();
}


function marcarNotificacaoComoLida(id) {
  var lista = lerNotificacoes();

  lista.forEach(function (notificacao) {
    if (Number(notificacao.id) === Number(id)) {
      notificacao.lida = true;
    }
  });

  salvarNotificacoes(lista);

  atualizarContadorNotificacoes();

  desenharNotificacoes();
}


/* =========================================================
   NORMALIZAÇÃO
========================================================= */

function normalizar(texto) {
  return String(texto || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}


/* =========================================================
   PESQUISA E FILTROS
========================================================= */

function ideiasVisiveis() {
  var ideias = DADOS.ideias.slice();

  /*
    O Mural mostra TODAS as ideias,
    exceto as que foram arquivadas.
  */

  ideias = ideias.filter(function (ideia) {
    return !ideiaArquivada(ideia.id);
  });


  /*
    Pesquisa por título, resumo ou tag.
  */

  if (estado.busca.trim() !== "") {
    var busca = normalizar(estado.busca);

    ideias = ideias.filter(function (ideia) {

      var titulo = normalizar(ideia.titulo);
      var resumo = normalizar(ideia.resumo);

      var encontrouTag = ideia.tags.some(function (tag) {
        return normalizar(tag).includes(busca);
      });

      return (
        titulo.includes(busca) ||
        resumo.includes(busca) ||
        encontrouTag
      );
    });
  }


  /*
    Filtro por tag.
  */

  if (estado.tag !== null) {
    ideias = ideias.filter(function (ideia) {
      return ideia.tags.some(function (tag) {
        return normalizar(tag) === normalizar(estado.tag);
      });
    });
  }


  /*
    Ideias mais novas primeiro.
  */

  ideias.sort(function (a, b) {
    return Number(b.id) - Number(a.id);
  });


  return ideias;
}


/* =========================================================
   CARTÃO DE IDEIA
========================================================= */

function montarCartao(ideia) {

  var autor = pessoaPorId(ideia.autor);

  var nomeAutor = autor
    ? autor.nome
    : "Pessoa desconhecida";


  var tagsHTML = "";

  if (Array.isArray(ideia.tags)) {

    tagsHTML = ideia.tags.map(function (tag) {

      return `
        <button
          class="tag"
          type="button"
          onclick="filtrarPorTag('${tag.replace(/'/g, "\\'")}')"
        >
          #${tag}
        </button>
      `;

    }).join("");
  }


  var botaoArquivo = "";

  if (
    estado.pessoa !== null &&
    Number(estado.pessoa) === Number(ideia.autor)
  ) {

    botaoArquivo = ideiaArquivada(ideia.id)
      ? ""
      : `
        <button
          class="acao-arquivar"
          type="button"
          onclick="event.stopPropagation(); arquivarIdeia(${ideia.id})"
        >
          Arquivar
        </button>
      `;
  }


  return `
    <article class="cartao-ideia">

      <div class="cartao-topo">

        <span class="cartao-data">
          ${ideia.data || ""}
        </span>

        ${botaoArquivo}

      </div>


      <h3
        class="cartao-titulo"
        onclick="abrirIdeia(${ideia.id})"
      >
        ${ideia.titulo}
      </h3>


      <p class="cartao-resumo">
        ${ideia.resumo}
      </p>


      <button
        class="cartao-autor"
        type="button"
        onclick="abrirPessoa(${ideia.autor})"
      >
        ${nomeAutor}
      </button>


      <div class="cartao-tags">
        ${tagsHTML}
      </div>


      <div class="cartao-rodape">

        <button
          class="botao-apoio"
          type="button"
          onclick="event.stopPropagation(); apoiarIdeia(${ideia.id})"
        >
          ♡ ${ideia.apoios || 0}
        </button>

        <button
          class="botao-ver"
          type="button"
          onclick="abrirIdeia(${ideia.id})"
        >
          Ver ideia →
        </button>

      </div>

    </article>
  `;
}


/* =========================================================
   APOIAR IDEIA
========================================================= */

function apoiarIdeia(id) {

  var ideia = ideiaPorId(id);

  if (!ideia) {
    return;
  }

  ideia.apoios = Number(ideia.apoios || 0) + 1;


  if (
    estado.pessoa !== null &&
    Number(estado.pessoa) !== Number(ideia.autor)
  ) {

    criarNotificacao(
      nomeDe(estado.pessoa) +
      " apoiou sua ideia: " +
      ideia.titulo,
      ideia.autor
    );
  }


  desenhar();
}


/* =========================================================
   FILTRO POR TAG
========================================================= */

function filtrarPorTag(tag) {

  estado.tag = tag;
  estado.busca = "";

  estado.aba = "mural";
  estado.pagina = "mural";

  desenhar();
}


/* =========================================================
   MURAL
========================================================= */

function desenharMural() {

  var cartoes = document.getElementById("cartoes");
  var contagem = document.getElementById("contagem");

  if (!cartoes) {
    return;
  }

  cartoes.innerHTML = "";


  /*
    PEGA TODAS AS IDEIAS DO DADOS_E.JS
  */

  var ideias = ideiasVisiveis();


  if (contagem) {
    contagem.textContent =
      ideias.length +
      (ideias.length === 1 ? " ideia" : " ideias");
  }


  if (ideias.length === 0) {

    cartoes.innerHTML = `
      <div class="vazio">
        <p>Nenhuma ideia encontrada.</p>
      </div>
    `;

    return;
  }


  ideias.forEach(function (ideia) {

    cartoes.innerHTML += montarCartao(ideia);

  });
}


/* =========================================================
   PÁGINA DA IDEIA
========================================================= */

function abrirIdeia(id) {

  estado.ideiaAberta = Number(id);
  estado.pagina = "ideia";

  desenharIdeia();
  mostrarPaginaAtual();
}


function desenharIdeia() {

  var conteudo = document.getElementById(
    "conteudo-ideia"
  );

  if (!conteudo) {
    return;
  }

  var ideia = ideiaPorId(estado.ideiaAberta);

  if (!ideia) {
    conteudo.innerHTML = `
      <p>Ideia não encontrada.</p>
    `;
    return;
  }


  var autor = pessoaPorId(ideia.autor);


  var tagsHTML = "";

  if (Array.isArray(ideia.tags)) {

    tagsHTML = ideia.tags.map(function (tag) {

      return `
        <button
          class="tag"
          type="button"
          onclick="filtrarPorTag('${tag.replace(/'/g, "\\'")}')"
        >
          #${tag}
        </button>
      `;

    }).join("");
  }


  var botaoArquivo = "";

  if (
    estado.pessoa !== null &&
    Number(estado.pessoa) === Number(ideia.autor)
  ) {

    if (ideiaArquivada(ideia.id)) {

      botaoArquivo = `
        <button
          type="button"
          onclick="desarquivarIdeia(${ideia.id})"
        >
          Desarquivar
        </button>
      `;

    } else {

      botaoArquivo = `
        <button
          type="button"
          onclick="arquivarIdeia(${ideia.id})"
        >
          Arquivar
        </button>
      `;
    }
  }


  conteudo.innerHTML = `

    <article class="pagina-ideia-conteudo">

      <span class="cartao-data">
        ${ideia.data || ""}
      </span>

      <h2>
        ${ideia.titulo}
      </h2>

      <button
        class="cartao-autor"
        type="button"
        onclick="abrirPessoa(${ideia.autor})"
      >
        ${autor ? autor.nome : "Pessoa desconhecida"}
      </button>

      <p class="ideia-resumo">
        ${ideia.resumo}
      </p>

      <div class="cartao-tags">
        ${tagsHTML}
      </div>

      <div class="ideia-apoios">
        ♡ ${ideia.apoios || 0} apoios
      </div>

      <div class="ideia-acoes">

        <button
          type="button"
          onclick="apoiarIdeia(${ideia.id})"
        >
          Apoiar ideia
        </button>

        ${botaoArquivo}

      </div>

    </article>

  `;
}


/* =========================================================
   PÁGINA DA PESSOA
========================================================= */

function abrirPessoa(id) {

  estado.pessoaAberta = Number(id);
  estado.pagina = "pessoa";

  desenharPessoa();
  mostrarPaginaAtual();
}


function desenharPessoa() {

  var conteudo = document.getElementById(
    "conteudo-pessoa"
  );

  if (!conteudo) {
    return;
  }

  var pessoa = pessoaPorId(estado.pessoaAberta);

  if (!pessoa) {
    conteudo.innerHTML = `
      <p>Pessoa não encontrada.</p>
    `;
    return;
  }


  var ideias = DADOS.ideias.filter(function (ideia) {

    return (
      Number(ideia.autor) === Number(pessoa.id) &&
      !ideiaArquivada(ideia.id)
    );

  });


  var ideiasHTML = "";

  if (ideias.length === 0) {

    ideiasHTML = `
      <p class="vazio">
        Esta pessoa ainda não publicou ideias.
      </p>
    `;

  } else {

    ideiasHTML = ideias.map(function (ideia) {

      return `
        <div class="mini-ideia">

          <button
            type="button"
            onclick="abrirIdeia(${ideia.id})"
          >
            ${ideia.titulo}
          </button>

          <span>
            ${ideia.apoios || 0} apoios
          </span>

        </div>
      `;

    }).join("");
  }


  conteudo.innerHTML = `

    <article class="perfil">

      <h2>${pessoa.nome}</h2>

      <p>
        <strong>Tipo:</strong>
        ${pessoa.tipo || "Não informado"}
      </p>

      <p>
        <strong>Curso:</strong>
        ${pessoa.curso || "Não informado"}
      </p>

      <p>
        <strong>Interesses:</strong>
        ${
          Array.isArray(pessoa.interesses)
            ? pessoa.interesses.join(", ")
            : "Não informado"
        }
      </p>

      <h3>Ideias publicadas</h3>

      <div class="lista-mini-ideias">
        ${ideiasHTML}
      </div>

    </article>

  `;
}


/* =========================================================
   GRUPOS
========================================================= */

function desenharGrupos() {

  var lista = document.getElementById(
    "lista-grupos"
  );

  if (!lista) {
    return;
  }

  lista.innerHTML = "";


  DADOS.grupos.forEach(function (grupo) {

    var membros = Array.isArray(grupo.membros)
      ? grupo.membros
      : [];


    var membrosHTML = membros.map(function (id) {

      return `
        <button
          type="button"
          class="membro-grupo"
          onclick="abrirPessoa(${id})"
        >
          ${nomeDe(id)}
        </button>
      `;

    }).join("");


    lista.innerHTML += `

      <article class="cartao-grupo">

        <h3>
          ${grupo.nome}
        </h3>

        <p>
          ${grupo.descricao}
        </p>

        <div class="grupo-membros">
          ${membrosHTML}
        </div>

      </article>

    `;
  });
}


/* =========================================================
   ARQUIVO
========================================================= */

function desenharArquivo() {

  var lista = document.getElementById(
    "lista-arquivo"
  );

  if (!lista) {
    return;
  }

  lista.innerHTML = "";


  var arquivadas = lerArquivadas();


  if (arquivadas.length === 0) {

    lista.innerHTML = `
      <div class="vazio">
        <p>Nenhuma ideia arquivada.</p>
      </div>
    `;

    return;
  }


  arquivadas.forEach(function (id) {

    var ideia = ideiaPorId(id);

    if (!ideia) {
      return;
    }


    lista.innerHTML += `

      <article class="cartao-ideia arquivada">

        <span class="cartao-data">
          ${ideia.data || ""}
        </span>

        <h3
          class="cartao-titulo"
          onclick="abrirIdeia(${ideia.id})"
        >
          ${ideia.titulo}
        </h3>

        <p class="cartao-resumo">
          ${ideia.resumo}
        </p>

        <button
          type="button"
          class="cartao-autor"
          onclick="abrirPessoa(${ideia.autor})"
        >
          ${nomeDe(ideia.autor)}
        </button>

        <div class="cartao-rodape">

          <button
            type="button"
            onclick="desarquivarIdeia(${ideia.id})"
          >
            Desarquivar
          </button>

        </div>

      </article>

    `;
  });
}


/* =========================================================
   NOTIFICAÇÕES
========================================================= */

function desenharNotificacoes() {

  var lista = document.getElementById(
    "lista-notificacoes"
  );

  if (!lista) {
    return;
  }

  lista.innerHTML = "";


  var notificacoes = lerNotificacoes();


  if (notificacoes.length === 0) {

    lista.innerHTML = `
      <div class="vazio">
        <p>Nenhuma notificação.</p>
      </div>
    `;

    return;
  }


  notificacoes.forEach(function (notificacao) {

    lista.innerHTML += `

      <article
        class="notificacao ${
          notificacao.lida ? "lida" : "nao-lida"
        }"
      >

        <p>
          ${notificacao.texto}
        </p>

        <span>
          ${notificacao.data}
        </span>

        ${
          !notificacao.lida
            ? `
              <button
                type="button"
                onclick="marcarNotificacaoComoLida(${notificacao.id})"
              >
                Marcar como lida
              </button>
            `
            : ""
        }

      </article>

    `;
  });
}


/* =========================================================
   PUBLICAÇÃO DE IDEIA
========================================================= */

function publicarIdeia() {

  var tituloInput = document.getElementById(
    "titulo-ideia"
  );

  var resumoInput = document.getElementById(
    "resumo-ideia"
  );

  var tagsInput = document.getElementById(
    "tags-ideia"
  );

  var erro = document.getElementById(
    "erro-ideia"
  );


  if (!tituloInput || !resumoInput || !tagsInput) {

    console.error(
      "Os campos da publicação não foram encontrados."
    );

    return;
  }


  var titulo = tituloInput.value.trim();
  var resumo = resumoInput.value.trim();
  var tagsTexto = tagsInput.value.trim();


  if (erro) {
    erro.textContent = "";
  }


  /*
    Verifica se existe uma pessoa selecionada.
  */

  if (estado.pessoa === null) {

    if (erro) {
      erro.textContent =
        "Selecione uma pessoa antes de publicar.";
    }

    return;
  }


  /*
    Verifica título e resumo.
  */

  if (titulo === "") {

    if (erro) {
      erro.textContent =
        "Digite um título para a ideia.";
    }

    tituloInput.focus();

    return;
  }


  if (resumo === "") {

    if (erro) {
      erro.textContent =
        "Digite uma descrição para a ideia.";
    }

    resumoInput.focus();

    return;
  }


  /*
    Transforma as tags em array.
    Exemplo:
    tecnologia, educação, projeto

    vira:

    ["tecnologia", "educação", "projeto"]
  */

  var tags = [];

  if (tagsTexto !== "") {

    tags = tagsTexto
      .split(",")
      .map(function (tag) {
        return tag.trim();
      })
      .filter(function (tag) {
        return tag !== "";
      });
  }


  /*
    Gera o próximo ID.
  */

  var novoId = 1;


  if (DADOS.ideias.length > 0) {

    novoId =
      Math.max.apply(
        null,
        DADOS.ideias.map(function (ideia) {
          return Number(ideia.id);
        })
      ) + 1;
  }


  /*
    Cria a nova ideia.
  */

  var novaIdeia = {

    id: novoId,

    titulo: titulo,

    resumo: resumo,

    autor: Number(estado.pessoa),

    tags: tags,

    data: new Date().toLocaleDateString("pt-BR"),

    apoios: 0

  };


  /*
    COLOCA A NOVA IDEIA NO ARRAY.

    É ISSO QUE FAZ ELA APARECER NO MURAL.
  */

  DADOS.ideias.unshift(novaIdeia);


  console.log(
    "Nova ideia publicada:",
    novaIdeia
  );

  console.log(
    "Total de ideias:",
    DADOS.ideias.length
  );


  /*
    Limpa o formulário.
  */

  var form = document.getElementById(
    "form-ideia"
  );

  if (form) {
    form.reset();
  }


  /*
    Remove pesquisa e filtros.
  */

  estado.busca = "";
  estado.tag = null;


  /*
    Volta para o Mural.
  */

  estado.aba = "mural";
  estado.pagina = "mural";


  /*
    Redesenha a tela.
  */

  desenhar();


  /*
    Mensagem de sucesso.
  */

  if (erro) {

    erro.textContent =
      "Ideia publicada com sucesso!";

    erro.style.color = "#4f7a52";
  }


  /*
    Remove a mensagem depois de alguns segundos.
  */

  setTimeout(function () {

    if (erro) {
      erro.textContent = "";
    }

  }, 3000);
}


/* =========================================================
   ABAS / PÁGINAS
========================================================= */

function mostrarPaginaAtual() {

  var paginas = [
    "mural",
    "grupos",
    "arquivo",
    "notificacoes",
    "pessoa",
    "ideia",
    "publicar"
  ];


  paginas.forEach(function (pagina) {

    var elemento = document.getElementById(
      pagina === "mural"
        ? "mural"
        : pagina === "grupos"
        ? "grupos"
        : pagina === "arquivo"
        ? "arquivo"
        : pagina === "notificacoes"
        ? "notificacoes"
        : pagina === "pessoa"
        ? "pagina-pessoa"
        : pagina === "ideia"
        ? "pagina-ideia"
        : "pagina-publicar"
    );


    if (elemento) {

      elemento.style.display =
        estado.pagina === pagina
          ? "block"
          : "none";
    }
  });
}


function trocarAba(qual) {

  estado.aba = qual;
  estado.pagina = qual;


  mostrarPaginaAtual();

  desenhar();
}


/* =========================================================
   ABAS VISUAIS
========================================================= */

function atualizarAbas() {

  var abas = [
    "mural",
    "grupos",
    "arquivo",
    "notificacoes"
  ];


  abas.forEach(function (aba) {

    var botao = document.getElementById(
      "aba-" + aba
    );


    if (!botao) {
      return;
    }


    if (estado.aba === aba) {

      botao.classList.add("ativa");

      botao.setAttribute(
        "aria-selected",
        "true"
      );

    } else {

      botao.classList.remove("ativa");

      botao.setAttribute(
        "aria-selected",
        "false"
      );
    }
  });
}


/* =========================================================
   DESENHAR TUDO
========================================================= */

function desenhar() {

  mostrarPaginaAtual();

  atualizarAbas();

  desenharMural();

  desenharGrupos();

  desenharArquivo();

  desenharNotificacoes();

  desenharPessoa();

  desenharIdeia();

  atualizarContadorNotificacoes();
}


/* =========================================================
   INICIAR
========================================================= */

function iniciar() {

  var selectPessoa = document.getElementById(
    "quem"
  );


  /*
    Preenche o select de pessoas.
  */

  if (selectPessoa) {

    selectPessoa.innerHTML = "";

    DADOS.pessoas.forEach(function (pessoa) {

      var option = document.createElement(
        "option"
      );

      option.value = pessoa.id;

      option.textContent = pessoa.nome;

      selectPessoa.appendChild(option);

    });


    /*
      Seleciona a primeira pessoa.
    */

    if (DADOS.pessoas.length > 0) {

      estado.pessoa =
        Number(DADOS.pessoas[0].id);

      selectPessoa.value =
        estado.pessoa;
    }


    /*
      Quando troca de pessoa.
    */

    selectPessoa.addEventListener(
      "change",
      function () {

        estado.pessoa =
          Number(this.value);

        desenhar();

      }
    );
  }


  /* =======================================================
     ABAS
  ======================================================= */

  var abaMural =
    document.getElementById("aba-mural");

  var abaGrupos =
    document.getElementById("aba-grupos");

  var abaArquivo =
    document.getElementById("aba-arquivo");

  var abaNotificacoes =
    document.getElementById("aba-notificacoes");


  if (abaMural) {

    abaMural.addEventListener(
      "click",
      function () {
        trocarAba("mural");
      }
    );

  }


  if (abaGrupos) {

    abaGrupos.addEventListener(
      "click",
      function () {
        trocarAba("grupos");
      }
    );

  }


  if (abaArquivo) {

    abaArquivo.addEventListener(
      "click",
      function () {
        trocarAba("arquivo");
      }
    );

  }


  if (abaNotificacoes) {

    abaNotificacoes.addEventListener(
      "click",
      function () {
        trocarAba("notificacoes");
      }
    );

  }


  /* =======================================================
     PESQUISA
  ======================================================= */

  var busca =
    document.getElementById("busca");


  if (busca) {

    busca.addEventListener(
      "input",
      function () {

        estado.busca = this.value;

        estado.pagina = "mural";
        estado.aba = "mural";

        desenhar();

      }
    );

  }


  /* =======================================================
     BOTÃO MARCAR NOTIFICAÇÕES
  ======================================================= */

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


  /* =======================================================
     FORMULÁRIO DE PUBLICAÇÃO
  ======================================================= */

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


  /* =======================================================
     BOTÕES VOLTAR
  ======================================================= */

  var voltarPessoa =
    document.getElementById(
      "voltar-pessoa"
    );


  if (voltarPessoa) {

    voltarPessoa.addEventListener(
      "click",
      function () {

        estado.pagina = "mural";
        estado.aba = "mural";

        desenhar();

      }
    );

  }


  var voltarIdeia =
    document.getElementById(
      "voltar-ideia"
    );


  if (voltarIdeia) {

    voltarIdeia.addEventListener(
      "click",
      function () {

        estado.pagina = "mural";
        estado.aba = "mural";

        desenhar();

      }
    );

  }


  var voltarPublicar =
    document.getElementById(
      "voltar-publicar"
    );


  if (voltarPublicar) {

    voltarPublicar.addEventListener(
      "click",
      function () {

        estado.pagina = "mural";
        estado.aba = "mural";

        desenhar();

      }
    );

  }


  /* =======================================================
     FORMULÁRIO ANTIGO DE PUBLICAÇÃO
     
     Mantido para não quebrar o HTML caso ele exista.
  ======================================================= */

  var formPublicar =
    document.getElementById(
      "form-publicar"
    );


  if (formPublicar) {

    formPublicar.addEventListener(
      "submit",
      function (evento) {

        evento.preventDefault();

        var titulo =
          document.getElementById(
            "novo-titulo"
          );

        var resumo =
          document.getElementById(
            "novo-resumo"
          );

        var tags =
          document.getElementById(
            "novas-tags"
          );

        var tituloIdeia =
          document.getElementById(
            "titulo-ideia"
          );

        var resumoIdeia =
          document.getElementById(
            "resumo-ideia"
          );

        var tagsIdeia =
          document.getElementById(
            "tags-ideia"
          );


        if (tituloIdeia && titulo) {
          tituloIdeia.value = titulo.value;
        }

        if (resumoIdeia && resumo) {
          resumoIdeia.value = resumo.value;
        }

        if (tagsIdeia && tags) {
          tagsIdeia.value = tags.value;
        }


        publicarIdeia();

      }
    );

  }


  /* =======================================================
     PRIMEIRO DESENHO
  ======================================================= */

  desenhar();

}


/* =========================================================
   EXECUTAR
========================================================= */

iniciar();
