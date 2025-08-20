
let handler = async (m, { isPrems, conn, }) => {
  let time = global.db.data.users[m.sender].lastcofre + 0; // 36000000 10 Horas // 86400000 24 Horas
  if (new Date - global.db.data.users[m.sender].lastcofre < 0) {
    throw `[❗𝐈𝐍𝐅𝐎❗] 𝚈𝙰 𝚁𝙴𝙲𝙻𝙰𝙼𝙰𝚂𝚃𝙴 𝚃𝚄 𝙲𝙾𝙵𝚁𝙴\n𝚅𝚄𝙴𝙻𝚅𝙴 𝙴𝙽 *${msToTime(time - new Date())}* 𝙿𝙰𝚁𝙰 𝚅𝙾𝙻𝚅𝙴𝚁 𝙰 𝚁𝙴𝙲𝙻𝙰𝙼𝙰𝚁`;
  }

  let img = 'https://i.ibb.co/J55dPST/garena-free-fire-logo-rosj9f102kpok60v.jpg';
  let texto = `> > 𝙈𝙀𝙉𝙐 𝘿𝙀 𝙁𝙍𝙀𝙀 𝙁𝙄𝙍𝙀 👑.


▸▸ 𝙇𝙄𝙎𝙏𝘼 𝙑𝙀𝙍𝙎𝙐𝙎 👑 ◂◂
⚔ ➺.vs4 / Sur
⚔ ➺.6vs6 / Sur
⚔ ➺.vs4 / EeUu
⚔ ➺.scrimsur / Sur
⚔ ➺.scrimeeuu / EeUu
⚔ ➺.cuadri / Sur
⚔ ➺.cuadrilatero / EeUu
⚔ ➺.vs6 / EeUu
`;

  const fkontak = {
    "key": {
      "participants": "0@s.whatsapp.net",
      "remoteJid": "status@broadcast",
      "fromMe": false,
      "id": "Halo"
    },
    "message": {
      "contactMessage": {
        "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    },
    "participant": "0@s.whatsapp.net"
  };

  await conn.sendFile(m.chat, img, 'img.jpg', texto, fkontak);
  global.db.data.users[m.sender].lastcofre = new Date * 1;
};

handler.help = ['menuff'];
handler.tags = ['freefire', 'main'];
handler.command = ['menuff', 'menufreefire', 'rcanal'];
handler.register = true;
export default handler;
