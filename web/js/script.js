function parseVLESS(input) {
  const trimmed = input.trim();
  if (!trimmed) throw new Error("Пустая ссылка");

  const url = new URL(trimmed);

  if (url.protocol !== "vless:") throw new Error("Не VLESS-ссылка");

  const uuid = url.username;
  if (!uuid) throw new Error("Нет UUID");

  const server = url.hostname;
  if (!server) throw new Error("Нет сервера");

  const port = url.port || 443; // по умолчанию 443 для VLESS с TLS/Reality

  const params = Object.fromEntries(url.searchParams);

  // Нормализуем параметры
  const security = params.security || (params.pbk ? "reality" : "tls"); // если есть pbk — reality

  return { uuid, server, port, params, security };
}

function getNodeName() {
  const flag = document.getElementById('countrySelect').value;
  const rawName = document.getElementById('customName').value.trim() || "Server vless";
  return `${flag} ${rawName}`;
}

function enableDownloadButtons() {
  document.getElementById('download-yml').disabled = false;
  document.getElementById('download-conf').disabled = false;
}

function disableDownloadButtons() {
  document.getElementById('download-yml').disabled = true;
  document.getElementById('download-conf').disabled = true;
}

function convert() {
  const input = document.getElementById('vlessInput').value;
  const output = document.getElementById('output');

  try {
    const { uuid, server, port, params, security } = parseVLESS(input);
    const name = getNodeName();

    let yaml = `proxies:
  - name: "${name}"
    type: vless
    server: ${server}
    port: ${port}
    uuid: ${uuid}
    network: ${params.type || "tcp"}
    udp: true
    tls: ${security !== "none"}
    flow: "${params.flow || ''}"
    servername: "${params.sni || ''}"
    client-fingerprint: "${params.fp || "chrome"}"`;

    if (security === "reality") {
      yaml += `
    reality-opts:
      public-key: "${params.pbk || ''}"
      short-id: "${params.sid || ''}"`;
    }

    output.textContent = yaml;
    enableDownloadButtons();
  } catch (e) {
    output.textContent = `Ошибка: ${e.message || "неверная VLESS-ссылка"}`;
    disableDownloadButtons();
  }
}

function generateFullConfig() {
  const input = document.getElementById('vlessInput').value;
  const output = document.getElementById('output');

  try {
    const { uuid, server, port, params, security } = parseVLESS(input);
    const name = getNodeName();

    // Динамический прокси-блок
    let proxyBlock = `  - name: "${name}"
    type: vless
    server: ${server}
    port: ${port}
    uuid: ${uuid}
    network: ${params.type || "tcp"}
    udp: true
    tls: ${security !== "none"}
    flow: "${params.flow || ''}"
    servername: "${params.sni || ''}"
    client-fingerprint: "${params.fp || "chrome"}"`;

    if (security === "reality") {
      proxyBlock += `
    reality-opts:
      public-key: "${params.pbk || ''}"
      short-id: "${params.sid || ''}"`;
    }

    // Полный конфиг — вставь сюда ВЕСЬ свой оригинальный конфиг из первого сообщения
    // Главное: замени старый proxies-блок на наш динамический + блокировщик
    const fullConfig = `port: 7890
socks-port: 7891
redir-port: 7892
allow-lan: true
tcp-concurrent: true
enable-process: true
find-process-mode: strict
mode: rule
log-level: info
ipv6: false
bind-address: '*'
keep-alive-interval: 30
unified-delay: false
profile:
  store-selected: true
  store-fake-ip: true
tun:
  enable: true
  stack: mixed
  dns-hijack:
  - any:53
  auto-route: true
  auto-detect-interface: true
  strict-route: true
external-controller: 127.0.0.1:9090

dns:
  enable: true
  listen: 127.0.0.1:6868
  enhanced-mode: fake-ip
  default-nameserver:
    - 77.88.8.8  # Yandex DNS
    - 94.140.14.14  # AdGuard DNS
    - 1.1.1.1  # Cloudflare
    - 8.8.8.8
    - 1.0.0.1
  nameserver:
    - https://1.1.1.1/dns-query#PROXY
    - https://8.8.8.8/dns-query#PROXY
    - https://1.0.0.1/dns-query#PROXY
    - 77.88.8.8  # Yandex DNS
    - 94.140.14.14  # AdGuard DNS
    - 1.1.1.1  # Cloudflare
  fallback:
    - 8.8.8.8
    - 9.9.9.9  # Google DNS
    - 1.0.0.1  # Cloudflare Backup
  fallback-filter:
    geoip: true
    ipcidr:
      - 240.0.0.0/4

proxies:
${proxyBlock}
    
  - name: "❌BLOCK_PROGRAM❌"
    type: vless
    server: 666.999.666.999
    port: 40347
    uuid: 8f24c3e6-b616-4aac-af09-6b3f257754b1
    network: tcp
    udp: true
    tls: true
    flow: xtls-rprx-vision
    servername: google.com
    reality-opts:
      public-key: MRPlp1Mn8VSXgg0WjCRnxN4htzm_43oeYffrBjClblw
      short-id: "a313cb9b"
    client-fingerprint: chrome

proxy-groups:
  - name: "🛠️Глобал🛠️_настройки_соединения"
    type: select
    proxies:
      - "📶Глобал📶_авто_подбор_наименьшего_пинга_до_сервера_(нужно_выбрать_♻️Глобал♻️_в_🛠️Глобал🛠️)"
      - OFF_VPN
      - "${name}"

  - name: "📶Глобал📶_авто_подбор_наименьшего_пинга_до_сервера_(нужно_выбрать_♻️Глобал♻️_в_🛠️Глобал🛠️)"
    type: url-test
    url: https://www.youtube.com/
    interval: 300
    tolerance: 50
    proxies:
      - "${name}"

  - name: "🛠️Discord🛠️_настройки"
    type: url-test
    url: https://discord.com/
    interval: 300
    tolerance: 50
    proxies:
      - "🛠️Глобал🛠️_настройки_соединения"
      - OFF_VPN

  - name: "🛠️Git🛠️_настройки"
    type: url-test
    url: https://github.com/
    interval: 300
    tolerance: 50
    proxies:
      - OFF_VPN
      - "🛠️Глобал🛠️_настройки_соединения"

  - name: "🎮Steam🎮_настройки"
    type: url-test
    url: https://store.steampowered.com/
    interval: 300
    tolerance: 50
    proxies:
      - OFF_VPN
      - "🛠️Глобал🛠️_настройки_соединения"

  - name: "🎮Epic_Games🎮_настройки"
    type: url-test
    url: https://www.fab.com/
    interval: 300
    tolerance: 50
    proxies:
      - OFF_VPN
      - "🛠️Глобал🛠️_настройки_соединения"

  - name: "❌Блокировка_программ❌"
    type: select
    proxies:
      - "❌BLOCK_PROGRAM❌"

  - name: "OFF_VPN"
    type: url-test
    url: https://vk.ru/
    interval: 300
    tolerance: 50
    proxies:
      - DIRECT  

rules:

  # === Торренты ===
  - PROCESS-NAME,utorrent.exe,DIRECT
  - PROCESS-NAME,bitcomet.exe,DIRECT
  - PROCESS-NAME,transmission-qt.exe,DIRECT
  - PROCESS-NAME,qbittorrent.exe,DIRECT
  - PROCESS-NAME,deluge.exe,DIRECT
  - PROCESS-NAME,aria2c.exe,DIRECT
  - PROCESS-NAME,fdm.exe,DIRECT           # Free Download Manager (может качать торренты)
  - PROCESS-NAME,tixati.exe,DIRECT
  - PROCESS-NAME,vuze.exe,DIRECT
  - PROCESS-NAME,rtorrent,DIRECT
  - PROCESS-NAME,aria2c,DIRECT
  - PROCESS-NAME,transmission-cli,DIRECT
  - PROCESS-NAME,transmission-daemon,DIRECT
  - PROCESS-NAME,transmission-gtk,DIRECT
  - PROCESS-NAME,deluged,DIRECT
  - PROCESS-NAME,deluge-gtk,DIRECT
  - PROCESS-NAME,deluge-web,DIRECT

  # === ПО ===
  - PROCESS-NAME,GitHubDesktop.exe,DIRECT
  - PROCESS-NAME,Fork.exe,DIRECT
  - PROCESS-NAME,Termius.exe,DIRECT
  - PROCESS-NAME,steam.exe,🎮Steam🎮_настройки
  - PROCESS-NAME,EpicGamesLauncher.exe,🎮Epic_Games🎮_настройки

  # ==== BitTorrent / P2P порты ====
#  - DST-PORT,6881-6889,DIRECT       # Стандартные порты BitTorrent
#  - DST-PORT,6900-6999,DIRECT       # Расширенный диапазон
#  - DST-PORT,51413,DIRECT           # Transmission
#  - DST-PORT,16881,DIRECT           # uTorrent / DHT / qBittorrent
#  - DST-PORT,8999,DIRECT            # Популярный в старых клиентах
#  - DST-PORT,49152-65535,DIRECT     # qBittorrent и динамические высокие порты
#  - DST-PORT,45100-45110,DIRECT     # Deluge / некоторые приватные трекеры
#  - DST-PORT,8999,DIRECT            # Tixati
#  - DST-PORT,10000-10010,DIRECT     # Некоторые клиенты используют эти порты
#  - DST-PORT,20000-29999,DIRECT     # Альтернативные диапазоны


  # домены для захода на роутер
  # Xiaomi / Mi WiFi
  - DOMAIN-SUFFIX,miwifi.com,DIRECT
  - DOMAIN,router.miwifi.com,DIRECT
  # TP-Link
  - DOMAIN,tplinkwifi.net,DIRECT
  - DOMAIN,tplinklogin.net,DIRECT
  # ASUS
  - DOMAIN,asusrouter.com,DIRECT
  # Keenetic (Zyxel)
  - DOMAIN,my.keenetic.net,DIRECT
  # MikroTik
  - DOMAIN,mikrotik.com,DIRECT
  - DOMAIN,router.lan,DIRECT  # если используется по DHCP
  # D-Link
  - DOMAIN-SUFFIX,mydlink.com,DIRECT
  - DOMAIN,dlinkrouter.local,DIRECT
  # Netgear
  - DOMAIN,routerlogin.net,DIRECT
  # Huawei / Hono
  - DOMAIN,homerouter.cpe,DIRECT
  # Ubiquiti (UniFi)
  - DOMAIN,unifi.local,DIRECT
  # Tenda
  - DOMAIN,tendawifi.com,DIRECT

  # --- PREPEND: маршрутизация по IP-CIDR для Discord ---
  - IP-CIDR,138.128.136.0/21,🛠️Discord🛠️_настройки
  - IP-CIDR,162.158.0.0/15,🛠️Discord🛠️_настройки
  - IP-CIDR,172.64.0.0/13,🛠️Discord🛠️_настройки
  - IP-CIDR,34.0.0.0/15,🛠️Discord🛠️_настройки
  - IP-CIDR,34.2.0.0/16,🛠️Discord🛠️_настройки
  - IP-CIDR,34.3.0.0/23,🛠️Discord🛠️_настройки
  - IP-CIDR,34.3.2.0/24,🛠️Discord🛠️_настройки
  - IP-CIDR,35.192.0.0/12,🛠️Discord🛠️_настройки
  - IP-CIDR,35.208.0.0/12,🛠️Discord🛠️_настройки
  - IP-CIDR,35.224.0.0/12,🛠️Discord🛠️_настройки
  - IP-CIDR,35.240.0.0/13,🛠️Discord🛠️_настройки
  - IP-CIDR,5.200.14.128/25,🛠️Discord🛠️_настройки
  - IP-CIDR,66.22.192.0/18,🛠️Discord🛠️_настройки

  # Discord по доменам
  - DOMAIN-SUFFIX,dis.gd,🛠️Discord🛠️_настройки
  - DOMAIN-SUFFIX,discord.co,🛠️Discord🛠️_настройки
  - DOMAIN-SUFFIX,discord.com,🛠️Discord🛠️_настройки
  - DOMAIN-SUFFIX,discord.design,🛠️Discord🛠️_настройки
  - DOMAIN-SUFFIX,discord.dev,🛠️Discord🛠️_настройки
  - DOMAIN-SUFFIX,discord.gg,🛠️Discord🛠️_настройки
  - DOMAIN-SUFFIX,discord.gift,🛠️Discord🛠️_настройки
  - DOMAIN-SUFFIX,discord.gifts,🛠️Discord🛠️_настройки
  - DOMAIN-SUFFIX,discord.media,🛠️Discord🛠️_настройки
  - DOMAIN-SUFFIX,discord.new,🛠️Discord🛠️_настройки
  - DOMAIN-SUFFIX,discord.store,🛠️Discord🛠️_настройки
  - DOMAIN-SUFFIX,discord.tools,🛠️Discord🛠️_настройки
  - DOMAIN-SUFFIX,discordapp.com,🛠️Discord🛠️_настройки
  - DOMAIN-SUFFIX,discordapp.net,🛠️Discord🛠️_настройки
  - DOMAIN-SUFFIX,discordmerch.com,🛠️Discord🛠️_настройки
  - DOMAIN-SUFFIX,discordpartygames.com,🛠️Discord🛠️_настройки
  - DOMAIN-SUFFIX,discord-activities.com,🛠️Discord🛠️_настройки
  - DOMAIN-SUFFIX,discordactivities.com,🛠️Discord🛠️_настройки
  - DOMAIN-SUFFIX,discordsays.com,🛠️Discord🛠️_настройки
  - DOMAIN-SUFFIX,discordstatus.com,🛠️Discord🛠️_настройки
  - DOMAIN-SUFFIX,gateway.discord.gg,🛠️Discord🛠️_настройки
  - DOMAIN-SUFFIX,cdn.discordapp.com,🛠️Discord🛠️_настройки
  - DOMAIN-SUFFIX,discord-attachments-uploads-prd.storage.googleapis.com,🛠️Discord🛠️_настройки


  # Локальный сервер напрямую
#  - IP-CIDR,194.116.215.14/32,DIRECT

  # DIRECT-домены
  - DOMAIN-SUFFIX,battleye.com,DIRECT
  - DOMAIN-SUFFIX,hostvds.com,DIRECT
  - DOMAIN-SUFFIX,veles.finance,DIRECT
  - DOMAIN-SUFFIX,bybit.com,DIRECT
  - IP-CIDR,66.22.237.0/24,DIRECT
  - DOMAIN-SUFFIX,miwifi.com,DIRECT
  - DOMAIN-SUFFIX,nvidia.com,DIRECT
  - DOMAIN-SUFFIX,router.miwifi.com,DIRECT
  - DOMAIN-SUFFIX,www.vk.com,DIRECT

  # Epic Games
  - DOMAIN-SUFFIX,akamaized.net,🎮Epic_Games🎮_настройки
  - DOMAIN-SUFFIX,epicgames.dev,🎮Epic_Games🎮_настройки
  - DOMAIN-SUFFIX,epicgames.com,🎮Epic_Games🎮_настройки
  - DOMAIN-SUFFIX,unrealengine.com,🎮Epic_Games🎮_настройки
  - DOMAIN-SUFFIX,unreal-asset.ru,🎮Epic_Games🎮_настройки
  - DOMAIN-SUFFIX,epicgamescdn.com,🎮Epic_Games🎮_настройки
  - DOMAIN-SUFFIX,fab.com,🎮Epic_Games🎮_настройки

  # Перенаправление мультимедиа и видео в глобальную группу
  - DOMAIN-SUFFIX,googlevideo.com,🛠️Глобал🛠️_настройки_соединения
  - DOMAIN-SUFFIX,www.youtube.com,🛠️Глобал🛠️_настройки_соединения
  - DOMAIN-SUFFIX,habr.com,🛠️Глобал🛠️_настройки_соединения

  # Steam-домены
  #- DOMAIN-SUFFIX,akamaihd.net,🎮Steam🎮_настройки
  #- DOMAIN-SUFFIX,steamstatic.com,🎮Steam🎮_настройки
  #- DOMAIN-SUFFIX,steampowered.com,🎮Steam🎮_настройки
  #- DOMAIN-SUFFIX,steamserver.net,🎮Steam🎮_настройки
  #- DOMAIN-SUFFIX,steamcontent.com,🎮Steam🎮_настройки
  #- DOMAIN-SUFFIX,akamaized.net,🎮Steam🎮_настройки

  # Wot Blitz
  #- DOMAIN-SUFFIX,wotblitz.com,🎮Steam🎮_настройки
  #- DOMAIN-SUFFIX,wotb.app,🎮Steam🎮_настройки
  #- DOMAIN-SUFFIX,wgcdn.co,🎮Steam🎮_настройки
  #- DOMAIN-SUFFIX,wargaming.net,🎮Steam🎮_настройки

  # Diversion
  - DOMAIN-SUFFIX,diversion.dev,DIRECT

  # APPEND: дополнительные правила
  - DOMAIN-SUFFIX,github.com,🛠️Git🛠️_настройки
  - DOMAIN-SUFFIX,githubusercontent.com,🛠️Git🛠️_настройки
  - DOMAIN-SUFFIX,githubassets.com,🛠️Git🛠️_настройки



  # Финальное правило
  - GEOIP,LAN,DIRECT
  - GEOIP,Fast-RU,DIRECT
  - GEOIP,RU,DIRECT
  - MATCH,🛠️Глобал🛠️_настройки_соединения # весь трафик не из списка будет идти через VPN

# - MATCH,DIRECT # весь трафик не из списка будет идти без VPN`;

    output.textContent = fullConfig;
    enableDownloadButtons();
  } catch (e) {
    output.textContent = `Ошибка генерации полного конфига: ${e.message || e}`;
    disableDownloadButtons();
  }
}

function downloadFile(format) {
  const text = document.getElementById('output').textContent.trim();
  if (!text) {
    alert("Нет данных для скачивания");
    return;
  }

  const filename = format === 'yml' ? 'proxy.yml' : 'config.conf';
  const mimeType = format === 'yml' ? 'text/yaml' : 'text/plain';

  const blob = new Blob([text], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function copyResult() {
  const text = document.getElementById('output').textContent.trim();
  if (!text) return alert("Нечего копировать");
  navigator.clipboard.writeText(text)
    .then(() => alert("Скопировано!"))
    .catch(() => alert("Ошибка копирования"));
}