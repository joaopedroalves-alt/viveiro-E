# BACKLOG.md

## Triagem da especificação herdada

### V-01 — Página da pessoa

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

**Situação:** Mantida.

**Justificativa:** História bem definida, com critérios claros e mensuráveis.

---

### V-08 — Não perder o que foi escrito

**Situação:** Mantida.

**Justificativa:** Os critérios de aceitação especificam exatamente o comportamento esperado e a tecnologia utilizada para persistência dos dados.

---

### V-09 — Aviso de novo interessado

**Situação:** Necessita refinamento.

**Problema identificado:** A história depende de um sistema de notificações para celular, porém não especifica como essa funcionalidade será implementada nem quais tecnologias serão utilizadas.

---

### V-10 — Ideias paradas

**Situação:** Incompleta.

**Justificativa:** Existe apenas o título da história, sem descrição nem critérios de aceitação.

---

### V-11 — Relatório por curso

**Situação:** Incompleta.

**Justificativa:** Existe apenas o título da história, sem descrição nem critérios de aceitação.

---

### V-12 — Exportar / importar o estado

**Situação:** Incompleta.

**Justificativa:** Existe apenas o título da história, sem descrição nem critérios de aceitação.

---

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
