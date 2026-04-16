// Configurações Globais
const WHATSAPP_RADIO = "+244923896963"; 

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
            app.innerHTML = renderSobre();
            break;
        case 'podcast':
            await renderPodcast(); // Espera carregar os dados do YouTube
            break;

        case 'podcasts':
            app.innerHTML = renderPodcasts();
            break;

        case 'pedidos':
            app.innerHTML = renderPedidos();
            break;

        case 'pedidosOracao':
            app.innerHTML = renderPedidosOração();
            break;

        case 'agenda':
            app.innerHTML = renderAgenda();
            break;
        case 'apoio':
            app.innerHTML = renderApoio();
            break;
        case 'contato':
            app.innerHTML = renderContato();
            break;
        // ... outros cases
    }
    
    // Recarrega o título no player
    document.getElementById('playerProgTitle').innerText = dados.noAr.nome;
}

// Templates de HTML (Componentização manual)
function renderInicio(dados) {

    // Exemplo de estrutura dentro do renderInicio
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
                <div class="p-4 p-lg-5 card-custom h-100 bg-dark mode-dark text-white">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="card-bgwhite rounded-4">
                                <span class="badge bg-danger mb-2">NO AR AGORA</span>
                            </div>
                            <div class="rounded-4 text-center">
                                <img src="${dados.noAr.logo}" class="mt-3 p-2 img-fluid rounded-4 card-custom" onerror="this.src='assets/img/logo-radioadventus.png'">
                            </div>
                        </div>
                        <div class="col-md-6 d-none d-md-block">
                            <div class="fw-bold mb-1">
                            <span class="spinner-grow text-danger spinner-grow-sm" role="status"></span> 
                            <h2 class="fw-bold">${dados.noAr.nome}</h2>
                        </div>
                            <p class="opacity-75 fw-bold mb-1">Horário: ${dados.noAr.inicio} - ${dados.noAr.fim}</p>
                            <span class="badge bg-light text-dark p-1 me-1">93.9 FM</span>
                            <small class="textmuted text-white">"A Sintonia da Esperança"</small>
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
                        <img src="${p.logo}" width="160" height="70" class="rounded me-3 flex-shrink-0" onerror="this.src='assets/img/logo-radioadventus.png'">
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

function renderSobre() {
    return `
        <div class="animate__animated animate__fadeIn pb-5">
            <div class="text-center mb-5 py-4 bg-azul-escuro-gradient text-white rounded-5 shadow">
                <img src="assets/img/logo-radioadventus.png" height="80" class="mb-3 filter-white" alt="Logo">
                <h2 class="fw-800 mb-0">Rádio Adventus</h2>
                <p class="opacity-75">A Sintonia da Esperança - 93.9 FM</p>
            </div>

            <div class="row g-4 mt-2">
                
                <div class="col-md-4">
                    <div class="card-custom p-4 h-100 border-top-laranja text-center">
                        <div class="icon-circle bg-laranja-light mb-3">
                            <i class="bi bi-broadcast-pin text-warning"></i>
                        </div>
                        <h4 class="fw-bold text-azul-escuro">Missão</h4>
                        <p class="text-muted-custom">
                            Servir aos nossos ouvintes e internautas com conteúdos de qualidade fundamentados na Bíblia, com a missão de transmitir esperança.
                        </p>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card-custom p-4 h-100 border-top-laranja text-center">
                        <div class="icon-circle bg-laranja-light mb-3">
                            <i class="bi bi-eye-fill text-warning"></i>
                        </div>
                        <h4 class="fw-bold text-azul-escuro">Visão</h4>
                        <p class="text-muted-custom">
                            Ser um dos principais veículos de comunicação cristã em Angola, alcançando corações através das ondas do rádio e da internet.
                        </p>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card-custom p-4 h-100 border-top-laranja text-center">
                        <div class="icon-circle bg-laranja-light mb-3">
                            <i class="bi bi-shield-check text-warning"></i>
                        </div>
                        <h4 class="fw-bold text-azul-escuro">Valores</h4>
                        <ul class="list-unstyled text-muted-custom">
                            <li class="mb-2"><i class="bi bi-check2-circle text-warning me-2"></i>Ética</li>
                            <li class="mb-2"><i class="bi bi-check2-circle text-warning me-2"></i>Transparência</li>
                            <li class="mb-2"><i class="bi bi-check2-circle text-warning me-2"></i>Eficiência</li>
                            <li><i class="bi bi-check2-circle text-warning me-2"></i>Compromisso com Deus e a Humanidade</li>
                        </ul>
                    </div>
                </div>

            </div>

            <div class="mt-5 p-5 card-custom text-center border-0 bg-light">
                <h3 class="fw-bold text-azul-escuro">Nossa Essência</h3>
                <p class="text-muted-custom mx-auto" style="max-width: 800px;">
                    A Rádio Adventus nasceu para ser uma voz de paz em meio ao caos. Através de uma programação diversificada, 
                    unimos música, oração e ensino bíblico para fortalecer a fé de cada angolano. Uma emissora dedicada a levar a mensagem do terceiro anjo a todo o mundo.
                </p>
                <div class="d-flex justify-content-center gap-3 mt-4">
                    <a href="#" onclick="router('contato')" class="btn btn-warning px-4 fw-bold rounded-pill">FALE CONOSCO</a>
                    <a href="#" onclick="router('apoio')" class="btn btn-outline-dark px-4 fw-bold rounded-pill">APOIE ESTA VOZ</a>
                </div>
            </div>
        </div>

    `;
}

function renderCurso() {
    // Banco de dados simples das capas dos cursos (Baseado no seu site)
    const capas = {
        "Apocalipse": "https://radioadventus.org/wp-content/uploads/2023/06/biblia-facil-apocalipse-430x551.png",
        "Profecias de Daniel": "https://radioadventus.org/wp-content/uploads/2023/04/profecas-de-daniel-430x572.webp",
        "Ouvindo a Voz de Deus": "https://radioadventus.org/wp-content/uploads/2023/10/Ouvindo-a-voz-de-Deus-429x650.jpg", 
        "Ensinos de Jesus": "https://radioadventus.org/wp-content/uploads/2023/04/vida-de-Jesus.jpg",
        "Entre Familia": "https://radioadventus.org/wp-content/uploads/2023/06/CAPA-Entre-Familia-430x572.png",
        "O sábado da criação": "https://radioadventus.org/wp-content/uploads/2023/05/o-sabado-na-criacao.png",
        "Fique Leve": "https://radioadventus.org/wp-content/uploads/2023/10/fique-leve.png",
        "O Grande Conflito": "https://radioadventus.org/wp-content/uploads/2024/07/Grande-Conflito-430x572.png"
    };

    return `
        <div class="card-custom p-4 p-md-5 animate__animated animate__fadeIn">
            <h2 class="fw-800 text-center mb-2">Solicitar Curso Bíblico</h2>
            <p class="text-center text-muted-custom mb-4">Preencha os dados abaixo para enviarmos seu material.</p>
            
            <div class="row g-4 mt-2">
                <div class="col-md-5 text-center d-flex flex-column align-items-center justify-content-center border-end-md">
                    <div id="previewCapa" class="mb-3 p-2 bg-white shadow-sm rounded-3 animate__animated animate__pulse animate__infinite">
                        <img id="imgCurso" src="${capas["Ouvindo a Voz de Deus"]}" 
                             class="img-fluid rounded-3" style="max-height: 350px;" alt="Capa do Curso">
                    </div>
                    <span class="badge bg-azul-escuro py-2 px-3">CURSO E MATERIAL GRATUITO</span>
                </div>
          
                <div class="col-md-7">
                    <div class="row g-3">
                        <div class="col-12">
                            <label class="fw-bold mb-1">Curso Escolhido *</label>
                            <select id="opcaoCurso" class="form-select form-control-lg" onchange="atualizarCapa(this.value)">
                                <option value="Ouvindo a Voz de Deus">Ouvindo a Voz de Deus</option>
                                <option value="Apocalipse">Apocalipse: Revelações de Esperança</option>
                                <option value="Profecias de Daniel">Profecias de Daniel</option>
                                <option value="Ensinos de Jesus">Ensinos de Jesus</option>
                                <option value="Entre Familia">Entre Familia</option>
                                <option value="O sábado da criação">O sábado da criação</option>
                                <option value="Fique Leve">Fique Leve</option>
                                <option value="O Grande Conflito">O Grande Conflito</option>
                            </select>
                        </div>

                        <div class="col-12">
                            <label class="fw-bold mb-1">Nome Completo *</label>
                            <input type="text" id="nomeCurso" class="form-control" placeholder="Seu nome">
                        </div>

                        <div class="col-md-6">
                            <label class="fw-bold mb-1">WhatsApp (telefone) *</label>
                            <input type="tel" id="telCurso" class="form-control" 
                                   placeholder="9xx-xxx-xxx" oninput="aplicarMascaraTelefone(this)">
                        </div>

                        <div class="col-md-6">
                            <label class="fw-bold mb-1">E-mail</label>
                            <input type="email" id="emailCurso" class="form-control" placeholder="seu@email.com">
                        </div>

                        <div class="col-md-6">
                            <label class="fw-bold mb-1">Religião *</label>
                            <input type="text" id="religiaoCurso" class="form-control" placeholder="Sua religião ou 'Sem religião'">
                        </div>

                        <div class="col-md-3">
                            <label class="fw-bold mb-1">Idade</label>
                            <input type="number" id="idadeCurso" class="form-control" placeholder="Ex: 25">
                        </div>
                        
                        <div class="col-md-3">
                            <label class="fw-bold mb-1">Gênero</label>
                            <select id="generoCurso" class="form-select">
                                <option>Masculino</option>
                                <option>Feminino</option>
                                <option>Prefiro não dizer</option>
                            </select>
                        </div>

                        <div class="col-12">
                            <label class="fw-bold mb-1">Endereço para envio (Rua, Nº, Bairro, Cidade) *</label>
                            <input type="text" id="enderecoCurso" class="form-control" placeholder="Onde deseja receber o curso?">
                        </div>

                        <div class="col-12 mt-4">
                            <button class="btn btn-warning w-100 fw-bold py-2 shadow-sm" onclick="enviarSolicitacaoCurso()">
                                <i class="bi bi-whatsapp me-2"></i> SOLICITAR VIA WHATSAPP
                            </button>
                            <small class="text-muted d-block mt-2 text-center">* Campos obrigatórios</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Função para atualizar a imagem dinamicamente
function atualizarCapa(curso) {
    const img = document.getElementById('imgCurso');
    const capas = {
        "Apocalipse": "https://radioadventus.org/wp-content/uploads/2023/06/biblia-facil-apocalipse-430x551.png",
        "Profecias de Daniel": "https://radioadventus.org/wp-content/uploads/2023/04/profecas-de-daniel-430x572.webp",
        "Ouvindo a Voz de Deus": "https://radioadventus.org/wp-content/uploads/2023/10/Ouvindo-a-voz-de-Deus-429x650.jpg", 
        "Ensinos de Jesus": "https://radioadventus.org/wp-content/uploads/2023/04/vida-de-Jesus.jpg",
        "Entre Familia": "https://radioadventus.org/wp-content/uploads/2023/06/CAPA-Entre-Familia-430x572.png",
        "O sábado da criação": "https://radioadventus.org/wp-content/uploads/2023/05/o-sabado-na-criacao.png",
        "Fique Leve": "https://radioadventus.org/wp-content/uploads/2023/10/fique-leve.png",
        "O Grande Conflito": "https://radioadventus.org/wp-content/uploads/2024/07/Grande-Conflito-430x572.png"
    };
    
    img.style.opacity = 0;
    setTimeout(() => {
        img.src = capas[curso];
        img.style.opacity = 1;
    }, 300);
}

function aplicarMascaraTelefone(input) {
    let valor = input.value.replace(/\D/g, ""); // Remove tudo que não é número
    
    if (valor.length > 9) valor = valor.slice(0, 9); // Limita aos 9 dígitos de Angola

    // Aplica a formatação 000-000-000
    if (valor.length > 6) {
        valor = valor.replace(/^(\d{3})(\d{3})(\d{3}).*/, "$1-$2-$3");
    } else if (valor.length > 3) {
        valor = valor.replace(/^(\d{3})(\d{3,3})/, "$1-$2");
    }
    
    input.value = valor;
}

// Função de envio atualizada com todos os campos
function enviarSolicitacaoCurso() {
    // Captura dos valores do formulário
    const curso = document.getElementById('opcaoCurso').value;
    const nome = document.getElementById('nomeCurso').value;
    const telefone = document.getElementById('telCurso').value;
    const email = document.getElementById('emailCurso').value || "Não informado";
    const religiao = document.getElementById('religiaoCurso').value;
    const endereco = document.getElementById('enderecoCurso').value;
    const idade = document.getElementById('idadeCurso').value || "--";
    const genero = document.getElementById('generoCurso').value;

    // 1. Validação de segurança de Campos Obrigatórios
    const apenasNumeros = telefone.replace(/\D/g, "");
    if (!nome || apenasNumeros.length < 9 || !religiao || !endereco) {
        alert("⚠️ Por favor, preencha todos os campos obrigatórios corretamente para o envio:\n- Nome\n- WhatsApp\n- Religião (ou escreva 'Sem religião')\n- Endereço.");
        return; // Interrompe a execução se faltar algo
    }

    // 2. Montagem da Mensagem com o código de Angola (+244)
    // Usamos %0A para pular linha e %2B para o símbolo de "+" no link
    const msg = `*SOLICITAÇÃO DE ESTUDO BÍBLICO* %0A%0A` +
                `*Curso:* ${curso}%0A` +
                `*Nome:* ${nome}%0A` +
                `*WhatsApp:* %2B244 ${telefone}%0A` + // Aqui adicionamos o +244 formatado
                `*Religião:* ${religiao}%0A` +
                `*Endereço:* ${endereco}%0A%0A` +
                `- Idade: ${idade}%0A` +
                `- Gênero: ${genero}%0A` +
                `- E-mail: ${email}`;

    // 3. Execução: Abre o WhatsApp da Rádio
    window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_RADIO}&text=${msg}`, '_blank');
}

// Serviço de Pedidos de Oração
function renderPedidosOração() {
    return `
        <div class="row justify-content-center animate__animated animate__fadeIn">
            <div class="col-md-9 col-lg-8">
                <div class="card-custom p-4 p-md-5 border-top-laranja shadow-lg">
                    <div class="text-center mb-4">
                        <div class="mb-3">
                            <i class="bi bi-hands text-warning" style="font-size: 3.5rem;"></i>
                        </div>
                        <h2 class="fw-800 mb-2 text-azul-escuro">Intercessão Adventus</h2>
                        <p class="text-muted-custom small px-md-5">
                            "Confessai as vossas culpas uns aos outros e orai uns pelos outros, para que sareis." - Tiago 5:16
                        </p>
                    </div>
                    
                    <div class="mt-4">
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label class="form-label fw-bold small">Seu Nome ou Iniciais *</label>
                                <input type="text" id="nomeOracao" class="form-control custom-input rounded-pill" placeholder="Ex: Família Silva">
                            </div>

                            <div class="col-md-6">
                                <label class="form-label fw-bold small">Província / Localidade *</label>
                                <select id="localOracao" class="form-select custom-input rounded-pill">
                                    <option value="" selected disabled>Selecione a Província</option>
                                    <option value="Bengo">Bengo</option>
                                    <option value="Benguela">Benguela</option>
                                    <option value="Bié">Bié</option>
                                    <option value="Cabinda">Cabinda</option>
                                    <option value="Cuando Cubango">Cuando Cubango</option>
                                    <option value="Cuanza Norte">Cuanza Norte</option>
                                    <option value="Cuanza Sul">Cuanza Sul</option>
                                    <option value="Cunene">Cunene</option>
                                    <option value="Huambo">Huambo</option>
                                    <option value="Huíla">Huíla</option>
                                    <option value="Luanda">Luanda</option>
                                    <option value="Lunda Norte">Lunda Norte</option>
                                    <option value="Lunda Sul">Lunda Sul</option>
                                    <option value="Malanje">Malanje</option>
                                    <option value="Moxico">Moxico</option>
                                    <option value="Namibe">Namibe</option>
                                    <option value="Uíge">Uíge</option>
                                    <option value="Zaire">Zaire</option>
                                    <option value="Exterior">Exterior (Outro País)</option>
                                </select>
                            </div>

                            <div class="col-12">
                                <label class="form-label fw-bold small">Por quem vamos orar? *</label>
                                <select id="alvoOracao" class="form-select custom-input rounded-pill">
                                    <option value="Por mim mesmo(a)">Por mim mesmo(a)</option>
                                    <option value="Pela minha Família">Pela minha Família</option>
                                    <option value="Pelos meus Pais">Pelos meus Pais</option>
                                    <option value="Pelos meus Filhos">Pelos meus Filhos</option>
                                    <option value="Pelo meu Cônjuge">Meu Cônjuge (Marido/Esposa)</option>
                                    <option value="Por um Amigo ou Irmão">Um Amigo ou Irmão</option>
                                    <option value="Pela Saúde de alguém">Alguém que está doente</option>
                                    <option value="Gratidão/Testemunho">Agradecimento / Testemunho</option>
                                </select>
                            </div>

                            <div class="col-12">
                                <label class="form-label fw-bold small">Seu Pedido ou Agradecimento *</label>
                                <textarea id="textoOração" class="form-control custom-input rounded-4" rows="4" placeholder="Descreva aqui o motivo da oração..."></textarea>
                            </div>

                            <div class="col-12 mt-4">
                                <button class="btn btn-warning w-100 fw-bold py-3 rounded-pill shadow" onclick="enviarOracao()">
                                    <i class="bi bi-chat-heart-fill me-2"></i> ENVIAR PARA O ALTAR DE ORAÇÃO
                                </button>
                                <div class="text-center mt-3">
                                    <span class="badge bg-azul-escuro py-2 px-3 rounded-pill" style="font-size: 0.7rem;">
                                        <i class="bi bi-shield-fill-check me-1"></i> PRIVACIDADE GARANTIDA
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Função de envio atualizada para capturar o "Alvo"
function enviarOracao() {
    const nome = document.getElementById('nomeOracao').value.trim();
    const alvo = document.getElementById('alvoOracao').value;
    const pedido = document.getElementById('textoOração').value.trim();
    const local = document.getElementById('localOracao').value;

    if (!nome || !pedido || !local) {
        alert("⚠️ Por favor, preencha o seu nome e o seu pedido.");
        return;
    }

    const msg = `*PEDIDO DE ORAÇÃO - RÁDIO ADVENTUS*%0A%0A` +
                `*Nome:* ${nome}%0A` +
                `*Interceder por:* ${alvo}%0A%0A` +
                `*Pedido:*%0A${pedido}` +
                `*Província:* ${local}%0A`;

    window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_RADIO}&text=${msg}`, '_blank');
}

function renderPedidos() {
    return `
        <div class="animate__animated animate__fadeIn pb-5">
            <div class="text-center mb-5">
                <i class="bi bi-hands text-warning display-4"></i>
                <h2 class="fw-800 text-azul-escuro">Pedidos e Agradecimentos</h2>
                <p class="text-muted-custom mx-auto" style="max-width: 600px;">
                    "Onde dois ou três estiverem reunidos em meu nome, ali eu estarei no meio deles." – Mateus 18:20
                </p>
            </div>

            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="card-custom p-4 p-md-5 border-top-laranja shadow-lg">
                        <div class="row g-3">
                            
                            <div class="col-md-6">
                                <label class="fw-bold small mb-1">Seu Nome *</label>
                                <input type="text" id="nomeOracao" class="form-control custom-input" placeholder="Nome completo">
                            </div>
                            <div class="col-md-6">
                                <label class="fw-bold small mb-1">Sua Província/Cidade</label>
                                <input type="text" id="localOracao" class="form-control custom-input" placeholder="Ex: Luanda, Talatona">
                            </div>

                            <div class="col-md-6">
                                <label class="fw-bold small mb-1">Tipo de Pedido *</label>
                                <select id="tipoOracao" class="form-select custom-input">
                                    <option value="Pedido de Oração">🙏 Pedido de Oração</option>
                                    <option value="Intercessão">👥 Intercessão (Por outra pessoa)</option>
                                    <option value="Agradecimento">✨ Agradecimento/Testemunho</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label class="fw-bold small mb-1">Por quem deseja orar? *</label>
                                <select id="alvoOracao" class="form-select custom-input">
                                    <option value="Por mim mesmo(a)">Por mim mesmo(a)</option>
                                    <option value="Pela minha Família">Minha Família</option>
                                    <option value="Pelo meu Cônjuge">Meu Marido / Minha Mulher</option>
                                    <option value="Pelos meus Filhos">Meus Filhos</option>
                                    <option value="Pelos meus Pais">Meus Pais</option>
                                    <option value="Por um Amigo/Irmão">Um Amigo / Irmão</option>
                                    <option value="Pela Saúde de alguém">Alguém que está doente</option>
                                    <option value="Saúde">minha Saúde</option>
                                    <option value="vida finaceira">Vida Financeira</option>
                                    <option value="Outros">Outros</option>
                                </select>
                            </div>

                            <div class="col-12">
                                <label class="fw-bold small mb-1">Motivo ou Motivo do Agradecimento *</label>
                                <textarea id="motivoOracao" class="form-control custom-input" rows="4" 
                                    placeholder="Descreva aqui o seu motivo de oração ou o seu testemunho para a rádio..."></textarea>
                            </div>

                            <div class="col-12 mt-4">
                                <button class="btn btn-warning w-100 py-3 fw-bold text-dark rounded-pill shadow-sm" onclick="enviarPedidoOracao()">
                                    ENVIAR PARA O ALTAR DE ORAÇÃO <i class="bi bi-send-check-fill ms-2"></i>
                                </button>
                                <p class="text-center small text-muted-custom mt-3">
                                    <i class="bi bi-shield-lock-fill me-1"></i> Seus dados serão tratados com sigilo e oraremos por você.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Lógica de Envio via WhatsApp
function enviarPedidoOracao() {
    const nome = document.getElementById('nomeOracao').value.trim();
    const local = document.getElementById('localOracao').value.trim() || "Não informado";
    const tipo = document.getElementById('tipoOracao').value;
    const alvo = document.getElementById('alvoOracao').value;
    const motivo = document.getElementById('motivoOracao').value.trim();

    if (!nome || !motivo) {
        alert("⚠️ Por favor, preencha seu nome e o motivo do seu pedido.");
        return;
    }

    const msg = `*${tipo.toUpperCase()} - RÁDIO ADVENTUS*%0A%0A` +
                `*De:* ${nome}%0A` +
                `*Local:* ${local}%0A` +
                `*Alvo da Oração:* ${alvo}%0A%0A` +
                `*Descrição:*%0A${motivo}`;

    window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_RADIO}&text=${msg}`, '_blank');
}

// Serviço de Apoio (Doação) Apoio e Gratidão (Dízimos e Ofertas)
function renderApoio__() {
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

                    <a href="https://giving.7me.app/login" target="_blank" class="btn btn-dark w-100 py-3 rounded-pill fw-bold shadow">
                        <img src="assets/img/logo7me.png" height="20" class="me-2"> DOAR PELO 7ME
                    </a>
                    <p class="small text-muted mt-3">Seguro e oficial da Igreja Adventista do Sétimo Dia.</p>
                </div>
            </div>
        </div>
    `;
}

function renderApoio() {
    return `
        <div class="animate__animated animate__fadeIn pb-5">
            <div class="text-center mb-5">
                <i class="bi bi-cash-coin text-warning mb-3" style="font-size: 3.5rem;"></i>
                <h2 class="fw-800 text-azul-escuro">Apoie este Ministério</h2>
                <p class="text-muted-custom mx-auto" style="max-width: 600px;">
                    Sua oferta ajuda a levar esperança a todos os lares de Angola e do mundo.
                </p>
            </div>

            <div class="row g-4 justify-content-center">
                
                <div class="col-lg-6">
                    <div class="card-custom p-4 h-100 border-top-laranja">
                        <h4 class="fw-bold mb-4 text-center"><i class="bi bi-bank me-2"></i>Transferência Bancária</h4>
                        
                        <div class="bank-list mb-4">
                            <div class="bank-card mb-3 p-3 rounded-4 bg-dark-card text-white">
                                <div class="d-flex justify-content-between align-items-start">
                                    <div>
                                        <small class="text-warning fw-bold">BANCO ATLÂNTICO</small>
                                        <div class="small opacity-75">IBAN: AO06 0055 0000 8999 7274 1019 5</div>
                                    </div>
                                    <button class="btn btn-sm btn-warning" onclick="copiarTexto('AO06005500008999727410195')"><i class="bi bi-copy"></i></button>
                                </div><p class="small text-muted-custom mb-0">Igreja Adventista do Sétimo Dia - UNA</p>
                            </div>

                            <div class="bank-card mb-3 p-3 rounded-4 bg-dark-card text-white">
                                <div class="d-flex justify-content-between align-items-start">
                                    <div>
                                        <small class="text-warning fw-bold">BANCO BAI</small>
                                        <div class="small opacity-75">IBAN: AO06 0040 0000 5941 2496 1028 7</div>
                                    </div>
                                    <button class="btn btn-sm btn-warning" onclick="copiarTexto('AO06004000005941249610287')"><i class="bi bi-copy"></i></button>
                                </div><p class="small text-muted-custom mb-0">Igreja Adventista do Sétimo Dia UNA</p>
                            </div>

                            <div class="bank-card p-3 rounded-4 bg-dark-card text-white">
                                <div class="d-flex justify-content-between align-items-start">
                                    <div>
                                        <small class="text-warning fw-bold">BANCO BFA</small>
                                        <div class="small opacity-75">IBAN: AO06 0006 0000 7972 0780 3022 9</div>
                                    </div>
                                    <button class="btn btn-sm btn-warning" onclick="copiarTexto('AO06000600007972078030229')"><i class="bi bi-copy"></i></button>
                                </div><p class="small text-muted-custom mb-0">União Nordetes de Angola Advª 7º Dia</p>
                                
                            </div>
                        </div>

                        <div class="pt-3 border-top">
                            <div class="card_custom p-2 text-center">
                                <i class="bi bi-heart-fill text-danger mb-3" style="font-size: 3rem;"></i>
                                <h2 class="fw-800">Oferta de Gratidão</h2>
                                <p class="mb-4">Sua fidelidade ajuda a levar a mensagem de salvação para lugares que nossos pés não podem alcançar.</p>
                            </div>
                            <a href="https://giving.7me.app/login" target="_blank" class="btn btn-dark w-100 py-3 rounded-pill fw-bold shadow">
                                <img src="assets/img/logo7me.png" height="20" class="me-2"> DOAR PELO 7ME
                            </a>
                            <p class="text-center small text-muted-custom mt-2">Seguro e oficial da Igreja Adventista.</p>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6">
                    <div class="card-custom p-4 h-100 border-top-laranja">
                        <h4 class="fw-bold mb-3 text-center"><i class="bi bi-whatsapp me-2"></i>Enviar Comprovativo</h4>
                        <p class="small text-muted-custom text-center mb-4">Envie o print ou foto do talão para confirmarmos sua oferta.</p>

                        <div class="row g-3">
                            <div class="col-12">
                                <label class="fw-bold small mb-1">Doador (Opcional)</label>
                                <input type="text" id="nomeDoador" class="form-control custom-input" placeholder="Seu Nome (Vazio = Anónimo)">
                            </div>
                            <div class="col-12">
                                <label class="fw-bold small mb-1">Sua Província / Localização</label>
                                <input type="text" id="endDoador" class="form-control custom-input" placeholder="Ex: Luanda, Benguela...">
                            </div>
                            <div class="col-12">
                                <label class="fw-bold small mb-1">Quantia (Kz) *</label>
                                <div class="input-group">
                                    <span class="input-group-text bg-laranja text-dark fw-bold">Kz</span>
                                    <input type="number" id="valorDoacao" class="form-control custom-input" placeholder="0.00">
                                </div>
                            </div>
                            <div class="col-12 mt-4">
                                <button class="btn btn-warning w-100 py-3 fw-bold text-dark rounded-pill shadow-lg animate__animated animate__pulse animate__infinite" onclick="enviarDoacao()">
                                    CONFIRMAR DOAÇÃO NO WHATSAPP <i class="bi bi-send-fill ms-2"></i>
                                </button>
                            </div>
                        </div>

                        <div class="row justify-content-center mt-4 pt-3 border-top">
                            <div class="col-md-11 p-4 card-custom bg-azul-escuro-gradient text-white text-center rounded-5 shadow-lg">
                                <i class="bi bi-stars text-warning mb-2 fs-3"></i>
                                <p class="mb-0 fs-5 fw-light italic">"Cada um contribua conforme propôs no coração, não com tristeza ou por necessidade, pois Deus ama quem doa com alegria."</p>
                                <small class="opacity-75 text-warning fw-bold">2 Coríntios 9:7</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    `;
}

// LÓGICA DE ENVIO MELHORADA
function enviarDoacao() {
    const nome = document.getElementById('nomeDoador').value.trim();
    const endereco = document.getElementById('endDoador').value.trim() || "Não informado";
    const valor = document.getElementById('valorDoacao').value;

    if(!valor) return alert("Por favor, insira o valor da doação.");

    // Define se é Identificada ou Anónima
    const titulo = nome ? "*DOAÇÃO IDENTIFICADA*" : "*DOAÇÃO ANÓNIMA*";
    const doadorFinal = nome ? nome : "Anónimo";

    const msg = `${titulo}%0A%0A` +
                `*Doador:* ${doadorFinal}%0A` +
                `*Endereço:* ${endereco}%0A` +
                `*Valor:* Kz ${valor}%0A%0A` +
                `_Estou enviando o comprovativo bancário em anexo..._`;

    window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_RADIO}&text=${msg}`, '_blank');
}

function copiarTexto(texto) {
    navigator.clipboard.writeText(texto);
    alert("IBAN copiado para a área de transferência!");
}

function enviarDoacaoAnonima() {
    const msg = `*DOAÇÃO ANÓNIMA*%0A%0A_Olá! Estou enviando um comprovativo de doação para a rádio. Que Deus abençoe este ministério._`;
    window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_RADIO}&text=${msg}`, '_blank');
}

function copiarChave() {
    navigator.clipboard.writeText('doacoes@radioadventus.org');
    alert("Chave PIX copiada!");
}

function renderDoacao() {
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

function renderAgenda__() {
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

function renderAgenda() {
    const eventos = [
        { data: "18", mes: "ABR", titulo: "Impacto Esperança 2026", hora: "09:00", local: "Luanda - Todas as Igrejas", desc: "Distribuição do livro missionário em toda a cidade." },
        { data: "25", mes: "ABR", titulo: "Concerto de Louvor", hora: "17:30", local: "Auditório Adventus", desc: "Uma noite especial de adoração com corais locais." },
        { data: "02", mes: "MAI", titulo: "Seminário de Família", hora: "14:00", local: "Online / WhatsApp", desc: "Dicas bíblicas para um lar mais feliz." }
    ];

    return `
        <div class="animate__animated animate__fadeIn pb-5">
            <div class="text-center mb-5">
                <i class="bi bi-calendar-event-fill text-warning display-4"></i>
                <h2 class="fw-800 text-azul-escuro">Agenda de Eventos</h2>
                <p class="text-muted-custom">Fique por dentro das atividades da nossa rádio e comunidade.</p>
            </div>

            <div class="row justify-content-center">
                <div class="col-lg-8">
                    ${eventos.map(ev => `
                        <div class="card-custom mb-3 p-0 overflow-hidden border-start border-warning border-5 shadow-sm">
                            <div class="d-flex align-items-stretch">
                                <div class="bg-azul-escuro text-white p-4 text-center d-flex flex-column justify-content-center" style="min-width: 100px;">
                                    <span class="display-6 fw-bold lh-1">${ev.data}</span>
                                    <small class="fw-bold text-warning">${ev.mes}</small>
                                </div>
                                <div class="p-3 flex-grow-1">
                                    <h5 class="fw-bold mb-1 text-azul-escuro">${ev.titulo}</h5>
                                    <div class="d-flex flex-wrap gap-3 mb-2 small text-muted-custom">
                                        <span><i class="bi bi-clock text-warning me-1"></i> ${ev.hora}</span>
                                        <span><i class="bi bi-geo-alt text-warning me-1"></i> ${ev.local}</span>
                                    </div>
                                    <p class="small mb-0 text-muted-custom">${ev.desc}</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                    
                    <div class="alert bg-light border-dashed mt-5 text-center p-4">
                        <h6 class="fw-bold">Quer divulgar um evento da sua Igreja?</h6>
                        <p class="small mb-3">Envie os detalhes para a nossa produção via WhatsApp.</p>
                        <button onclick="router('contato')" class="btn btn-sm btn-azul-escuro rounded-pill px-4">ENVIAR EVENTO</button>
                    </div>
                </div>
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

function renderPodcasts() {
    const programas = [
        { titulo: "A Voz da Profecia", host: "Pr. Gilson Brito", img: "https://radioadventus.org/wp-content/uploads/2023/04/vp.jpg", link: "#" },
        { titulo: "Ensinos de Jesus", host: "Equipe Adventus", img: "https://radioadventus.org/wp-content/uploads/2023/04/ensinos.jpg", link: "#" },
        { titulo: "Saúde e Bem-Estar", host: "Dra. Maria Silva", img: "https://radioadventus.org/wp-content/uploads/2023/04/saude.jpg", link: "#" }
    ];

    return `
        <div class="animate__animated animate__fadeIn pb-5">
            <div class="text-center mb-5">
                <i class="bi bi-mic-fill text-warning display-4"></i>
                <h2 class="fw-800 text-azul-escuro">Podcasts & Programas</h2>
                <p class="text-muted-custom">Ouça os seus programas favoritos a qualquer hora, em qualquer lugar.</p>
            </div>

            <div class="row g-4">
                ${programas.map(p => `
                    <div class="col-md-4">
                        <div class="card-custom h-100 border-0 shadow-sm overflow-hidden group">
                            <div class="position-relative">
                                <img src="${p.img}" class="img-fluid w-100" alt="${p.titulo}" style="height: 200px; object-fit: cover;">
                                <div class="card-img-overlay d-flex align-items-center justify-content-center opacity-0 group-hover-opacity-100 transition-all" style="background: rgba(0,51,102,0.7)">
                                    <a href="${p.link}" class="btn btn-warning rounded-pill px-4 fw-bold">OUVIR AGORA <i class="bi bi-play-fill"></i></a>
                                </div>
                            </div>
                            <div class="p-3 text-center">
                                <h5 class="fw-bold mb-1">${p.titulo}</h5>
                                <small class="text-muted-custom d-block mb-3">${p.host}</small>
                                <div class="d-flex justify-content-center gap-2">
                                    <button class="btn btn-sm btn-outline-secondary rounded-circle"><i class="bi bi-share"></i></button>
                                    <button class="btn btn-sm btn-outline-secondary rounded-circle"><i class="bi bi-download"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Função para enviar oração via WhatsApp (Reutilizando a lógica)
function enviarOracao_() {
    const texto = document.getElementById('textoOração').value;
    if(!texto) return alert("Por favor, escreva seu pedido.");
    const msg = `*Pedido de Oração:* ${texto}`;
    window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_RADIO}&text=${encodeURIComponent(msg)}`, '_blank');
}


function renderContato() {
    return `
        <div class="animate__animated animate__fadeIn pb-5">
            <div class="text-center mb-5">
                <i class="bi bi-chat-dots-fill text-warning display-4"></i>
                <h2 class="fw-800 text-azul-escuro">Fale Conosco</h2>
                <p class="text-muted-custom">Estamos prontos para ouvir você. Entre em contacto pelos nossos canais oficiais.</p>
            </div>

            <div class="row g-4">
                <div class="col-lg-5">
                    <div class="card-custom p-4 mb-4 border-top-laranja">
                        <div class="d-flex align-items-start">
                            <div class="icon-circle-small bg-laranja-light me-3">
                                <i class="bi bi-geo-alt-fill text-warning"></i>
                            </div>
                            <div>
                                <h5 class="fw-bold mb-1">Localização</h5>
                                <p class="text-muted-custom small mb-0">
                                    Rua Quedas de Kalandula, Via S15, CS4,<br>
                                    Zona do Mundo Verde, Talatona - Luanda<br>
                                    <strong>Caixa Postal:</strong> 10571
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="card-custom p-4 mb-4 border-top-laranja">
                        <div class="d-flex align-items-start">
                            <div class="icon-circle-small bg-laranja-light me-3">
                                <i class="bi bi-telephone-fill text-warning"></i>
                            </div>
                            <div>
                                <h5 class="fw-bold mb-1">Telefone</h5>
                                <a href="tel:+244923896963" class="text-decoration-none d-block text-muted-custom small">+244 923 896 963</a>
                                <a href="tel:+244990896963" class="text-decoration-none d-block text-muted-custom small">+244 990 896 963</a>
                            </div>
                        </div>
                    </div>

                    <div class="card-custom p-4 border-top-laranja">
                        <div class="d-flex align-items-start">
                            <div class="icon-circle-small bg-laranja-light me-3">
                                <i class="bi bi-envelope-at-fill text-warning"></i>
                            </div>
                            <div>
                                <h5 class="fw-bold mb-1">E-mail</h5>
                                <a href="mailto:info@radioadventus.org" class="text-decoration-none text-muted-custom small">info@radioadventus.org</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-7">
                    <div class="card-custom p-4 h-100 border-top-laranja">
                        <h4 class="fw-bold mb-4">Envie uma Mensagem</h4>
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label class="fw-bold small mb-1">Seu Nome</label>
                                <input type="text" id="nomeContato" class="form-control custom-input" placeholder="Ex: João Paulo">
                            </div>
                            <div class="col-md-6">
                                <label class="fw-bold small mb-1">Assunto</label>
                                <select id="assuntoContato" class="form-select custom-input">
                                    <option> ------- ------ </option>
                                    <option>- Estudar a Biblia</option>
                                    <option>- Fazer uma Doação</option>
                                    <option>- Pedido de Oração</option>
                                    <option>Participar de um programa</option>
                                    <option>comunicação da igreja</option>
                                    <option>Visitar a Rádio</option>
                                    <option>Sugestão e Opinião</option>
                                    <option>Outros Assuntos</option>
                                </select>
                            </div>
                            <div class="col-12">
                                <label class="fw-bold small mb-1">Sua Mensagem</label>
                                <textarea id="msgContato" class="form-control custom-input" rows="5" placeholder="Como podemos ajudar?"></textarea>
                            </div>
                            <div class="col-12">
                                <button class="btn btn-warning w-100 py-2 fw-bold rounded-pill" onclick="enviarMensagemContato()">
                                    ENVIAR VIA WHATSAPP <i class="bi bi-whatsapp ms-2"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Lógica para enviar a mensagem de contacto
function enviarMensagemContato() {
    const nome = document.getElementById('nomeContato').value;
    const assunto = document.getElementById('assuntoContato').value;
    const mensagem = document.getElementById('msgContato').value;

    if (!nome || !mensagem) return alert("Por favor, preencha seu nome e a mensagem.");

    const texto = `*CONTATO VIA APP - RÁDIO ADVENTUS*%0A%0A` +
                  `*Nome:* ${nome}%0A` +
                  `*Assunto:* ${assunto}%0A` +
                  `*Mensagem:* ${mensagem}`;

    window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_RADIO}&text=${texto}`, '_blank');
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
            icon: "assets/img/logo-radioadventus.png"
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
    // O './sw.js' indica que ele está na raiz
    navigator.serviceWorker.register('./sw.js') 
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

// Função para atualizar a "Capinha" e Informações na Tela de Bloqueio
function atualizarMediaSession(nomePrograma) {
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: nomePrograma,
            artist: 'Rádio Adventus',
            album: '93.9 FM | A Sintonia da Esperança',
            artwork: [
                { src: 'https://radioadventus.org/wp-content/uploads/2023/04/cropped-logo-radioadvt.png', sizes: '512x512', type: 'image/png' }
            ]
        });

        // Controles da tela de bloqueio
        navigator.mediaSession.setActionHandler('play', () => toggleAudio());
        navigator.mediaSession.setActionHandler('pause', () => toggleAudio());
    }
}

// Agora, ajuste a sua função de atualização de programa (o setInterval) para chamar essa função:
setInterval(() => { 
    const d = getProgramacaoAtualizada();
    document.getElementById('playerProgTitle').innerText = d.noAr.nome;
    atualizarMediaSession(d.noAr.nome); // <--- Adicione esta linha aqui
}, 30000);

// Chame uma vez no início também
atualizarMediaSession("Rádio Adventus");


