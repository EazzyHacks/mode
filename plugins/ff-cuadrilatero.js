let partidasVS12 = {};

let handler = async (m, { conn, args }) => {
  // Verificar si se proporcionaron los argumentos necesarios
  if (args.length < 2) {
    conn.reply(m.chat, '_Debes proporcionar la hora (HH:MM) y el genero._', m);
    return;
  }

  // Validar el formato de la hora
  const horaRegex = /^([01]\d|2[0-3]):?([0-5]\d)$/;
  if (!horaRegex.test(args[0])) {
    conn.reply(m.chat, '_Formato de hora incorrecto. Debe ser HH:MM en formato de 212 horas._', m);
    return;
  }

  const horaUsuario = args[0]; // Hora proporcionada por el usuario
  const genero = args.slice(1).join(' '); // genero proporcionada por el usuario

  // Calcular la hora adelantada
  const horaUsuarioSplit = horaUsuario.split(':');
  let horaAdelantada = '';
  if (horaUsuarioSplit.length === 2) {
    const horaNumerica = parseInt(horaUsuarioSplit[0], 10);
    const minutoNumerico = parseInt(horaUsuarioSplit[1], 10);
    const horaAdelantadaNumerica = horaNumerica + 1; // Adelantar 1 hora
    horaAdelantada = `${horaAdelantadaNumerica.toString().padStart(2, '0')}:${minutoNumerico.toString().padStart(2, '0')}`;
  }

  let plantilla = `
╭·····················➤
│ ✭⋆ ⸒ ⚔️ Modalidad: Cuadrilatero
│ ✭⋆ ⸒ ⏰ Horario: ${horaUsuario}🇲🇽 ⌇ ${horaAdelantada}🇨🇴
│ ✭⋆ ⸒ 🫶🏼 Ropa: ${genero} 
│
│ Escuadra 1 :
│ ʿ  🥷🏻: 
│ ʿ  🥷🏻: 
│ ʿ  🥷🏻: 
│ ʿ  🥷🏻: 
│
│ Escuadra 2 :
│ ʿ  🥷🏻: 
│ ʿ  🥷🏻: 
│ ʿ  🥷🏻: 
│ ʿ  🥷🏻: 
│
│ Escuadra 3 :
│ ʿ  🥷🏻: 
│ ʿ  🥷🏻: 
│ ʿ  🥷🏻: 
│ ʿ  🥷🏻: 
│ suplentes: 
│ ʿ ☁️: 
│ ʿ ☁️: 
╰····················· ᡣ

     (𝚁𝚎𝚊𝚌𝚌𝚒𝚘𝚗𝚊 𝚌𝚘𝚗 ❤️ 𝚙𝚊𝚛𝚊 𝚞𝚗𝚒𝚛𝚝𝚎)
  `.trim()

  let msg = await conn.sendMessage(m.chat, { text: plantilla }, { quoted: m })
  partidasVS12[msg.key.id] = {
    chat: m.chat,
    jugadores: [],
    suplentes: [],
    horaUsuario: horaUsuario,
    horaAdelantada: horaAdelantada,
    genero: genero,
    originalMsg: msg,
  }
}

handler.help = ['cuadrilatero ( Lista Cuadrilatero )']
handler.tags = ['ffeeuu']
handler.command = ['cuadrilatero', 'cuadrilatero']
handler.group = true
handler.admin = true

// Función para manejar las reacciones
handler.before = async function (m) {
  if (!m.message?.reactionMessage) return false
  
  let reaction = m.message.reactionMessage
  let key = reaction.key
  let emoji = reaction.text
  let sender = m.key.participant || m.key.remoteJid

  // Solo procesar reacciones de corazón o pulgar arriba
  if (!['❤️', '👍🏻', '❤', '👍'].includes(emoji)) return false
  
  // Verificar si existe la partida
  if (!partidasVS12[key.id]) return false

  let data = partidasVS12[key.id]

  // Verificar si el usuario ya está en la lista
  if (data.jugadores.includes(sender) || data.suplentes.includes(sender)) return false

  // Agregar a jugadores principales o suplentes
  if (data.jugadores.length < 12) {
    data.jugadores.push(sender)
  } else if (data.suplentes.length < 2) {
    data.suplentes.push(sender)
  } else {
    return false // Lista llena
  }

  // Crear las menciones para jugadores y suplentes
  let jugadores = data.jugadores.map(u => `@${u.split('@')[0]}`)
  let suplentes = data.suplentes.map(u => `@${u.split('@')[0]}`)

  let plantilla = `
╭·····················➤
│ ✭⋆ ⸒ ⚔️ Modalidad: Cuadrilatero
│ ✭⋆ ⸒ ⏰ Horario: ${data.horaUsuario}🇲🇽 ⌇ ${data.horaAdelantada}🇨🇴
│ ✭⋆ ⸒ 🫶🏼 Ropa: ${data.genero} 
│
│ Escuadra 1 :
│ ʿ  🥷🏻: ${jugadores[0] || ''}
│ ʿ  🥷🏻: ${jugadores[1] || ''}
│ ʿ  🥷🏻: ${jugadores[2] || ''}
│ ʿ  🥷🏻: ${jugadores[3] || ''}
│
│ Escuadra 2 :
│ ʿ  🥷🏻: ${jugadores[4] || ''}
│ ʿ  🥷🏻: ${jugadores[5] || ''}
│ ʿ  🥷🏻: ${jugadores[6] || ''}
│ ʿ  🥷🏻: ${jugadores[7] || ''}

│
│ Escuadra 3 :
│ ʿ  🥷🏻: ${jugadores[8] || ''}
│ ʿ  🥷🏻: ${jugadores[9] || ''}
│ ʿ  🥷🏻: ${jugadores[10] || ''}
│ ʿ  🥷🏻: ${jugadores[11] || ''}
│ suplentes: 
│ ʿ ☁️: ${suplentes[0] || ''}
│ ʿ ☁️: ${suplentes[1] || ''}
╰····················· ᡣ

${data.jugadores.length < 12 || data.suplentes.length < 2 ? '(𝚁𝚎𝚊𝚌𝚌𝚒𝚘𝚗𝚊 𝚌𝚘𝚗 ❤️ 𝚙𝚊𝚛𝚊 𝚞𝚗𝚒𝚛𝚝𝚎)' : '✅ 𝐋𝐈𝐒𝐓𝐀 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐀'}
  `.trim()

  try {
    await this.sendMessage(data.chat, {
      text: plantilla,
      edit: data.originalMsg.key,
      mentions: [...data.jugadores, ...data.suplentes]
    })
  } catch (error) {
    console.error('Error al editar mensaje:', error)
  }

  return false
}

export default handler

