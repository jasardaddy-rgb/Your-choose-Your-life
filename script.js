// ===== 状态 =====
let iq = 0;
let money = 0;
let health = 100;

let chapter = 1;
let place = "城市";

// ===== NPC =====
let NPC = {
  name: "陌生人",
  love: 0,
  mood: "neutral",
  memory: []
};

// ===== 章节系统（V22核心🔥）=====
function updateChapter() {

  if (iq > 10) chapter = 2;
  if (money > 10) chapter = 3;
  if (health < 30) chapter = 4;

  const chapters = [
    "第一章：普通人生",
    "第二章：选择未来",
    "第三章：社会现实",
    "第四章：危机人生",
    "终章：结局"
  ];

  document.getElementById("chapter").innerText =
    chapters[chapter - 1];
}

// ===== 存档 =====
function save() {
  localStorage.setItem("life_v22", JSON.stringify({
    iq, money, health, chapter, NPC
  }));
  alert("已保存");
}

function load() {
  let data = JSON.parse(localStorage.getItem("life_v22"));
  if (!data) return;

  iq = data.iq;
  money = data.money;
  health = data.health;
  chapter = data.chapter;
  NPC = data.NPC;

  update();
  updateChapter();
}

// ===== 地图 =====
function move(p) {
  place = p;
  document.getElementById("place").innerText = p;

  NPC.name = "NPC-" + Math.floor(Math.random() * 100);
}

// ===== 对话系统（升级版🔥）=====
function talk() {

  let base = [
    "你还好吗？",
    "这个世界有点奇怪",
    "我记得你",
    "你改变了一些东西"
  ];

  let msg = base[Math.floor(Math.random() * base.length)];

  // 情绪系统
  if (NPC.love > 10) msg = "😊 " + msg;
  if (NPC.love < -5) msg = "⚠ " + msg;

  NPC.memory.push(msg);

  document.getElementById("npc").innerText =
    NPC.name + "：" + msg;

  NPC.love += Math.random() * 6 - 2;

  iq++;
  money++;

  update();
  updateChapter();
}

// ===== UI =====
function update() {
  document.getElementById("iq").innerText = iq;
  document.getElementById("money").innerText = money;
  document.getElementById("health").innerText = health;
}

update();
