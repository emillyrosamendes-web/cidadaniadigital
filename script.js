// Função para acionar o efeito visual de carregamento (Simulação de Análise)
function iniciarAnalise() {
    const linkInput = document.getElementById('linkInput').value.trim();
    const loader = document.getElementById('loader');
    const resultDiv = document.getElementById('result');

    // Limpa resultados anteriores
    resultDiv.style.display = 'none';

    if (!linkInput) {
        resultDiv.style.display = 'block';
        resultDiv.style.backgroundColor = '#fef3c7';
        resultDiv.style.color = '#b45309';
        resultDiv.innerHTML = '⚠️ Por favor, digite ou cole um endereço de site válido.';
        return;
    }

    // Exibe o loader na tela
    loader.style.display = 'block';

    // Aguarda 1.5 segundos para dar a sensação de que o sistema está computando de verdade
    setTimeout(() => {
        loader.style.display = 'none';
        processarAnaliseLink(linkInput, resultDiv);
    }, 1500);
}

// Analisador heurístico interno
function processarAnaliseLink(link, resultDiv) {
    resultDiv.style.display = 'block';
    let score = 0;
    let alertas = [];

    if (link.startsWith('http://')) {
        score += 2;
        alertas.push("Conexão insegura detectada (HTTP padrão). Dados inseridos aqui podem ser interceptados.");
    } else if (!link.startsWith('https://')) {
        score += 1;
        alertas.push("Formatação incomum: links seguros começam obrigatoriamente com https://.");
    }

    const extensoesSuspeitas = ['.xyz', '.net', '.info', '.click', '.top', '.tk', '.biz'];
    extensoesSuspeitas.forEach(ext => {
        if (link.toLowerCase().includes(ext)) {
            score += 3;
            alertas.push(`Extensão de domínio de baixo custo (${ext}). É incomum para canais de imprensa oficiais.`);
        }
    });

    const termosGatilho = ['promocao', 'gratis', 'ganhe', 'urgente', 'vagas', 'exclusivo', 'bizarro', 'vaza'];
    termosGatilho.forEach(termo => {
        if (link.toLowerCase().includes(termo)) {
            score += 2;
            alertas.push(`Gatilho emocional de urgência/recompensa identificado ("${termo}").`);
        }
    });

    // Renderização dos alertas dinâmicos
    if (score === 0) {
        resultDiv.style.backgroundColor = '#d1fae5';
        resultDiv.style.color = '#065f46';
        resultDiv.innerHTML = "<h3>✅ Estrutura Inicial Segura</h3><p>Nenhum indicador clássico de fraude ou clonagem foi pego no teste de domínio. Continue sempre usando seu senso crítico ao ler a matéria!</p>";
    } else if (score <= 2) {
        resultDiv.style.backgroundColor = '#fef3c7';
        resultDiv.style.color = '#92400e';
        resultDiv.innerHTML = "<h3>⚠️ Alerta de Atenção Moderada</h3><p>Encontramos pistas de alerta menores na URL:</p><ul style='padding-left:20px; margin-top:5px;'>" + alertas.map(a => `<li>${a}</li>`).join('') + "</ul>";
    } else {
        resultDiv.style.backgroundColor = '#fee2e2';
        resultDiv.style.color = '#991b1b';
        resultDiv.innerHTML = "<h3>🚨 Alto Risco de Desinformação/Fraude</h3><p>Este link exibe traços idênticos aos usados em campanhas de boatos coordenados ou roubo de contas:</p><ul style='padding-left:20px; margin-top:5px;'>" + alertas.map(a => `<li>${a}</li>`).join('') + "</ul><p style='margin-top:10px;'><strong>Recomendação:</strong> Não dissemine e não forneça informações pessoais.</p>";
    }
}

// Lógica do Quiz Educativo
function responderQuiz(isCorrect) {
    const feedbackBox = document.getElementById('quiz-feedback');
    feedbackBox.style.display = 'block';

    if (isCorrect) {
        feedbackBox.style.backgroundColor = '#d1fae5';
        feedbackBox.style.color = '#065f46';
        feedbackBox.innerHTML = "🎯 Resposta Perfeita! Sinais de dessincronia na fala e no movimento labial são sintomas claros de manipulação digital por IA (Deepfakes). Checar canais centrais resguarda a comunidade.";
    } else {
        feedbackBox.style.backgroundColor = '#fee2e2';
        feedbackBox.style.color = '#991b1b';
        feedbackBox.innerHTML = "❌ Atenção! Agir por impulso espalhando mídias não validadas apenas aumenta o pânico e a desinformação. O correto é sempre conter o avanço do boato e investigar.";
    }
}
