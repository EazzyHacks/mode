let speedGame = {};

const handler = async (m, { conn, args, command }) => {
  const modos = [
    { nombre: "🚥 Carrera Nocturna", reto: "Corre en la oscuridad con solo pequeños destellos de luz iluminando el camino." },
    { nombre: "🌪️ Carrera Extrema", reto: "Supera tormentas, terremotos y obstáculos impredecibles mientras intentas llegar a la meta." },
    { nombre: "🛑 Carrera de Eliminación", reto: "Cada cierto tiempo, el último corredor es eliminado hasta que solo quede uno." },
    { nombre: "💨 Derrapes de Fuego", reto: "Gana puntos haciendo los derrapes más espectaculares en curvas cerradas." },
    { nombre: "🔥 Ruta de Supervivencia", reto: "Esquiva explosiones, zonas de peligro y trampas antes de cruzar la meta." },
    { nombre: "🏎️ Desafío Turbo", reto: "Usa potenciadores en el momento correcto y alcanza velocidades extremas." },
    { nombre: "🕹️ Circuito Arcade", reto: "Corre en pistas con gráficos retro y potenciadores locos como turbo infinito." },
    { nombre: "🏰 Torneo Medieval", reto: "Caballos y carruajes compiten en terrenos accidentados inspirados en castillos y aldeas." },
    { nombre: "🎭 Ruta Caótica", reto: "Los corredores nunca saben qué obstáculos aparecerán en la pista." },
    { nombre: "🛸 Velocidad Intergaláctica", reto: "Compite en pistas fuera de la Tierra con gravedad cero y túneles espaciales." },
    { nombre: "🎲 Desafío Aleatorio", reto: "El tipo de carrera cambia cada vez, desde circuitos normales hasta desafíos extremos." }
  ];

  // Si no hay elección, mostrar menú
  if (!args[0]) {
    let mensaje = `🏁 *Zona de Velocidad Extrema* 🚀🔥\n\n📌 **Elige tu desafío:**\n`;
    modos.forEach((modo, i) => {
      mensaje += `🔹 ${i + 1}. ${modo.nombre} - ${modo.reto}\n`;
    });
    mensaje += `\n📌 *Responde con el número de la opción que elijas.*`;

    speedGame[m.chat] = { esperando: true, modos };
    return conn.sendMessage(m.chat, { text: mensaje });
  }

  // Si hay número, validar elección
  const eleccion = parseInt(args[0]);
  if (isNaN(eleccion) || eleccion < 1 || eleccion > modos.length) {
    return m.reply("❌ *Opción inválida. Elige un número entre 1 y 11.*");
  }

  const modoSeleccionado = modos[eleccion - 1].nombre;
  const usuario = conn.getName(m.sender);

  conn.speedGame[m.chat] = { nombre: usuario, modo: modoSeleccionado };

  await conn.reply(m.chat, `✅ *${usuario} ha elegido:* ${modoSeleccionado}\n⌛ Preparándose para la velocidad extrema...`, m);

  setTimeout(() => {
    const resultado = [
      "🏆 ¡Has dominado la pista y eres el campeón!",
      "💀 Perdiste el control y la competencia te superó.",
      "⚔️ Fue un duelo intenso, pero lograste terminar en buena posición.",
      "🔥 Sobreviviste al caos y llegaste a la meta.",
      "💢 La carrera fue brutal y apenas conseguiste terminar."
    ];

    const desenlace = resultado[Math.floor(Math.random() * resultado.length)];

    const mensajeFinal = `🏁 *Zona de Velocidad Extrema* 🚀🔥\n\n👤 *Jugador:* ${usuario}\n🏎️ *Modo elegido:* ${modoSeleccionado}\n\n${desenlace}`;

    conn.sendMessage(m.chat, { text: mensajeFinal });

    delete conn.speedGame[m.chat];
  }, 5000);
};

handler.command = ["speed"];
export default handler;