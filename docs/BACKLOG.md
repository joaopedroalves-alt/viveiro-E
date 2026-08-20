# BACKLOG.md

# Viveiro — Backlog

Documento herdado. Escrito ao longo do 1º semestre de 2026 pela equipe anterior.
Última alteração: 2026-05-28.

> Algumas histórias passaram pela revisão do cliente e outras não. A equipe
> realizou a triagem da especificação herdada antes de definir o compromisso
> da sprint.

---

# 1. Triagem da especificação herdada

A equipe analisou as histórias presentes na especificação herdada,
identificando problemas de linguagem, critérios de aceitação e conformidade
com as normas da instituição.

Cinco histórias foram identificadas como defeituosas e precisam ser
corrigidas antes de serem consideradas prontas:

- V-02 — Filtro por curso
- V-04 — Encontrar ideias que combinam comigo
- V-06 — Estados da ideia
- V-08 — Não perder o que foi escrito
- V-09 — Aviso de novo interessado

As demais histórias foram mantidas na triagem, pois não foram apontadas
nos materiais fornecidos como pertencentes às cinco histórias defeituosas.

## Critérios utilizados na triagem

| ID | Problema identificado | Decisão |
|---|---|---|
| V-02 | Tarefa disfarçada de história, solução de interface prescrita e critério vazio. | Corrigir |
| V-04 | Critérios de aceitação não verificáveis. | Corrigir |
| V-06 | Persona genérica, finalidade circular e critério vazio. | Corrigir |
| V-08 | Persona genérica e solução técnica prescrita no critério. | Corrigir |
| V-09 | A história pressupõe uso de celular, contrariando a Norma 2. | Corrigir |
| V-01 | Não foi apontada nos materiais como uma das cinco histórias defeituosas. | Manter |
| V-03 | Não foi apontada nos materiais como uma das cinco histórias defeituosas. | Manter |
| V-05 | Não foi apontada nos materiais como uma das cinco histórias defeituosas. | Manter |
| V-07 | Não foi apontada nos materiais como uma das cinco histórias defeituosas. | Manter |
| V-10 | A especificação herdada apresenta apenas o título. | Completar |
| V-11 | A especificação herdada apresenta apenas o título. | Completar |
| V-12 | A especificação herdada apresenta apenas o título. | Completar |

> As estimativas em pontos devem ser definidas pela equipe durante a
> negociação/planejamento. A sequência utilizada é:
> **1, 2, 3, 5, 8, 23**.

---

# 2. Histórias de usuário

## V-01 — Página da pessoa

**Situação:** Mantida.

Como aluno que encontrou uma ideia interessante, quero ver a página de quem a publicou, para saber se temos interesses em comum antes de procurá-la.

### Pronto quando:

- clicar no nome do autor, em qualquer cartão, abre a página dessa pessoa;
- a página mostra nome, tipo (aluno ou professor), curso e interesses;
- a página lista as ideias publicadas por essa pessoa, com o título clicável;
- se a pessoa não publicou nenhuma ideia, aparece a frase "ainda não publicou ideias" no lugar da lista vazia;
- existe um caminho de volta ao mural sem usar o botão do navegador.

---

## V-02 — Filtro por curso

**Situação:** Corrigir.

### Problemas identificados

A versão herdada não era uma história de usuário:

> "Implementar filtro por curso na barra lateral do mural."

O texto começa com um verbo no infinitivo e funciona como uma tarefa. Além disso,
"barra lateral" é uma decisão de interface e não uma necessidade do usuário.

O critério "o filtro estiver funcionando" também não é verificável.

### História a ser corrigida

Como **[persona a validar]**, quero filtrar as ideias por curso, para **[finalidade a validar]**.

### Pronto quando:

- o filtro permite selecionar um curso;
- após selecionar um curso, somente as ideias correspondentes ao curso são exibidas;
- é possível remover o filtro e voltar à visualização das ideias sem o filtro.

> A persona e a finalidade devem ser validadas pela equipe/cliente antes de
> considerar a história pronta.

---

## V-03 — Publicar uma ideia

**Situação:** Mantida.

Como aluno com uma ideia na cabeça, quero publicá-la sem depender de ninguém, para que ela exista antes de eu esquecer.

### Pronto quando:

- existe um formulário com título, resumo e tags;
- ao enviar, a ideia aparece no topo do mural imediatamente, sem recarregar a página;
- a ideia criada traz, como autor, o nome de quem está navegando, e a data de hoje;
- título vazio impede o envio e mostra uma mensagem dizendo o que falta;
- a contagem total de ideias exibida no mural aumenta em um.

---

## V-04 — Encontrar ideias que combinam comigo

**Situação:** Corrigir.

Como visitante do mural, quero encontrar rapidamente as ideias que combinam comigo, para não perder tempo.

### Problemas identificados

Os critérios herdados eram:

- "a interface estiver amigável";
- "a busca for rápida";
- "o resultado for relevante".

Esses critérios não são verificáveis.

"Amigável" não define um comportamento observável.

"Rápida" não possui uma medida ou comportamento definido.

"Relevante" apenas repete a finalidade da própria história.

### História a ser corrigida

Como visitante do mural, quero encontrar ideias por meio da busca, para não perder tempo procurando manualmente.

### Pronto quando:

- a busca apresenta as ideias que correspondem ao texto pesquisado;
- a busca considera pelo menos o título e o resumo da ideia;
- quando nenhuma ideia corresponde à busca, é exibida uma mensagem informando que nenhuma ideia foi encontrada.

---

## V-05 — Entrar e sair de um grupo

**Situação:** Mantida.

Como aluno que quer se aproximar de um tema, quero entrar num grupo, para acompanhar o que se discute ali.

### Pronto quando:

- a lista de grupos mostra, em cada grupo, se estou dentro ou fora;
- entrar acrescenta meu nome à lista de membros e o contador sobe;
- sair remove meu nome e o contador desce;
- a lista mostra os nomes dos membros, não apenas o número;
- trocar a pessoa em "navegando como" muda corretamente o que aparece como "meus grupos".

---

## V-06 — Estados da ideia

**Situação:** Corrigir.

### Problemas identificados

A história herdada utiliza "usuário" como persona, sem identificar quem realmente
precisa da funcionalidade.

Além disso, a finalidade é circular:

> "quero que as ideias tenham estados, para que os estados das ideias fiquem registrados."

O critério:

> "os estados estiverem implementados"

também não permite verificar quando a história está pronta.

Os três estados mencionados anteriormente são:

- semente;
- germinando;
- proposta.

### História a ser corrigida

Como **[persona a validar]**, quero acompanhar o estado de uma ideia, para **[finalidade a validar]**.

### Pronto quando:

- os estados possíveis da ideia estão definidos;
- os estados são "semente", "germinando" e "proposta";
- o estado atual da ideia pode ser identificado no sistema;
- estão definidas as regras para mudança de um estado para outro.

> É necessário definir com o cliente quem deve alterar o estado, quando a
> alteração pode ocorrer e quais transições são permitidas.

---

## V-07 — Registrar interesse em participar

**Situação:** Mantida.

Como aluno que quer entrar num projeto, quero declarar interesse numa ideia, para que quem a propôs saiba que pode me chamar.

### Pronto quando:

- cada cartão tem um controle "tenho interesse em participar";
- ao acionar, meu nome passa a constar na lista de interessados daquela ideia;
- a mesma pessoa não consegue se registrar duas vezes na mesma ideia;
- é possível desfazer o interesse, e o nome sai da lista;
- o número de interessados exibido no cartão corresponde ao tamanho da lista.

---

## V-08 — Não perder o que foi escrito

**Situação:** Corrigir.

Como usuário, quero não perder o que escrevi, para não ter que digitar tudo de novo.

### Problemas identificados

A persona "usuário" é genérica e não identifica quem sofre com a perda.

Além disso, o critério original prescreve uma solução técnica:

> `localStorage` usando `JSON.stringify`

Isso é uma decisão de implementação e não um resultado observável.

### História a ser corrigida

Como **[persona a validar]**, quero que o que criei permaneça disponível quando eu voltar ao sistema, para não precisar digitar tudo novamente.

### Pronto quando:

- uma informação criada pelo usuário permanece disponível após fechar o navegador;
- ao abrir novamente o sistema, a informação criada anteriormente pode ser encontrada;
- o conteúdo recuperado corresponde ao que havia sido criado anteriormente.

---

## V-09 — Aviso de novo interessado

**Situação:** Corrigir.

### Problema identificado

A história herdada exige uma notificação no celular:

> "quero receber uma notificação no celular"

e também possui critérios que dependem desse mecanismo:

- receber uma notificação no celular;
- tocar na notificação;
- abrir a ideia pela notificação.

Segundo o material fornecido, isso **fere a Norma 2**, que não permite que uma
funcionalidade pressuponha o uso de celular na escola.

Portanto, não basta apenas alterar o título. O mecanismo vedado precisa ser
retirado de toda a história.

### História a ser corrigida

Como aluno com uma ideia publicada, quero saber quando alguém demonstrar interesse em participar, para não perder a oportunidade de formar um grupo.

### Pronto quando:

- quando alguém demonstrar interesse em uma ideia, o autor consegue identificar que houve um novo interessado;
- o autor consegue identificar o nome de quem demonstrou interesse;
- o autor consegue identificar a ideia em que o interesse foi registrado;
- a informação pode ser consultada pelo sistema sem depender do uso de celular.

> A forma exata de apresentar essa informação deve ser definida pela equipe,
> respeitando a Norma 2.

---

## V-10 — Ideias paradas

**Situação:** Completar.

A especificação herdada apresentava somente o título:

> "ideias paradas"

### História a ser definida pela equipe

Como **[persona a validar]**, quero identificar ideias que estão paradas, para **[finalidade a validar]**.

### Pronto quando:

- estiver definido o que caracteriza uma ideia como "parada";
- estiver definido onde essas ideias serão apresentadas;
- for possível identificar no sistema quais ideias atendem à condição definida.

> A definição exata de "ideia parada" precisa ser validada pela equipe/cliente.

---

## V-11 — Relatório por curso

**Situação:** Completar.

A especificação herdada apresentava somente o título:

> "relatório por curso"

### História a ser definida pela equipe

Como **[persona a validar]**, quero visualizar informações das ideias organizadas por curso, para **[finalidade a validar]**.

### Pronto quando:

- estiver definido quais informações o relatório deve apresentar;
- for possível selecionar ou identificar um curso;
- o relatório apresentar os dados correspondentes ao curso selecionado;
- os dados apresentados corresponderem às informações existentes no sistema.

> O conteúdo e a finalidade exatos do relatório precisam ser validados pela
> equipe/cliente.

---

## V-12 — Exportar / importar o estado

**Situação:** Completar.

A especificação herdada apresentava somente o título:

> "exportar / importar o estado"

### História a ser definida pela equipe

Como **[persona a validar]**, quero exportar e importar o estado do Viveiro, para **[finalidade a validar]**.

### Pronto quando:

- estiver definido quais dados fazem parte do estado a ser exportado;
- for possível exportar o estado definido;
- for possível importar um estado válido;
- os dados importados forem recuperados corretamente no sistema;
- estados inválidos forem identificados e recusados.

> O formato de exportação e importação é uma decisão técnica e deve ser
> definido pela equipe depois que a necessidade estiver estabelecida.

---

# 3. Defeitos conhecidos

Os defeitos abaixo foram identificados no sistema existente.

A ficha de apoio apresenta o caminho técnico para sua correção. Entretanto,
corrigir o defeito não significa automaticamente que ele fará parte da
Sprint. A equipe deve decidir quais defeitos entram no compromisso, em que
ordem e com qual critério de pronto.

---

## B-01 — Não há como desfazer o filtro de etiqueta

**Sintoma:** Depois de clicar em uma etiqueta, o mural fica preso nela. Só
recarregando a página.

**Local:** `src/app.js`, na função `desenharMural`, no trecho do aviso de filtro.

**Correção indicada:**

Quando existir uma etiqueta selecionada, deve existir uma forma de limpar o
filtro.

Uma possibilidade indicada pela ficha é adicionar um botão "limpar filtro"
que:

- define `estado.tag = null`;
- chama `desenharMural()` novamente.

Também é possível desligar o filtro clicando novamente na mesma etiqueta,
mas essa alternativa deve ser escolhida e registrada pela equipe.

**Conferência:**

Clicar em uma etiqueta e depois em "limpar filtro" deve fazer as ideias
voltarem a ser exibidas.

---

## B-02 — Busca sem resultado deixa o mural em branco

**Sintoma:** Ao buscar algo que não existe, a área dos cartões fica vazia,
sem nenhuma explicação.

**Local:** `src/app.js`, na função `desenharMural`.

**Correção indicada:**

Quando a lista de ideias visíveis estiver vazia, deve ser exibida uma mensagem
como:

> "Nenhuma ideia encontrada."

**Conferência:**

Pesquisar uma palavra inexistente deve mostrar a mensagem no lugar dos cartões.

---

## B-03 — A data aparece em formato de máquina

**Sintoma:** O cartão mostra `2026-03-14` em vez de `14/03/2026`.

**Local:** `src/app.js`, na função `montarCartao`.

**Correção indicada:**

Criar uma conversão entre o formato armazenado e o formato exibido.

A ficha apresenta a função:

```javascript
function dataBonita(iso) {
    var partes = iso.split("-");
    return partes[2] + "/" + partes[1] + "/" + partes[0];
}
