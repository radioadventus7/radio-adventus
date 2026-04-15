// Configurações Globais
const WHATSAPP_RADIO = "5511999999999"; 

const gradeCompleta = [
    { nome: "Amanhecer com Deus", inicio: "05:00", fim: "05:30", logo: "assets/img/lgp-amanhecer-com-deus.png" },
    { nome: "Estudo da Bíblia", inicio: "05:30", fim: "06:00", logo: "assets/img/lgp-esta-escrito.png" },
    { nome: "Mensagem de Esperança", inicio: "06:00", fim: "07:00", logo: "assets/img/lgp-Mensagem-de-esperanca.png" },
    { nome: "Manhã Adventus", inicio: "07:00", fim: "09:00", logo: "assets/img/lgp-manhas-adventus.png" },
    { nome: "Bíblia Responde", inicio: "09:00", fim: "10:00", logo: "assets/img/lgp-a-biblia-responde-adventus.png" },
    { nome: "Mais Família", inicio: "10:00", fim: "11:00", logo: "assets/img/lgp-mais-familias.png" },
    { nome: "Vida Plena", inicio: "11:00", fim: "12:00", logo: "assets/img/lgp-vida-plena-adventus.png" },
    { nome: "Musicando", inicio: "12:00", fim: "13:00", logo: "assets/img/lgp-musicando.png" },
    { nome: "Economize", inicio: "13:00", fim: "13:14", logo: "assets/img/lgp-Economize.png" },
    { nome: "Valores", inicio: "13:15", fim: "13:30", logo: "assets/img/lgp-valores-adventus.png" },
    { nome: "Mais Conexão", inicio: "13:30", fim: "14:00", logo: "assets/img/lgp-mais-conexao-adventus.png" },
    { nome: "Universos Kandengue", inicio: "14:00", fim: "14:30", logo: "assets/img/lgp-universo-kandengue-adventus.png" },
    { nome: "No Altar", inicio: "14:30", fim: "15:00", logo: "assets/img/lgp-no-altar-logo.png" },
    { nome: "Entre Mulheres", inicio: "15:00", fim: "16:00", logo: "assets/img/lgp-entre-mulheres-adventus.png" },
    { nome: "Conversas Cruciais", inicio: "16:00", fim: "17:00", logo: "assets/img/lgp-conversas-crucias-adventus.png" },
    { nome: "Mensagem de Esperança", inicio: "17:00", fim: "18:00", logo: "assets/img/lgp-Mensagem-de-esperanca.png" },
    { nome: "De Regresso a Casa", inicio: "18:00", fim: "19:30", logo: "assets/img/regresso-logo.png" }
];

const audio = document.getElementById('radioAudio');

document.getElementById('volumeControl').addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

// Lógica de Programação
function getProgramacaoAtualizada() {
    const agora = new Date();
    const horaMin = agora.getHours().toString().padStart(2, '0') + ":" + agora.getMinutes().toString().padStart(2, '0');
    
    let index = gradeCompleta.findIndex(p => horaMin >= p.inicio && horaMin < p.fim);
    if(index === -1) index = 0;

    return {
        noAr: gradeCompleta[index],
        proximos: [
            gradeCompleta[(index + 1) % gradeCompleta.length],
            gradeCompleta[(index + 2) % gradeCompleta.length],
            gradeCompleta[(index + 3) % gradeCompleta.length]
        ]
    };
}

// Sistema de Rotas Simples
/*function router(path) {
    const app = document.getElementById('app');
    const dados = getProgramacaoAtualizada();
    window.scrollTo(0,0); // Volta ao topo ao mudar de página

    switch(path) {
        case 'inicio':
            app.innerHTML = renderInicio(dados);
            break;
        case 'curso':
            app.innerHTML = renderCurso();
            break;
        case 'sobre':
            app.innerHTML = `<div class="card-custom p-5"><h2>Sobre a Rádio Adventus</h2><p class="lead">Uma emissora dedicada a levar a mensagem do terceiro anjo a todo o mundo.</p></div>`;
            break;
        case 'contato':
            app.innerHTML = `<div class="card-custom p-5"><h2>Contato</h2><p>Ligue para nós ou envie uma mensagem no WhatsApp oficial.</p></div>`;
            break;

        case 'pedidos':
            app.innerHTML = renderPedidosOração();
            break;
        case 'agenda':
            app.innerHTML = renderAgenda();
            break;
        case 'apoio':
            app.innerHTML = renderApoio();
            break;
        // ... os outros casos que já existiam
    }
    
    document.getElementById('playerProgTitle').innerText = dados.noAr.nome;
}*/

// No seu script.js, mude o topo da função router para:
async function router(path) {
    const app = document.getElementById('app');
    const dados = getProgramacaoAtualizada();
    window.scrollTo(0,0); // Volta ao topo ao mudar de página

    // Limpa o conteúdo atual antes de carregar o novo
    app.innerHTML = ""; 

    switch(path) {
        case 'inicio':
            app.innerHTML = renderInicio(dados);
            break;
        case 'curso':
            app.innerHTML = renderCurso();
            break;
        case 'sobre':
            app.innerHTML = `<div class="card-custom p-5"><h2>Sobre a Rádio Adventus</h2><p class="lead">Uma emissora dedicada a levar a mensagem do terceiro anjo a todo o mundo.</p></div>`;
            break;
        case 'podcast':
            await renderPodcast(); // Espera carregar os dados do YouTube
            break;
        case 'pedidos':
            app.innerHTML = renderPedidosOração();
            break;
        case 'agenda':
            app.innerHTML = renderAgenda();
            break;
        case 'apoio':
            app.innerHTML = renderApoio();
            break;
        case 'contato':
            app.innerHTML = `<div class="card-custom p-5"><h2>Contato</h2><p>Ligue para nós ou envie uma mensagem no WhatsApp oficial.</p></div>`;
            break;
        // ... outros cases
    }
    
    // Recarrega o título no player
    document.getElementById('playerProgTitle').innerText = dados.noAr.nome;
}

// Templates de HTML (Componentização manual)
function renderInicio(dados) {
    return `
        <div class="swiper swiper-hero">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="slide-item" style="background-image: url('https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200')">
                        <div class="slide-overlay">
                            <h1 class="display-5 fw-800">Sintonize na Esperança</h1>
                            <p>As melhores mensagens e louvores para o seu dia.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="hero-program mb-5">
            <div class="row g-4">
                <div class="col-md-6">
                    <div class="p-4 p-lg-5 card-custom h-100 bg-dark text-white">
                        <div class="row">
                            <div class="col-md-6 bg-white rounded-4 text-center">
                                <span class="spinner-grow text-danger spinner-grow-sm" role="status"></span>
                                <span class="fw-bold text-dark">No Ar</span> | <span class="badge bg-danger mb-2">AO VIVO</span>  
                                <img src="${dados.noAr.logo}" class="mt-3 p-2 img-fluid" onerror="this.src='https://via.placeholder.com/150'">
                            </div>
                            <div class="col-md-6 d-none d-md-block">
                                <div class="fw-bold mb-1">${dados.noAr.nome}</div>
                                <p class="opacity-75 fw-bold mb-1">Horário: ${dados.noAr.inicio} - ${dados.noAr.fim}</p>
                                <span class="badge bg-light text-dark p-1 me-1">93.9 FM</span>
                                <p class="py-2 lead" style="font-size: 0.9rem;">Informações essenciais para um melhor estilo de vida e bem-estar.</p>      
                                <button class="btn btn-warning fw-bold rounded-pill" onclick="toggleAudio()">
                                    <i class="bi bi-play-circle-fill me-1"></i> ESCUTAR AGORA
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6">
                    <h4 class="fw-bold mb-3">A Seguir</h4>
                    ${dados.proximos.map(p => `
                        <div class="card-custom mb-3 p-3 d-flex flex-row align-items-center">
                            <img src="${p.logo}" height="50" class="me-3" onerror="this.src='https://via.placeholder.com/50'">
                            <div>
                                <div class="fw-bold">${p.nome}</div>
                                <small class="text-muted">${p.inicio} às ${p.fim}</small>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function renderCurso() {
    return `
        <div class="card-custom p-5">
            <h2 class="fw-bold text-center">Solicitar Curso Bíblico</h2>
            <p class="text-center text-muted">Receba o curso diretamente no seu WhatsApp.</p>
            <div class="row mt-4 justify-content-center">
                <div class="col-md-6">
                    <label class="fw-bold mb-2">Seu Nome</label>
                    <input type="text" id="nomeCurso" class="form-control mb-3" placeholder="Nome Completo">
                    <label class="fw-bold mb-2">Qual curso deseja?</label>
                    <select id="opcaoCurso" class="form-select mb-4">
                        <option>Ouvindo a Voz de Deus</option>
                        <option>Ensinos de Jesus</option>
                        <option>Apocalipse: Revelações de Esperança</option>
                    </select>
                    <button class="btn btn-warning w-100 fw-bold py-3" onclick="enviarWhatsApp()">SOLICITAR VIA WHATSAPP <i class="bi bi-whatsapp"></i></button>
                </div>
            </div>
        </div>
    `;
}

// Serviço de Pedidos de Oração
function renderPedidosOração() {
    return `
        <div class="row justify-content-center animate__animated animate__fadeIn">
            <div class="col-md-8">
                <div class="card-custom p-5 text-center shadow-lg">
                    <div class="mb-4">
                        <i class="bi bi-hands-index-thumb text-warning" style="font-size: 4rem;"></i>
                    </div>
                    <h2 class="fw800 fw-bold mb-3">Mural de Intercessão</h2>
                    <p class="text-muted">"Onde dois ou três estiverem reunidos em meu nome, ali estou." - Mateus 18:20</p>
                    
                    <div class="mt-4 text-start">
                        <div class="mb-3">
                            <label class="form-label fw-bold">Seu Nome ou Iniciais</label>
                            <input type="text" id="nomeOracao" class="form-control form-control-lg rounded-pill" placeholder="Ex: Família Silva">
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-bold">Seu Pedido</label>
                            <textarea id="textoOração" class="form-control rounded-4" rows="4" placeholder="Conte-nos como podemos orar por você..."></textarea>
                        </div>
                        <button class="btn btn-warning w-100 fw-bold py-3 rounded-pill shadow-sm" onclick="enviarOracao()">
                            <i class="bi bi-send-fill me-2"></i> ENVIAR PARA A EQUIPE DE ORAÇÃO
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Serviço de Apoio (Doação) Apoio e Gratidão (Dízimos e Ofertas)
function renderApoio() {
    return `
        <div class="row justify-content-center animate__animated animate__zoomIn">
            <div class="col-md-6 text-center">
                <div class="card-custom p-5">
                    <i class="bi bi-heart-fill text-danger mb-3" style="font-size: 3rem;"></i>
                    <h2 class="fw-800">Oferta de Gratidão</h2>
                    <p class="mb-4">Sua fidelidade ajuda a levar a mensagem de salvação para lugares que nossos pés não podem alcançar.</p>
                    
                    <div class="p-4 bg-light rounded-4 mb-4 border-dashed">
                        <small class="text-uppercase fw-bold text-muted">Chave PIX Oficial</small>
                        <h4 class="fw-bold text-azul-escuro mb-0">doacoes@radioadventus.org</h4>
                        <button class="btn btn-sm btn-link text-decoration-none" onclick="navigator.clipboard.writeText('doacoes@radioadventus.org')">Copiar Chave</button>
                    </div>

                    <a href="https://www.7me.app/" target="_blank" class="btn btn-primary w-100 py-3 rounded-pill fw-bold shadow">
                        <img src="https://www.7me.app/assets/img/logo_7me.png" height="20" class="me-2"> DOAR PELO 7ME
                    </a>
                    <p class="small text-muted mt-3">Seguro e oficial da Igreja Adventista do Sétimo Dia.</p>
                </div>
            </div>
        </div>
    `;
}

// Agenda da Comunidade (Layout de Eventos)
/*function renderAgenda() {
    const eventos = [
        { data: "Sáb, 18 Abr", titulo: "Sábado Jovem", local: "Igreja Central", hora: "17:00" },
        { data: "Dom, 19 Abr", titulo: "Missão Calebe", local: "Praça Municipal", hora: "09:00" },
        { data: "Qua, 22 Abr", titulo: "Noite de Poder", local: "Auditório Rádio", hora: "19:30" }
    ];

    return `
        <div class="animate__animated animate__fadeIn">
            <h2 class="fw-800 mb-4 text-center">Agenda da Comunidade</h2>
            <div class="row g-3">
                ${eventos.map(ev => `
                    <div class="col-md-4">
                        <div class="card-custom p-3 border-start border-laranja border-4">
                            <span class="badge bg-azul-escuro mb-2">${ev.data}</span>
                            <h5 class="fw-bold mb-1">${ev.titulo}</h5>
                            <p class="small text-muted mb-2"><i class="bi bi-geo-alt-fill me-1"></i>${ev.local}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="fw-bold text-laranja">${ev.hora}</span>
                                <button class="btn btn-sm btn-outline-secondary rounded-pill">Lembrar-me</button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}*/

function renderAgenda() {
    const eventos = [
        { data: "Hoje", titulo: "Amanhecer com Deus", hora: "05:00" },
        { data: "Hoje", titulo: "Manhã Adventus", hora: "07:00" },
        { data: "Hoje", titulo: "Vida Plena", hora: "11:00" }
    ];

    return `
        <div class="animate__animated animate__fadeIn">
            <h2 class="fw-800 mb-4 text-center">Programação de Hoje</h2>
            <div class="row g-3">
                ${eventos.map(ev => `
                    <div class="col-md-4">
                        <div class="card-custom p-3 border-start border-laranja border-4 d-flex justify-content-between align-items-center">
                            <div>
                                <span class="badge bg-azul-escuro mb-2">${ev.data}</span>
                                <h5 class="fw-bold mb-1">${ev.titulo}</h5>
                                <span class="fw-bold text-laranja">${ev.hora}</span>
                            </div>
                            <button class="btn-notify" onclick="agendarLembrete('${ev.titulo}', '${ev.hora}', this)">
                                <i class="bi bi-bell"></i>
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="text-center mt-5">
                <p class="text-muted small">Clique no sino para ser avisado quando o programa começar.</p>
            </div>
        </div>
    `;
}

// Podcast e Sermões (Galeria de Áudio)
/*function renderPodcast() {
    const audios = [
        { titulo: "A Volta de Jesus", serie: "Série Apocalipse", duracao: "15 min" },
        { titulo: "Saúde Mental e Fé", serie: "Vida Plena", duracao: "12 min" },
        { titulo: "Histórias para Crianças", serie: "Kandengue", duracao: "08 min" }
    ];

    return `
        <div class="animate__animated animate__fadeIn">
            <h2 class="fw-800 mb-4">Podcasts Adventus</h2>
            <div class="list-group shadow-sm rounded-4 overflow-hidden">
                ${audios.map(a => `
                    <div class="list-group-item list-group-item-action d-flex align-items-center p-3 border-0 border-bottom">
                        <div class="bg-laranja text-white rounded-circle p-3 me-3">
                            <i class="bi bi-mic-fill"></i>
                        </div>
                        <div class="flex-grow-1">
                            <h6 class="mb-0 fw-bold">${a.titulo}</h6>
                            <small class="text-muted">${a.serie}</small>
                        </div>
                        <span class="badge rounded-pill bg-light text-dark me-3">${a.duracao}</span>
                        <i class="bi bi-play-circle-fill fs-3 text-azul-escuro pointer"></i>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}*/

// Configurações do YouTube
const YT_API_KEY = "AIzaSyAOm1iycFkOCAUVqa-N5BUzGl1l1hmqdZY"; // Coloque sua chave aqui
const YT_PLAYLIST_ID = "https://youtube.com/playlist?list=PLBD4khZo_-zRuHotlQa-Z6kPlxywUms8S&si=F1lMFqF86jSePEqm"; // Coloque o ID da playlist aqui

async function renderPodcast() {
    // Primeiro, injetamos a estrutura básica com um "Loading"
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="animate__animated animate__fadeIn">
            <h2 class="fw-800 mb-4 text-azul-escuro">
                <i class="bi bi-mic-fill text-laranja me-2"></i>Podcasts e Sermões
            </h2>
            <div id="podcastContainer" class="row g-4">
                <div class="text-center p-5">
                    <div class="spinner-border text-laranja" role="status"></div>
                    <p class="mt-2 text-muted">Buscando mensagens de esperança...</p>
                </div>
            </div>
        </div>
    `;

    try {
        // Chamada para a API do YouTube
        const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=6&playlistId=${YT_PLAYLIST_ID}&key=${YT_API_KEY}`);
        const data = await response.json();
        
        const container = document.getElementById('podcastContainer');
        
        if (!data.items || data.items.length === 0) {
            container.innerHTML = `<p class="text-center">Nenhum podcast encontrado no momento.</p>`;
            return;
        }

        // Mapeia os vídeos para o HTML
        container.innerHTML = data.items.map(item => {
            const videoId = item.snippet.resourceId.videoId;
            const titulo = item.snippet.title;
            const thumb = item.snippet.thumbnails.high.url;
            const dataPost = new Date(item.snippet.publishedAt).toLocaleDateString('pt-BR');

            return `
                <div class="col-md-4">
                    <div class="card-custom h-100 overflow-hidden shadow-sm border-0">
                        <div class="position-relative">
                            <img src="${thumb}" class="img-fluid w-100" alt="${titulo}">
                            <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" 
                               class="play-overlay d-flex align-items-center justify-content-center">
                                <i class="bi bi-play-circle-fill text-white display-4"></i>
                            </a>
                        </div>
                        <div class="p-3">
                            <small class="text-laranja fw-bold">${dataPost}</small>
                            <h6 class="fw-bold text-azul-escuro mt-1 line-clamp-2">${titulo}</h6>
                            <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" 
                               class="btn btn-outline-primary btn-sm rounded-pill mt-2">
                               <i class="bi bi-youtube me-1"></i> Assistir Agora
                            </a>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

    } catch (error) {
        console.error("Erro ao carregar YouTube:", error);
        document.getElementById('podcastContainer').innerHTML = `
            <div class="alert alert-warning text-center">
                Não foi possível carregar os vídeos agora. Tente novamente mais tarde.
            </div>
        `;
    }
}

// Função para enviar oração via WhatsApp (Reutilizando a lógica)
function enviarOracao() {
    const texto = document.getElementById('textoOração').value;
    if(!texto) return alert("Por favor, escreva seu pedido.");
    const msg = `*Pedido de Oração:* ${texto}`;
    window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_RADIO}&text=${encodeURIComponent(msg)}`, '_blank');
}

// Funções de Ação
function enviarWhatsApp() {
    const nome = document.getElementById('nomeCurso').value;
    const curso = document.getElementById('opcaoCurso').value;
    
    if(!nome) { alert("Por favor, digite seu nome."); return; }

    const mensagem = `Olá Rádio Adventus! Me chamo *${nome}* e gostaria de receber o curso bíblico: *${curso}*.`;
    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_RADIO}&text=${encodeURIComponent(mensagem)}`;
    
    window.open(url, '_blank');
}

function toggleAudio() {
    const icon = document.getElementById('playIcon');
    const footer = document.querySelector('.player-bar');
    if (audio.paused) {
        audio.play();
        icon.classList.replace('bi-play-fill', 'bi-pause-fill');
        footer.classList.add('is-playing'); // Liga a animação
    } else {
        audio.pause();
        icon.classList.replace('bi-pause-fill', 'bi-play-fill');
        footer.classList.remove('is-playing'); // Desliga a animação
    }
}

// Inicialização
router('inicio');

// Atualização automática do título a cada 30 segundos
setInterval(() => { 
    const d = getProgramacaoAtualizada();
    document.getElementById('playerProgTitle').innerText = d.noAr.nome;
}, 30000);


// Função para solicitar permissão de notificações
function solicitarPermissaoNotificacao() {
    if (!("Notification" in window)) {
        alert("Este navegador não suporta notificações de desktop.");
        return;
    }

    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            showToast("Notificações ativadas com sucesso!");
        }
    });
}

// Função para agendar o lembrete (Simulação de lógica de tempo)
function agendarLembrete(nomePrograma, horaInicio, elemento) {
    if (Notification.permission !== "granted") {
        solicitarPermissaoNotificacao();
        return;
    }

    // Alterna o estado visual do botão
    elemento.classList.toggle('active');
    
    if (elemento.classList.contains('active')) {
        elemento.innerHTML = '<i class="bi bi-bell-fill"></i>';
        showToast(`Lembrete definido para: ${nomePrograma}`);
        
        // Lógica de agendamento real:
        // Aqui calcularíamos a diferença entre 'agora' e 'horaInicio' 
        // e usaríamos um setTimeout para disparar a notificação.
        verificarDisparoNotificacao(nomePrograma, horaInicio);
    } else {
        elemento.innerHTML = '<i class="bi bi-bell"></i>';
    }
}

function verificarDisparoNotificacao(titulo, hora) {
    // Exemplo de disparo imediato para teste (em um app real, usa-se a hora do programa)
    setTimeout(() => {
        new Notification("Rádio Adventus - No Ar Agora!", {
            body: `Começou: ${titulo}. Sintonize na esperança!`,
            icon: "https://radioadventus.org/wp-content/uploads/2023/04/Logo-Radio-Adventus-Site-1.png"
        });
    }, 5000); // Notifica após 5 segundos para você ver funcionando
}

// Função auxiliar para mostrar um aviso na tela (Toast)
function showToast(mensagem) {
    // Você pode usar o Toast do Bootstrap ou um alert simples
    alert(mensagem); 
}


function toggleTheme() {
    const html = document.documentElement;
    const btn = document.getElementById('themeBtn');
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Atualiza o ícone
    btn.innerHTML = newTheme === 'dark' 
        ? '<i class="bi bi-sun-fill"></i>' 
        : '<i class="bi bi-moon-stars-fill"></i>';
}

// Carregar o tema salvo ao iniciar
(function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    // Ajustar ícone inicial após o DOM carregar
    window.addEventListener('DOMContentLoaded', () => {
        const btn = document.getElementById('themeBtn');
        if(savedTheme === 'dark') btn.innerHTML = '<i class="bi bi-sun-fill"></i>';
    });
})();

// Registro do Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then(() => console.log("Service Worker registrado com sucesso!"))
    .catch(err => console.log("Erro ao registrar Service Worker", err));
}

// Compartilhamento Direto. Muitos ouvintes gostam de convidar amigos para ouvir um programa. Podemos usar a Web Share API.
function compartilharRadio() {
    if (navigator.share) {
        navigator.share({
            title: 'Rádio Adventus',
            text: 'Estou ouvindo a Rádio Adventus. Sintonize você também!',
            url: window.location.href
        });
    } else {
        alert("Link copiado para a área de transferência!");
        navigator.clipboard.writeText(window.location.href);
    }
}