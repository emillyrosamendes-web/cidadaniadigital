function analisarLink() {
    const linkInput = document.getElementById('linkInput');
    const resultDiv = document.getElementById('result');
    const link = linkInput.value.trim();
    
    // Se o campo estiver vazio
    if (!link) {
        resultDiv.style.display = 'block';
        resultDiv.style.backgroundColor = '#fef08a';
        resultDiv.style.color = '#854d0e';
        resultDiv.innerHTML = 'Por favor, insira um link para que ele possa ser analisado.';
        return;
    }

    resultDiv.style.display = 'block';
    
    let score = 0;
    let alertas = [];

    // 1. Verificação de Segurança Básica (Falta de HTTPS)
    if (link.startsWith('http://')) {
        score += 2;
        alertas.push("O site usa 'http' em vez de 'https'. Isso significa que a conexão não é criptografada e seus dados correm risco.");
    } else if (!link.startsWith('https://')) {
        score += 1;
        alertas.push("O link não parece ter uma estrutura web padrão configurada (falta o https://).");
    }

    // 2. Verificação de Domínios comumente usados em fraudes de curto prazo
    const extensoesSuspeitas = ['.xyz', '.net', '.info', '.click', '.top', '.tk', '.ga'];
    extensoesSuspeitas.forEach(ext => {
        if (link.toLowerCase().includes(ext)) {
            score += 3;
            alertas.push(`Usa a extensão de domínio (${ext}). Sites oficiais e de notícias confiáveis geralmente usam .com.br, .com ou .org.`);
        }
    });

    // 3. Verificação de palavras apelativas (Clickbait/Golpes)
    const termosPerigosos = ['promocao', 'gratis', 'ganhe', 'urgente', 'vagas-abertas', 'exclusivo', 'bizarro', 'corra', 'premiado'];
    termosPerigosos.forEach(termo => {
        if (link.toLowerCase().includes(termo)) {
            score += 2;
            alertas.push(`Contém a palavra chamativa "${termo}", técnica muito usada para atrair cliques em notícias falsas.`);
        }
    });

    // Resultados com base na pontuação acumulada
    if (score === 0) {
        resultDiv.style.backgroundColor = 'var(--success-bg)';
        resultDiv.style.color = 'var(--success)';
        resultDiv.innerHTML = "<h3>✅ Nenhum sinal crítico detectado!</h3><p style='margin-top:5px; font-size:0.9rem;'>A estrutura inicial do link parece padrão. Contudo, sempre leia o conteúdo com senso crítico e confirme se portais de notícias sérios validam a informação.</p>";
    } else if (score <= 2) {
        resultDiv.style.backgroundColor = 'var(--warning-bg)';
        resultDiv.style.color = 'var(--warning)';
        resultDiv.innerHTML = "<h3>⚠️ Ponto de Atenção</h3><p>Esse link apresentou um critério suspeito leve:</p><ul style='margin-top:5px; padding-left:20px;'>" + alertas.map(a => `<li>${a}</li>`).join('') + "</ul>";
    } else {
        resultDiv.style.backgroundColor = 'var(--danger-bg)';
        resultDiv.style.color = 'var(--danger)';
        resultDiv.innerHTML = "<h3>🚨 Alerta de Risco Detectado</h3><p>Este link possui características muito comuns em páginas de notícias falsas, clonadas ou golpes virtuais:</p><ul style='margin-top:5px; padding-left:20px;'>" + alertas.map(a => `<li>${a}</li>`).join('') + "</ul><p style='margin-top:5px;'><strong>Recomendação:</strong> Evite clicar ou compartilhar com seus colegas de escola.</p>";
    }
}
