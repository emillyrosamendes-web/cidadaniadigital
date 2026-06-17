// 1. Barra de progresso de leitura dinâmica enquanto o usuário rola a página
window.onscroll = function() {
    atualizarBarraProgresso();
};

function atualizarBarraProgresso() {
    const elementoWin = document.documentElement;
    const scrollDoUsuario = elementoWin.scrollTop || document.body.scrollTop;
    const alturaMaxima = elementoWin.scrollHeight - elementoWin.clientHeight;
    const porcentagem = (scrollDoUsuario / alturaMaxima) * 100;
    document.getElementById("progress-bar").style.width = porcentagem + "%";
}

// 2. Efeito Magnético 3D nos Cards de Informação
function efeitoCard(evento, elemento) {
    const boxCard = elemento.getBoundingClientRect();
    const x = evento.clientX - boxCard.left - (boxCard.width / 2);
    const y = evento.clientY - boxCard.top - (boxCard.height / 2);
    
    // Inclina o card de acordo com a posição do mouse
    elemento.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg) translateY(-5px)`;
}

function limparCard(elemento) {
    elemento.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0deg)`;
}

// 3. Sistema de Feedback Interativo do Quiz de Combate às Fakes
function rodarQuiz(respostaCorreta, botaoClicado) {
    const painel = document.getElementById('feedback-painel');
    painel.style.display = "block";
    
    // Desabilita todos os botões após a escolha
    const botoes = document.querySelectorAll('.opt-btn');
    botoes.forEach(btn => btn.style.pointerEvents = "none");

    if (respostaCorreta) {
        botaoClicado.style.borderColor = "var(--neon-green)";
        painel.className = "feedback-painel feedback-sucesso";
        painel.innerHTML = "<strong>🟢 VERIFICAÇÃO CONCLUÍDA:</strong> Excelente! Você agiu como um verdadeiro guardião digital. Analisar falhas na imagem e validar com fontes oficiais quebra o ciclo de propagação da IA maliciosa.";
    } else {
        botaoClicado.style.borderColor = "var(--neon-red)";
        painel.className = "feedback-painel feedback-erro";
        painel.innerHTML = "<strong>🔴 SISTEMA COMPROMETIDO:</strong> Atenção! Compartilhar no calor do momento é exatamente o que os criadores de deepfakes querem. Você acaba de validar uma fraude mecânica e espalhar pânico.";
    }
}
