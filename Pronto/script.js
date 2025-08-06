const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const botaoContinuar = document.querySelector(".botao-continuar");

const perguntas = [
    {
        enunciado: "Você acorda em uma floresta densa, sem lembrar como chegou lá. O sol está se pondo e você precisa decidir:",
        alternativas: [
            {
                texto: "Procurar abrigo imediatamente para se proteger durante a noite",
                consequencia: "Você encontra uma caverna pequena que te protege do frio noturno, mas acorda com fome."
            },
            {
                texto: "Tentar encontrar comida antes que escureça completamente",
                consequencia: "Você encontra algumas frutas silvestres, mas passa a noite exposto ao frio e animais."
            }
        ]
    },
    {
        enunciado: "Ao amanhecer, você ouve o som de água corrente. Seguir o som pode levar você a um rio, que seria uma fonte de água e possível caminho para civilização. Mas você também vê pegadas de animais que parecem levar na direção oposta. O que você faz?",
        alternativas: [
            {
                texto: "Seguir o som da água em busca do rio",
                consequencia: "Você encontra um rio limpo e mata sua sede. Agora precisa decidir se segue o curso d'água."
            },
            {
                texto: "Seguir as pegadas dos animais",
                consequencia: "As pegadas levam você a uma clareira com frutas, mas você continua sem fonte de água confiável."
            }
        ]
    },
    // Adicione mais 3 perguntas seguindo o mesmo padrão
    {
        enunciado: "Você encontra um rio com água limpa. Agora precisa decidir como proceder:",
        alternativas: [
            {
                texto: "Seguir o curso do rio rio abaixo, que pode levar a civilização",
                consequencia: "Após horas caminhando, você avista fumaça ao longe - um possível acampamento!"
            },
            {
                texto: "Construir uma jangada para descer o rio mais rápido",
                consequencia: "A jangada improvisada se rompe em corredeiras e você perde parte de seus suprimentos."
            }
        ]
    },
    {
        enunciado: "Você encontra uma planta desconhecida com frutos brilhantes. O que você faz?",
        alternativas: [
            {
                texto: "Experimentar um pequeno pedaço para testar se é comestível",
                consequencia: "Os frutos são nutritivos e dão a você energia para continuar a jornada."
            },
            {
                texto: "Evitar a planta e continuar procurando por alimentos conhecidos",
                consequencia: "Você perde tempo procurando outras fontes de alimento enquanto sua energia diminui."
            }
        ]
    },
    {
        enunciado: "Você avista um animal ferido. Pode ser uma fonte de alimento, mas também pode ser perigoso. Como você reage?",
        alternativas: [
            {
                texto: "Aproximar-se cuidadosamente para ajudar ou caçar o animal",
                consequencia: "O animal era inofensivo e você consegue carne para vários dias."
            },
            {
                texto: "Dar meia-volta e sair do local rapidamente",
                consequencia: "Você evita um possível perigo, mas continua sem fontes de proteína."
            }
        ]
    }
];

let perguntaAtual = 0;
let pontos = 0;

function mostraPergunta() {
    const pergunta = perguntas[perguntaAtual];
    caixaPerguntas.textContent = pergunta.enunciado;
    caixaAlternativas.innerHTML = "";
    
    pergunta.alternativas.forEach((alternativa, index) => {
        const botao = document.createElement("button");
        botao.textContent = alternativa.texto;
        botao.classList.add("botao-alternativa");
        botao.addEventListener("click", () => selecionarAlternativa(index));
        caixaAlternativas.appendChild(botao);
    });
}

function selecionarAlternativa(index) {
    const alternativa = perguntas[perguntaAtual].alternativas[index];
    textoResultado.textContent = alternativa.consequencia;
    caixaPerguntas.style.display = "none";
    caixaAlternativas.style.display = "none";
    caixaResultado.style.display = "block";
    
    // Lógica de pontos (opcional)
    if (index === 0) pontos += 1;
}

botaoContinuar.addEventListener("click", () => {
    caixaPerguntas.style.display = "block";
    caixaAlternativas.style.display = "flex";
    caixaResultado.style.display = "none";
    
    perguntaAtual++;
    if (perguntaAtual < perguntas.length) {
        mostraPergunta();
    } else {
        fimDoJogo();
    }
});

function fimDoJogo() {
    caixaPerguntas.innerHTML = `<h2>Fim da Jornada!</h2>`;
    caixaAlternativas.innerHTML = "";
    textoResultado.textContent = `Você sobreviveu à floresta! Suas decisões ${pontos >= 3 ? 'foram sábias' : 'poderiam ter sido melhores'}.`;
    caixaResultado.style.display = "block";
    botaoContinuar.textContent = "Jogar Novamente";
    botaoContinuar.addEventListener("click", () => location.reload());
}

// Iniciar o jogo
mostraPergunta();