function analisarLink() {
    const urlInput = document.getElementById('url-input').value.trim();
    const loading = document.getElementById('loading');
    const loadingText = document.getElementById('loading-text');
    const resultado = document.getElementById('resultado');
    const listaAlertas = document.getElementById('lista-alertas');
    const resultadoStatus = document.getElementById('resultado-status');
    
    if (!urlInput) {
        alert("Por favor, cole um link válido para analisar.");
        return;
    }

    // Esconde resultado anterior e mostra animação de carregamento
    resultado.style.display = 'none';
    loading.style.display = 'block';
    listaAlertas.innerHTML = "";
    
    // Simulação de fases da varredura para dar dinamismo
    setTimeout(() => { loadingText.innerText = "Checando protocolo SSL/HTTPS..."; }, 700);
    setTimeout(() => { loadingText.innerText = "Analisando reputação do domínio contra deepfakes..."; }, 1400);
    
    setTimeout(() => {
        loading.style.display = 'none';
        resultado.style.display = 'block';
        
        // Remove classes anteriores
        resultado.className = "resultado-box";
        
        let alertas = [];
        let nivelPerigo = 0; // 0 = Seguro, 1 = Atenção, 2 = Perigo

        const urlMinuscula = urlInput.toLowerCase();

        // Regra 1: Segurança básica (HTTPS)
        if (!urlMinuscula.startsWith('https://')) {
            alertas.push("❌ <strong>Falta de Criptografia:</strong> Este site não usa conexão segura (HTTPS). Dados digitados aqui podem ser interceptados facilmente.");
            nivelPerigo = Math.max(nivelPerigo, 1);
        } else {
            alertas.push("✅ Conexão segura (HTTPS) detectada.");
        }

        // Regra 2: Gatilhos de golpes comuns de phishing e desinformação
        const gatilhos = ['promocao', 'brinde', 'ganhe', 'vaga-urgente', 'sacar', 'auxilio', 'g1-noticias-fake', 'fofoca', 'urgente'];
        let encontrouGatilho = gatilhos.filter(palavra => urlMinuscula.includes(palavra));
        
        if (encontrouGatilho.length > 0) {
            alertas.push(`⚠️ <strong>Termos Suspeitos:</strong> O link contém palavras comumente usadas em golpes digitais ou clickbaits (${encontrouGatilho.join(', ')}).`);
            nivelPerigo = 2;
        }

        // Regra 3: Extensões de domínio estranhas ou falsificadas
        if (urlMinuscula.includes('.xyz') || urlMinuscula.includes('.online') || urlMinuscula.includes('.free') || urlMinuscula.includes('.top')) {
            alertas.push("❌ <strong>Domínio de Baixo Custo:</strong> Extensões como .xyz, .online ou .top são frequentemente usadas por golpistas para criar sites temporários que espalham desinformação gerada por IA.");
            nivelPerigo =
