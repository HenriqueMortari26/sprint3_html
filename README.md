# Challenge CCR | Gestão Operacional de Vegetação Rodoviária
**Sprint 4 — Application Development**  
*Prof. Allan Roberto Molto*

## 📌 Descrição da Solução
Aplicação web para monitoramento automatizado e priorização de manejo de vegetação em rodovias concessionadas. O sistema processa dados de sensores e vistorias, classifica os trechos por criticidade e define planos de ação para as equipes de manutenção.

## 📊 Regras de Classificação e Faixas de Corte
| Nível de Criticidade | Faixa de Altura | Condição Operacional | Ação Recomendada |
| :--- | :--- | :--- | :--- |
| **Monitorado** | Até 50 cm | Normal | Manter rotina de inspeção quinzenal. |
| **Atenção** | 51 cm a 90 cm | Crescimento Moderado | Acompanhar na próxima ronda de campo. |
| **Intervenção Programada** | 91 cm a 130 cm | Risco Potencial | Programar roçada mecânica em até 10 dias. |
| **Intervenção Prioritária** | Acima de 130 cm | Crítico (Obstrução) | Despacho emergencial de equipe em até 48h. |

## 🛠️ Tecnologias e Métodos Utilizados
- **HTML5 Semântico & CSS3:** Interface Dark Theme com layout responsivo e cards em Glassmorphism.
- **JavaScript Moderno (ES6+):**
  - `map()`: Processamento em lote e enriquecimento dos pontos com status e ações.
  - `reduce()`: Cálculo dinâmico da altura média da malha rodoviária (KPI).
  - `filter()`: Isolamento de trechos críticos e filtros por condição.
  - `sort()`: Ordenação dinâmica por criticidade/altura da vegetação.
  - `forEach()`: Renderização reativa do DOM.

## 🔗 Links do Projeto
- **Vídeo Pitch (1 minuto):** 