// =============================================================================
// SPRINT 4 - APPLICATION DEVELOPMENT (CHALLENGE CCR)
// Aluno: Henrique Nicolas Mortari
// =============================================================================

// 1. Armazenamento dos pontos monitorados (Array de Objetos)
const dadosRodovias = [
    { id: 1, rodovia: "SP-348 (Bandeirantes)", km: "KM 28+400", pista: "Norte", altura: 35 },
    { id: 2, rodovia: "SP-330 (Anhanguera)", km: "KM 74+100", pista: "Sul", altura: 85 },
    { id: 3, rodovia: "SP-348 (Bandeirantes)", km: "KM 52+900", pista: "Sul", altura: 115 },
    { id: 4, rodovia: "BR-116 (Via Dutra)", km: "KM 140+300", pista: "Norte", altura: 165 },
    { id: 5, rodovia: "SP-330 (Anhanguera)", km: "KM 82+000", pista: "Norte", altura: 42 },
    { id: 6, rodovia: "BR-116 (Via Dutra)", km: "KM 195+600", pista: "Sul", altura: 190 },
    { id: 7, rodovia: "SP-348 (Bandeirantes)", km: "KM 105+200", pista: "Norte", altura: 125 },
    { id: 8, rodovia: "SP-330 (Anhanguera)", km: "KM 118+800", pista: "Sul", altura: 60 }
];

// 2. Função de Classificação e Regras de Negócio (Estruturas Condicionais)
// Faixas: Até 50cm (Monitorado) | 51 a 90cm (Atenção) | 91 a 130cm (Programada) | >130cm (Prioritária)
function classificarVegetacao(altura) {
    if (altura <= 50) {
        return {
            condicao: "Monitorado",
            classeCss: "status-monitorado",
            acaoRecomendada: "Vegetação sob controle. Manter monitoramento quinzenal de rotina."
        };
    } else if (altura <= 90) {
        return {
            condicao: "Atenção",
            classeCss: "status-atencao",
            acaoRecomendada: "Crescimento moderado. Acompanhar na próxima vistoria de campo."
        };
    } else if (altura <= 130) {
        return {
            condicao: "Intervenção Programada",
            classeCss: "status-programada",
            acaoRecomendada: "Incluir local na programação de roçada mecânica nos próximos 10 dias."
        };
    } else {
        return {
            condicao: "Intervenção Prioritária",
            classeCss: "status-prioritaria",
            acaoRecomendada: "Risco iminente de obstrução visual e placas. Enviar equipe em até 48h."
        };
    }
}

// 3. Processamento de dados com map()
function processarDados(pontos) {
    return pontos.map(ponto => {
        const classificacao = classificarVegetacao(ponto.altura);
        return {
            ...ponto,
            condicao: classificacao.condicao,
            classeCss: classificacao.classeCss,
            acao: classificacao.acaoRecomendada
        };
    });
}

// 4. Cálculo de Métricas Macro (KPIs) usando reduce() e filter()
function atualizarKPIs(listaProcessada) {
    const totalPontos = listaProcessada.length;
    const criticos = listaProcessada.filter(p => p.classeCss === "status-prioritaria").length;
    
    // Altura média da malha via reduce()
    const somaAlturas = listaProcessada.reduce((acc, p) => acc + p.altura, 0);
    const media = totalPontos > 0 ? (somaAlturas / totalPontos).toFixed(0) : 0;

    document.getElementById("kpi-total").textContent = totalPontos;
    document.getElementById("kpi-criticos").textContent = criticos;
    document.getElementById("kpi-media").textContent = `${media} cm`;
}

// 5. Renderização do Dashboard Dinâmico usando forEach()
function renderizarDashboard(lista) {
    const container = document.getElementById("dashboard");
    container.innerHTML = "";

    lista.forEach(ponto => {
        // Cálculo da largura da barra (considerando 200cm como teto crítico visual)
        const percentualBarra = Math.min((ponto.altura / 200) * 100, 100);

        const card = document.createElement("article");
        card.className = `card ${ponto.classeCss}`;
        card.innerHTML = `
            <div class="card-header">
                <div>
                    <h2 class="card-title">${ponto.rodovia}</h2>
                    <p class="card-subtitle">${ponto.km} • Pista ${ponto.pista}</p>
                </div>
                <span class="badge ${ponto.classeCss}">${ponto.condicao}</span>
            </div>

            <div class="metric-row">
                <span>Altura Registrada:</span>
                <strong>${ponto.altura} cm</strong>
            </div>

            <div class="meter-track">
                <div class="meter-bar ${ponto.classeCss}" style="width: ${percentualBarra}%"></div>
            </div>

            <div class="action-container">
                <strong>Ação Recomendada:</strong>
                <p>${ponto.acao}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// =============================================================================
// Inicialização e Controles de Priorização
// =============================================================================
const pontosProcessados = processarDados(dadosRodovias);
atualizarKPIs(pontosProcessados);
renderizarDashboard(pontosProcessados);

// Filtro por Select (Status / Criticidade)
document.getElementById("filtro-status").addEventListener("change", (e) => {
    const valor = e.target.value;
    if (valor === "todos") {
        renderizarDashboard(pontosProcessados);
    } else {
        const filtrados = pontosProcessados.filter(p => p.classeCss.includes(valor));
        renderizarDashboard(filtrados);
    }
});

// Ordenação por Prioridade (maior altura primeiro via sort)
document.getElementById("btn-ordenar").addEventListener("click", () => {
    const ordenados = [...pontosProcessados].sort((a, b) => b.altura - a.altura);
    renderizarDashboard(ordenados);
});

// Restaurar visualização original
document.getElementById("btn-reset").addEventListener("click", () => {
    document.getElementById("filtro-status").value = "todos";
    renderizarDashboard(pontosProcessados);
});