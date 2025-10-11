/* ============================================================
   FUNÇÃO DE CRIAÇÃO DE ESTRELAS DE FUNDO
   Gera 60 estrelas aleatórias animadas para o cenário.
============================================================ */
function createStars() {
  const container = document.querySelector(".stars"); // Container onde as estrelas serão inseridas

  for (let i = 0; i < 60; i++) {
    // Cria 60 estrelas
    const img = document.createElement("img"); // Cria um elemento <img>
    img.src = "img/star.svg"; // Caminho da imagem da estrela

    // Define propriedades visuais aleatórias para cada estrela
    const size = Math.floor(Math.random() * 21) + 10; // Tamanho entre 10px e 30px
    img.style.width = size + "px";
    img.style.height = size + "px";
    img.style.left = Math.random() * 100 + "%"; // Posição horizontal aleatória
    img.style.animationDuration = Math.random() * 12 + 10 + "s"; // Duração da animação (10s a 22s)
    img.style.animationDelay = Math.random() * -20 + "s"; // Atraso aleatório
    img.style.opacity = (0.05 + Math.random() * 0.25).toString(); // Opacidade entre 0.05 e 0.3

    container.appendChild(img); // Adiciona a estrela ao container
  }
}
createStars(); // Executa a função assim que o script é carregado

/* ============================================================
   ANIMAÇÃO DO ENVELOPE (TELA DE ENTRADA)
   Controla a abertura da carta e a transição para o conteúdo principal.
============================================================ */
const envelope = document.getElementById("envelope");
const entry = document.getElementById("entry");
const main = document.getElementById("main");
const openBtn = document.getElementById("openBtn");

// Evento de clique no botão para abrir o envelope
openBtn.addEventListener("click", () => {
  envelope.classList.add("open"); // Adiciona a classe que aciona a animação de abertura
  setTimeout(() => {
    // Após 1 segundo (tempo da animação)
    entry.classList.add("hide"); // Oculta a tela inicial
    main.classList.add("visible"); // Exibe o conteúdo principal
  }, 1000);
});

// Permite abrir com a tecla Enter ou Espaço
openBtn.addEventListener("keyup", (e) => {
  if (e.key === "Enter" || e.key === " ") openBtn.click();
});

/* ============================================================
   GALERIA DE FOTOS INTERATIVA
   Mostra fotos alternadamente com botões, timer automático e gesto de swipe.
============================================================ */
(function () {
  const galleryEl = document.getElementById("gallery");
  const photos = [
    { src: "img/2-encontro.jpg" },
    { src: "img/3-encontro.jpg" },
    { src: "img/foto3.jpg" },
    { src: "img/foto2.png" },
  ];

  // Cria dinamicamente os elementos das fotos
  photos.forEach((data, i) => {
    const div = document.createElement("div");
    div.className = "photo hidden"; // Começa oculta
    div.setAttribute("data-index", i);
    const img = document.createElement("img");
    img.src = data.src;
    div.appendChild(img);
    galleryEl.appendChild(div);
  });

  const photoEls = Array.from(galleryEl.querySelectorAll(".photo"));
  let index = 0; // Índice da foto atualmente visível

  // Atualiza a exibição da galeria conforme o índice atual
  function updateGallery() {
    photoEls.forEach((el, i) => {
      el.classList.remove("left", "right", "active", "hidden"); // Limpa classes antigas

      if (i === index) el.classList.add("active"); // Foto atual
      else if (i === (index - 1 + photoEls.length) % photoEls.length)
        el.classList.add("left"); // Foto anterior
      else if (i === (index + 1) % photoEls.length)
        el.classList.add("right"); // Próxima foto
      else el.classList.add("hidden"); // Outras são ocultadas
    });
  }

  // Controles manuais (botões)
  document.getElementById("prev").addEventListener("click", () => {
    index = (index - 1 + photoEls.length) % photoEls.length;
    updateGallery();
    resetAuto();
  });

  document.getElementById("next").addEventListener("click", () => {
    index = (index + 1) % photoEls.length;
    updateGallery();
    resetAuto();
  });

  // Troca automática a cada 5 segundos
  let auto = setInterval(() => {
    index = (index + 1) % photoEls.length;
    updateGallery();
  }, 5000);

  // Reinicia o contador automático ao trocar manualmente
  function resetAuto() {
    clearInterval(auto);
    auto = setInterval(() => {
      index = (index + 1) % photoEls.length;
      updateGallery();
    }, 5000);
  }

  updateGallery(); // Exibe a primeira foto logo ao carregar

  // ======== SUPORTE A GESTOS DE SWIPE (TOQUE MÓVEL) ========
  let startX = 0;
  let endX = 0;

  // Detecta início do toque
  galleryEl.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  // Detecta movimento do toque
  galleryEl.addEventListener("touchmove", (e) => {
    endX = e.touches[0].clientX;
  });

  // Detecta fim do toque e decide direção do swipe
  galleryEl.addEventListener("touchend", () => {
    let diff = startX - endX;
    if (Math.abs(diff) > 50) {
      // Só considera se o movimento for significativo
      if (diff > 0) index = (index + 1) % photoEls.length; // Swipe → próxima
      else index = (index - 1 + photoEls.length) % photoEls.length; // Swipe ← anterior
      updateGallery();
      resetAuto();
    }
  });
})();

/* ============================================================
   TEMPORIZADOR "TEMPO JUNTOS"
   Calcula e exibe o tempo total de relacionamento em tempo real.
============================================================ */
(function () {
  const el = document.getElementById("coupleTimer");
  const start = new Date("2025-09-25T17:15:32"); // Data de início do relacionamento

  function update() {
    const now = new Date(); // Data atual
    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();

    // Ajuste quando o mês atual é menor que o mês inicial
    if (months < 0) {
      years--;
      months += 12;
    }

    // Cria uma data temporária para calcular dias, horas, minutos e segundos
    const temp = new Date(start.getTime());
    temp.setFullYear(temp.getFullYear() + years);
    temp.setMonth(temp.getMonth() + months);

    if (temp > now) {
      // Ajuste fino se a data ainda não chegou
      months--;
      temp.setMonth(temp.getMonth() - 1);
    }

    let diffMs = now - temp;
    if (diffMs < 0) diffMs = 0;

    // Converte a diferença em unidades menores
    const seconds = Math.floor(diffMs / 1000) % 60;
    const minutes = Math.floor(diffMs / 60000) % 60;
    const hours = Math.floor(diffMs / 3600000) % 24;
    const days = Math.floor(diffMs / 86400000);

    // Atualiza o conteúdo do elemento com o tempo formatado
    el.textContent = `Estamos juntos há ${years} ${
      years === 1 ? "ano" : "anos"
    }, ${months} ${months === 1 ? "mês" : "meses"}, ${days} ${
      days === 1 ? "dia" : "dias"
    }, ${hours} ${hours === 1 ? "hora" : "horas"}, ${minutes} ${
      minutes === 1 ? "minuto" : "minutos"
    } e ${seconds} ${seconds === 1 ? "segundo" : "segundos"}.`;
  }

  update(); // Atualiza assim que a página carrega
  setInterval(update, 1000); // Atualiza a cada 1 segundo
})();
