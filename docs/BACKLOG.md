# BACKLOG.md

A equipe realizou a leitura e análise da especificação herdada, classificando cada item do backlog de acordo com sua qualidade e completude.

| ID   | Decisão   | Justificativa                                                                      |
| ---- | --------- | ---------------------------------------------------------------------------------- |
| V-01 | Manter    | História bem definida e com critérios de aceitação verificáveis.                   |
| V-02 | Corrigir  | O critério "o filtro estiver funcionando" é vago e não permite validação objetiva. |
| V-03 | Manter    | História clara, completa e testável.                                               |
| V-04 | Corrigir  | Os critérios utilizam termos subjetivos como "amigável", "rápida" e "relevante".   |
| V-05 | Manter    | Critérios claros e verificáveis.                                                   |
| V-06 | Corrigir  | Não especifica o comportamento esperado dos estados da ideia.                      |
| V-07 | Manter    | História adequada e com critérios objetivos.                                       |
| V-08 | Manter    | Critérios claros e tecnologia de persistência especificada.                        |
| V-09 | Refinar   | O mecanismo de notificação não está suficientemente detalhado.                     |
| V-10 | Completar | A história possuía apenas o título.                                                |
| V-11 | Completar | A história possuía apenas o título.                                                |
| V-12 | Completar | A história possuía apenas o título.                                                |
| B-01 | Manter    | Defeito descrito de forma clara e reproduzível.                                    |
| B-02 | Manter    | Defeito descrito de forma clara e reproduzível.                                    |
| B-03 | Manter    | Defeito descrito de forma clara e reproduzível.                                    |
| B-04 | Manter    | Defeito descrito de forma clara e reproduzível.                                    |
| B-05 | Manter    | Defeito descrito de forma clara e reproduzível.                                    |
| B-06 | Manter    | Defeito descrito de forma clara e reproduzível.                                    |

## Resultado da triagem

Foram mantidas as histórias V-01, V-03, V-05, V-07 e V-08.

Foram corrigidas as histórias V-02, V-04 e V-06 devido à presença de critérios de aceitação vagos ou subjetivos.

A história V-09 foi refinada para tornar o comportamento esperado mais claro.

As histórias V-10, V-11 e V-12 foram completadas, pois continham apenas títulos sem descrição ou critérios de aceitação.

Os defeitos B-01 a B-06 foram mantidos sem alterações por apresentarem descrição suficiente para futura correção.


## Triagem da especificação herdada

### V-01 — Página da pessoa

Como aluno que encontrou uma ideia interessante, quero ver a página de quem a publicou, para saber se temos interesses em comum antes de procurá-la.

**Situação:** Mantida.

**Justificativa:** A história segue o formato "Como... quero... para..." e possui critérios de aceitação claros, objetivos e verificáveis.

---

### V-02 — Filtro por curso

**Situação:** Corrigida.

**Problema identificado:** O critério "o filtro estiver funcionando" não permite verificar objetivamente quando a história está concluída.

**Versão corrigida:**

**Como** visitante do mural, **quero** filtrar as ideias por curso **para** visualizar apenas as ideias do curso desejado.

**Pronto quando:**

* existir um filtro por curso na barra lateral;
* ao selecionar um curso, apenas ideias daquele curso forem exibidas;
* for possível remover o filtro e voltar a visualizar todas as ideias;
* a quantidade de ideias exibidas for atualizada corretamente.

---

### V-03 — Publicar uma ideia

Como aluno com uma ideia na cabeça, quero publicá-la sem depender de ninguém, para que ela exista antes de eu esquecer.

**Situação:** Mantida.

**Justificativa:** A história possui objetivo claro e critérios de aceitação completos e verificáveis.

---

### V-04 — Encontrar ideias que combinam comigo

**Situação:** Corrigida.

**Problema identificado:** Os critérios "interface amigável", "busca rápida" e "resultado relevante" são subjetivos e não podem ser testados objetivamente.

**Versão corrigida:**

**Como** visitante do mural, **quero** pesquisar ideias por palavras-chave **para** encontrar projetos de meu interesse.

**Pronto quando:**

* existir um campo de busca no mural;
* a busca considerar título, resumo e tags;
* apenas as ideias correspondentes forem exibidas;
* quando nenhuma ideia for encontrada, uma mensagem informar que não existem resultados.

---

### V-05 — Entrar e sair de um grupo

Como aluno que quer se aproximar de um tema, quero entrar num grupo, para acompanhar o que se discute ali.****

**Situação:** Mantida.

**Justificativa:** A história apresenta critérios de aceitação claros e suficientes para validar sua implementação.

---

### V-06 — Estados da ideia

**Situação:** Corrigida.

**Problema identificado:** O critério "os estados estiverem implementados" é genérico e não define o comportamento esperado.

**Versão corrigida:**

**Como** usuário, **quero** que cada ideia possua um estado **para** acompanhar sua evolução.

**Pronto quando:**

* toda ideia possuir um estado;
* os estados possíveis forem "Semente", "Germinando" e "Proposta";
* o estado atual for exibido no cartão da ideia;
* o estado puder ser alterado quando necessário.

---

### V-07 — Registrar interesse em participar

Como aluno que quer entrar num projeto, quero declarar interesse numa ideia, para que quem a propôs saiba que pode me chamar.

**Situação:** Mantida.

**Justificativa:** História bem definida, com critérios claros e mensuráveis.

---

### V-08 — Não perder o que foi escrito

Como usuário, quero não perder o que escrevi, para não ter que digitar tudo de novo.

**Situação:** Mantida.

**Justificativa:** Os critérios de aceitação especificam exatamente o comportamento esperado e a tecnologia utilizada para persistência dos dados.

---

## V-09 — Aviso de novo interessado

**Situação:** Corrigida.

**Problema identificado:** A história depende de uma infraestrutura de notificações que não está especificada. Foi necessário deixar o comportamento esperado mais claro.

**Versão corrigida:**

**Como** aluno que publicou uma ideia, **quero** ser avisado quando alguém demonstrar interesse nela **para** conseguir encontrar pessoas interessadas em participar.

**Pronto quando:**

* ao registrar interesse em uma ideia, o autor recebe uma notificação no sistema;
* a notificação informa o nome da pessoa interessada e o título da ideia;
* a notificação direciona para a ideia correspondente;
* a mesma pessoa não gera múltiplas notificações ao demonstrar interesse novamente.

---

## V-10 — Ideias paradas

**Situação:** Corrigida.

**Problema identificado:** A história possuía apenas um título, sem descrição do comportamento esperado.

**Versão corrigida:**

**Como** usuário do Viveiro, **quero** visualizar ideias que não receberam novas interações **para** identificar propostas que precisam de novos participantes ou contribuições.

**Pronto quando:**

* o sistema identifica ideias sem novas interações durante um período definido;
* existe uma forma de visualizar essas ideias separadamente;
* cada ideia exibida informa sua última atualização;
* o usuário consegue acessar a página da ideia normalmente.

---

## V-11 — Relatório por curso

**Situação:** Corrigida.

**Problema identificado:** A história possuía apenas o título, sem informar quais dados deveriam aparecer no relatório.

**Versão corrigida:**

**Como** administrador ou professor, **quero** visualizar um relatório de ideias por curso **para** acompanhar a participação de cada área da instituição.

**Pronto quando:**

* o sistema permite selecionar um curso;
* o relatório apresenta a quantidade de ideias relacionadas ao curso selecionado;
* o relatório apresenta informações básicas das ideias encontradas;
* os dados exibidos correspondem aos dados cadastrados no sistema.

---

## V-12 — Exportar / importar o estado

**Situação:** Corrigida.

**Problema identificado:** A história não especificava quais dados seriam exportados ou importados.

**Versão corrigida:**

**Como** administrador do sistema, **quero** exportar e importar os dados do Viveiro **para** preservar o estado da aplicação e recuperar informações quando necessário.

**Pronto quando:**

* o sistema permite exportar os dados armazenados;
* o arquivo exportado contém as informações necessárias do sistema;
* o sistema permite importar um arquivo válido;
* após a importação, os dados aparecem corretamente no sistema;
* arquivos inválidos são recusados com uma mensagem de erro.


## Defeitos conhecidos

### B-01

**Situação:** Mantido.

**Justificativa:** O defeito está descrito de forma clara e reproduzível.

### B-02

**Situação:** Mantido.

**Justificativa:** O comportamento incorreto está bem definido.

### B-03

**Situação:** Mantido.

**Justificativa:** O problema apresenta claramente o comportamento esperado e o comportamento atual.

### B-04

**Situação:** Mantido.

**Justificativa:** O defeito descreve corretamente um problema de busca com acentuação.

### B-05

**Situação:** Mantido.

**Justificativa:** O erro é objetivo e facilmente verificável.

### B-06

**Situação:** Mantido.

**Justificativa:** O problema de layout está descrito de forma clara e reproduzível.

---

## Conferência com as normas da instituição

Após a triagem, verificou-se que:

* as histórias V-01, V-03, V-05, V-07 e V-08 atendem ao padrão esperado e foram mantidas;
* as histórias V-02, V-04 e V-06 foram corrigidas por apresentarem critérios de aceitação vagos;
* a história V-09 necessita de refinamento por depender de requisitos técnicos não especificados;
* as histórias V-10, V-11 e V-12 permanecem incompletas e deverão ser elaboradas posteriormente;
* os defeitos B-01 a B-06 foram mantidos, pois apresentam descrição suficiente para futura correção.
