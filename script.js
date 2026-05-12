// 🌍 世界
let world = {
  order: 50,
  chaos: 50,
  tech: 50
};

// 🏛 国家力量
let nations = {
  red: 50,
  blue: 50,
  green: 50
};

// 🗺 地图（200格）
let map = [];

// ⚔️ 初始化地图
function init() {

  let m = document.getElementById("map");

  for (let i = 0; i < 200; i++) {

    let cell = document.createElement("div");
    cell.className = "cell";

    map.push({
      owner: randomOwner()
    });

    m.appendChild(cell);
  }
}

// 🎲 随机国家
function randomOwner() {
  let r = Math.random();
  if (r < 0.33) return "r";
  if (r < 0.66) return "b";
  return "g";
}

// ⚔️ 战争逻辑（核心🔥）
function fight() {

  let a = ["red","blue","green"][Math.floor(Math.random()*3)];
  let b = ["red","blue","green"][Math.floor(Math.random()*3)];

  if (a === b) return;

  let powerA = nations[a] + Math.random()*20;
  let powerB = nations[b] + Math.random()*20;

  if (powerA > powerB) {
    nations[a] += 2;
    nations[b] -= 2;
    log(`${a} 击败 ${b}`);
  } else {
    nations[b] += 2;
    nations[a] -= 2;
    log(`${b} 击败 ${a}`);
  }
}

// 📜 战争日志
function log(text) {
  let log = document.getElementById("log");
  log.innerHTML += `<p>⚔️ ${text}</p>`;

  if (log.children.length > 8) {
    log.removeChild(log.children[0]);
  }
}

// 🌍 世界推进（核心循环🔥）
function tick() {

  world.order += Math.random()*2 - 1;
  world.chaos += Math.random()*2 - 1;
  world.tech += Math.random()*1;

  // ⚔️ 战争发生概率
  for (let i = 0; i < 3; i++) {
    if (Math.random() < 0.6) fight(); // 🔥 战争频率提高
  }

  // 🗺 地图扩张
  updateMap();
  updateUI();
}

// 🗺 地图更新
function updateMap() {

  let cells = document.getElementsByClassName("cell");

  for (let i = 0; i < cells.length; i++) {

    let r = Math.random();

    if (r < 0.33) cells[i].className = "cell r";
    else if (r < 0.66) cells[i].className = "cell b";
    else cells[i].className = "cell g";
  }
}

// 📊 UI
function updateUI() {

  document.getElementById("order").innerText = world.order.toFixed(1);
  document.getElementById("chaos").innerText = world.chaos.toFixed(1);
  document.getElementById("tech").innerText = world.tech.toFixed(1);

  document.getElementById("red").innerText = nations.red;
  document.getElementById("blue").innerText = nations.blue;
  document.getElementById("green").innerText = nations.green;
}

// 初始化
init();
updateMap();
updateUI();
