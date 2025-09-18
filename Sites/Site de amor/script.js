/* Cria as Estrelas */
function createStars() { // Função que cria as estrelas no fundo
    const container = document.querySelector('.stars'); // Seleciona o container onde as estrelas vão ficar
    for (let i = 0; i < 60; i++) { // Repete 60 vezes para criar várias estrelas
      const img = document.createElement('img'); // Cria um elemento de imagem
      img.src = "img/star.svg"; // Define o arquivo da estrela (pasta img/)
      const size = Math.floor(Math.random() * 21) + 10; // Define tamanho aleatório entre 10 e 30 pixels
      img.style.width = size + "px"; // Define largura
      img.style.height = size + "px"; // Define altura
      img.style.left = Math.random() * 100 + "%"; // Posição horizontal aleatória na tela
      img.style.animationDuration = (Math.random() * 12 + 10) + "s"; // Tempo de animação entre 10s e 22s
      img.style.animationDelay = Math.random() * -20 + "s"; // Atraso aleatório para não começarem juntas
      img.style.opacity = (0.05 + Math.random() * 0.25).toString(); // Define opacidade entre 0.05 e 0.3
      container.appendChild(img); // Adiciona a estrela dentro do container
    }
  }
  createStars(); // Chama a função para criar as estrelas
  
  /* Abre o Envelope */
  const envelope = document.getElementById('envelope'); // Pega o elemento do envelope
  const entry = document.getElementById('entry'); // Pega a tela de entrada
  const main = document.getElementById('main'); // Pega a tela principal
  const openBtn = document.getElementById('openBtn'); // Pega o botão de abrir carta
  
  openBtn.addEventListener('click', () => { // Quando clicar no botão
    envelope.classList.add('open'); // Adiciona a classe "open" ao envelope
    setTimeout(() => { // Espera 1 segundo
      entry.classList.add('hide'); // Esconde a tela inicial
      main.classList.add('visible'); // Mostra a tela principal
    }, 1000); // Tempo em milissegundos (1s)
  });
  
  openBtn.addEventListener('keyup', e => { // Evento de teclado no botão
    if (e.key === 'Enter' || e.key === ' ') openBtn.click(); // Se apertar Enter ou Espaço, abre também
  });
  
  /* Galeria de Fotos */
  (function () { // Função auto-executada
    const galleryEl = document.getElementById('gallery'); // Seleciona o container da galeria
    const photos = [ // Lista de fotos que vão aparecer
      { src: "img/foto1.png" },
      { src: "img/foto2.png" },
      { src: "img/foto3.jpg" },
      { src: "img/foto4.png" }
    ];
  
    photos.forEach((data, i) => { // Para cada foto da lista
      const div = document.createElement('div'); // Cria uma div para cada foto
      div.className = 'photo hidden'; // Define a classe padrão (escondida)
      div.setAttribute('data-index', i); // Guarda o índice da foto
      const img = document.createElement('img'); // Cria um elemento de imagem
      img.src = data.src; // Define o arquivo da foto
      div.appendChild(img); // Coloca a imagem dentro da div
      galleryEl.appendChild(div); // Coloca a div dentro da galeria
    });
  
    const photoEls = Array.from(galleryEl.querySelectorAll('.photo')); // Pega todas as fotos adicionadas
    let index = 0; // Começa mostrando a primeira foto
  
    function updateGallery() { // Função para atualizar a galeria
      photoEls.forEach((el, i) => { // Para cada foto
        el.classList.remove('left', 'right', 'active', 'hidden'); // Remove classes antigas
        if (i === index) { // Se for a foto atual
          el.classList.add('active'); // Marca como ativa
        } else if (i === ((index - 1 + photoEls.length) % photoEls.length)) { // Se for a anterior
          el.classList.add('left'); // Marca como esquerda
        } else if (i === ((index + 1) % photoEls.length)) { // Se for a próxima
          el.classList.add('right'); // Marca como direita
        } else {
          el.classList.add('hidden'); // Esconde as outras
        }
      });
    }
  
    document.getElementById('prev').addEventListener('click', () => { // Botão "Anterior"
      index = (index - 1 + photoEls.length) % photoEls.length; // Atualiza índice para a foto anterior
      updateGallery(); // Atualiza galeria
      resetAuto(); // Reseta contador automático
    });
  
    document.getElementById('next').addEventListener('click', () => { // Botão "Próximo"
      index = (index + 1) % photoEls.length; // Atualiza índice para a próxima foto
      updateGallery(); // Atualiza galeria
      resetAuto(); // Reseta contador automático
    });
  
    let auto = setInterval(() => { // Troca automática de foto a cada 5s
      index = (index + 1) % photoEls.length; // Passa para a próxima
      updateGallery(); // Atualiza galeria
    }, 5000);
  
    function resetAuto() { // Função para resetar o timer automático
      clearInterval(auto); // Para o timer atual
      auto = setInterval(() => { // Cria um novo timer
        index = (index + 1) % photoEls.length; // Vai para próxima
        updateGallery(); // Atualiza
      }, 5000);
    }
  
    updateGallery(); // Inicia a galeria já com a primeira foto ativa
  })();
  
  /* Temporizador de Tempo Juntos */
  (function () { // Função auto-executada
    const el = document.getElementById('coupleTimer'); // Seleciona o elemento onde o tempo será mostrado
    const start = new Date("2023-06-15T20:30:00"); // Define a data inicial do relacionamento
  
    function update() { // Função que atualiza o contador
      const now = new Date(); // Pega data/hora atual
      let years = now.getFullYear() - start.getFullYear(); // Calcula diferença de anos
      let months = now.getMonth() - start.getMonth(); // Calcula diferença de meses
  
      if (months < 0) { // Se deu negativo, ajusta
        years--; // Tira 1 ano
        months += 12; // Corrige os meses
      }
  
      const temp = new Date(start.getTime()); // Cria uma data temporária
      temp.setFullYear(temp.getFullYear() + years); // Adiciona os anos calculados
      temp.setMonth(temp.getMonth() + months); // Adiciona os meses calculados
      if (temp > now) { // Se passou da data atual
        months--; // Ajusta os meses
        temp.setMonth(temp.getMonth() - 1); // Corrige novamente
      }
  
      let diffMs = now - temp; // Diferença em milissegundos
      if (diffMs < 0) diffMs = 0; // Se der negativo, corrige para 0
  
      const seconds = Math.floor(diffMs / 1000) % 60; // Segundos
      const minutes = Math.floor(diffMs / 60000) % 60; // Minutos
      const hours = Math.floor(diffMs / 3600000) % 24; // Horas
      const days = Math.floor(diffMs / 86400000); // Dias
  
      // Atualiza o texto do temporizador no HTML
      el.textContent = `Estamos juntos há ${years} ${years === 1 ? 'ano' : 'anos'}, ${months} ${months === 1 ? 'mês' : 'meses'}, ${days} ${days === 1 ? 'dia' : 'dias'}, ${hours} ${hours === 1 ? 'hora' : 'horas'}, ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'} e ${seconds} ${seconds === 1 ? 'segundo' : 'segundos'}.`;
    }
  
    update(); // Atualiza logo que a página carrega
    setInterval(update, 1000); // Atualiza a cada 1 segundo
  })();  