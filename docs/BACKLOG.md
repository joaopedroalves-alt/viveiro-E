# BACKLOG.md

# Viveiro — Backlog

Documento herdado. Escrito ao longo do 1º semestre de 2026 pela equipe anterior.
Última alteração: 2026-05-28.

## Triagem da especificação herdada

A equipe realizou a leitura da especificação herdada e analisou as histórias de
usuário e os defeitos conhecidos.

As histórias foram classificadas conforme a necessidade de alteração e receberam
uma estimativa de tamanho utilizando os valores definidos pela equipe:
1, 2, 3, 5, 8 e 23.

| ID | Pontos | Decisão | Justificativa |
|---|---:|---|---|
| V-01 | 5 | Manter | História clara e com critérios de aceitação verificáveis. |
| V-02 | 3 | Corrigir | O critério "o filtro estiver funcionando" é vago e não permite verificar objetivamente a conclusão. |
| V-03 | 5 | Manter | História completa, com objetivo claro e critérios verificáveis. |
| V-04 | 8 | Corrigir | Os critérios "interface amigável", "busca rápida" e "resultado relevante" são subjetivos. |
| V-05 | 8 | Manter | Possui critérios de aceitação claros e verificáveis. |
| V-06 | 3 | Corrigir | O critério "os estados estiverem implementados" não define o comportamento esperado. |
| V-07 | 5 | Manter | Possui critérios claros, objetivos e testáveis. |
| V-08 | 3 | Manter | Define claramente o comportamento esperado para armazenamento e recuperação dos dados. |
| V-09 | 8 | Refinar | A necessidade está clara, mas o comportamento da notificação precisa ser melhor especificado. |
| V-10 | 5 | Completar | A história possuía somente o título. |
| V-11 | 8 | Completar | A história possuía somente o título. |
| V-12 | 8 | Completar | A história possuía somente o título. |

---

# Histórias de usuário

## V-01 — Página da pessoa

**Situação:** Mantida.

**Estimativa:** 5 pontos.

Como aluno que encontrou uma ideia interessante, quero ver a página de quem a publicou, para saber se temos interesses em comum antes de procurá-la.

### Pronto quando:

- clicar no nome do autor, em qualquer cartão, abre a página dessa pessoa;
- a página mostra nome, tipo (aluno ou professor), curso e interesses;
- a página lista as ideias publicadas por essa pessoa, com o título clicável;
- se a pessoa não publicou nenhuma ideia, aparece a frase "ainda não publicou ideias" no lugar da lista vazia;
- existe um caminho de volta ao mural sem usar o botão do navegador.

---

## V-02 — Filtro por curso

**Situação:** Corrigida.

**Estimativa:** 3 pontos.

### Problema identificado

O critério original "o filtro estiver funcionando" é vago e não permite verificar objetivamente quando a história está concluída.

### História corrigida

Como visitante do mural, quero filtrar as ideias por curso, para visualizar apenas as ideias do curso desejado.

### Pronto quando:

- existe um filtro por curso na barra lateral do mural;
- ao selecionar um curso, apenas ideias daquele curso são exibidas;
- é possível remover o filtro e voltar a visualizar todas as ideias;
- a quantidade de ideias exibidas é atualizada corretamente.

---

## V-03 — Publicar uma ideia

**Situação:** Mantida.

**Estimativa:** 5 pontos.

Como aluno com uma ideia na cabeça, quero publicá-la sem depender de ninguém, para que ela exista antes de eu esquecer.

### Pronto quando:

- existe um formulário com título, resumo e tags;
- ao enviar, a ideia aparece no topo do mural imediatamente, sem recarregar a página;
- a ideia criada traz, como autor, o nome de quem está navegando, e a data de hoje;
- título vazio impede o envio e mostra uma mensagem dizendo o que falta;
- a contagem total de ideias exibida no mural aumenta em um.

---

## V-04 — Encontrar ideias que combinam comigo

**Situação:** Corrigida.

**Estimativa:** 8 pontos.

### Problema identificado

Os critérios originais utilizam termos subjetivos, como "interface amigável", "busca rápida" e "resultado relevante". Esses termos não permitem uma verificação objetiva.

### História corrigida

Como visitante do mural, quero pesquisar ideias por palavras-chave, para encontrar projetos de meu interesse.

### Pronto quando:

- existe um campo de busca no mural;
- a busca considera título, resumo e tags;
- apenas as ideias correspondentes à busca são exibidas;
- quando nenhuma ideia é encontrada, uma mensagem informa que não existem resultados.

---

## V-05 — Entrar e sair de um grupo

**Situação:** Mantida.

**Estimativa:** 8 pontos.

Como aluno que quer se aproximar de um tema, quero entrar num grupo, para acompanhar o que se discute ali.

### Pronto quando:

- a lista de grupos mostra, em cada grupo, se estou dentro ou fora;
- entrar acrescenta meu nome à lista de membros e o contador sobe;
- sair remove meu nome e o contador desce;
- a lista mostra os nomes dos membros, não apenas o número;
- trocar a pessoa em "navegando como" muda corretamente o que aparece como "meus grupos".

---

## V-06 — Estados da ideia

**Situação:** Corrigida.

**Estimativa:** 3 pontos.

### Problema identificado

O critério original "os estados estiverem implementados" não define quais comportamentos devem ser atendidos para considerar a história concluída.

### História corrigida

Como usuário, quero que as ideias tenham estados, para acompanhar sua evolução.

### Pronto quando:

- toda ideia possui um estado;
- os estados possíveis são "Semente", "Germinando" e "Proposta";
- o estado atual é exibido no cartão da ideia;
- é possível alterar o estado da ideia.

---

## V-07 — Registrar interesse em participar

**Situação:** Mantida.

**Estimativa:** 5 pontos.

Como aluno que quer entrar num projeto, quero declarar interesse numa ideia, para que quem a propôs saiba que pode me chamar.

### Pronto quando:

- cada cartão tem um controle "tenho interesse em participar";
- ao acionar, meu nome passa a constar na lista de interessados daquela ideia;
- a mesma pessoa não consegue se registrar duas vezes na mesma ideia;
- é possível desfazer o interesse, e o nome sai da lista;
- o número de interessados exibido no cartão corresponde ao tamanho da lista.

---

## V-08 — Não perder o que foi escrito

**Situação:** Mantida.

**Estimativa:** 3 pontos.

Como usuário, quero não perder o que escrevi, para não ter que digitar tudo de novo.

### Pronto quando:

- os dados forem salvos em localStorage usando JSON.stringify;
- os dados forem recuperados no carregamento da página.

---

## V-09 — Aviso de novo interessado

**Situação:** Refinada.

**Estimativa:** 8 pontos.

### Problema identificado

A história original especificava uma notificação no celular, mas o comportamento necessário precisava ser melhor definido.

### História refinada

Como aluno com uma ideia publicada, quero receber um aviso quando alguém demonstrar interesse, para não perder a oportunidade de formar um grupo.

### Pronto quando:

- ao registrar interesse, o autor recebe uma notificação;
- a notificação mostra o nome de quem demonstrou interesse;
- a notificação mostra o título da ideia;
- tocar na notificação abre a ideia correspondente;
- uma mesma pessoa não gera múltiplas notificações para o mesmo interesse.

---

## V-10 — Ideias paradas

**Situação:** Completada.

**Estimativa:** 5 pontos.

Como usuário do Viveiro, quero visualizar ideias que não receberam novas interações, para identificar propostas que precisam de novos participantes ou contribuições.

### Pronto quando:

- o sistema identifica ideias sem novas interações durante um período definido;
- existe uma forma de visualizar essas ideias separadamente;
- cada ideia exibida informa sua última atualização;
- o usuário consegue acessar a ideia normalmente.

---

## V-11 — Relatório por curso

**Situação:** Completada.

**Estimativa:** 8 pontos.

Como administrador ou professor, quero visualizar um relatório de ideias por curso, para acompanhar a participação de cada área da instituição.

### Pronto quando:

- o sistema permite selecionar um curso;
- o relatório apresenta a quantidade de ideias relacionadas ao curso selecionado;
- o relatório apresenta informações básicas das ideias encontradas;
- os dados exibidos correspondem aos dados cadastrados no sistema.

---

## V-12 — Exportar / importar o estado

**Situação:** Completada.

**Estimativa:** 8 pontos.

Como administrador do sistema, quero exportar e importar os dados do Viveiro, para preservar o estado da aplicação e recuperar informações quando necessário.

### Pronto quando:

- o sistema permite exportar os dados armazenados;
- o arquivo exportado contém as informações necessárias do sistema;
- o sistema permite importar um arquivo válido;
- após a importação, os dados aparecem corretamente no sistema;
- arquivos inválidos são recusados com uma mensagem de erro.

---

# Defeitos conhecidos

Os defeitos abaixo foram mantidos durante a triagem porque estão descritos de forma suficientemente clara para serem reproduzidos e corrigidos posteriormente.

## B-01 — Filtro por tag não pode ser desfeito

Depois de clicar em uma tag, não há como desfazer o filtro; só recarregando a página.

---

## B-02 — Busca sem resultados

Quando a busca não encontra nada, o mural fica em branco, sem nenhuma explicação.

---

## B-03 — Formato da data

A data aparece como `2026-03-14` em vez de `14/03/2026`.

---

## B-04 — Busca não considera acentuação

Buscar `robotica` não encontra "Robótica"; buscar `Musica` não encontra "música".

---

## B-05 — Contagem de apoios não atualiza imediatamente

O número de apoios no cartão só muda depois que se refaz a busca.

---

## B-06 — Título comprido ultrapassa o cartão

Título comprido vaza para fora do cartão e atravessa o cartão vizinho.
