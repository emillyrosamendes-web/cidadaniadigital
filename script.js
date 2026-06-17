function verificarResposta(eCorreto) {
    const resultadoDiv = document.getElementById('resultado-quiz');
    
    // Mostra a caixa de resultado
    resultadoDiv.style.display = "block";
    
    if (eCorreto) {
        resultadoDiv.className = "resultado sucesso";
        resultadoDiv.innerHTML = "✨ Correto! Como cidadão digital responsável, o primeiro passo é conter a onda de boatos e validar a informação em fontes confiáveis.";
    } else {
        resultadoDiv.className = "resultado erro";
        resultadoDiv.innerHTML = "❌ Cuidado! Compartilhar no calor do momento ajuda a espalhar desinformação. O ideal é checar os fatos antes de qualquer ação.";
    }
}
