// 產生網站頁面：把 content/*.html 的內文套上共用的頁首、導覽列和頁尾。
// 用法：node build.mjs
import { readFileSync, writeFileSync } from "node:fs";

const SITE = "高爾夫球與個人成長";
const TAGLINE = "從一顆小白球，練習誠實、專注與堅持";

// nav: 導覽列文字；star: 重點頁（品格）
const pages = [
  { file: "index", nav: "首頁", title: SITE, desc: "高爾夫球入門、品格培養、心理訓練、禮儀、規則、裝備、健康與 2026 年賽事資訊的完整整理。" },
  { file: "character", nav: "★ 品格培養", star: true, title: "高爾夫培養品格", desc: "高爾夫如何培養誠實、正直、尊重、責任感、自律、耐心與運動家精神，附職業球壇經典故事與家長指南。" },
  { file: "mental", nav: "心理訓練", title: "高爾夫心理訓練", desc: "擊球前例行程序、呼吸法、意象訓練、自我對話、壓力管理與每週心理訓練計畫。" },
  { file: "intro", nav: "高爾夫入門", title: "高爾夫入門與規則", desc: "高爾夫是什麼、基本規則、常見罰則，以及 14 支球桿上限的由來。" },
  { file: "etiquette", nav: "服裝與禮儀", title: "服裝、帽子與時間禮儀", desc: "高爾夫服裝禮儀、帽子選擇，以及準時與打球速度的時間禮儀。" },
  { file: "formats", nav: "賽制與差點", title: "比桿賽、比洞賽與差點", desc: "比桿賽與比洞賽的規則差異、團體賽形式，以及世界差點系統和新新貝利亞制的計算方式。" },
  { file: "equipment", nav: "球桿與球", title: "球桿與高爾夫球", desc: "木桿、混血桿、鐵桿、挖起桿、推桿、桿身與握把，以及高爾夫球的規格、結構與選擇。" },
  { file: "fitness", nav: "體能與營養", title: "熱身、營養與體能訓練", desc: "下場前的熱身、飲食補水、營養補充品，以及準備期的柔軟度、肌力與爆發力訓練。" },
  { file: "health", nav: "身心健康與防護", title: "身心益處、防曬與眼睛保護", desc: "高爾夫對身體、心理與社交的好處，以及防曬和眼睛保護的完整建議。" },
  { file: "tours", nav: "2026 職業賽事", title: "2026 年職業賽事", desc: "2026 年 TPGA、TLPGA、LPGA、PGA Tour、DP World Tour 與亞洲巡迴賽的賽程與重點。" },
  { file: "courses", nav: "各國球場數量", title: "各國高爾夫球場數量", desc: "台灣、日本、韓國、美國、中國大陸、越南、泰國、英國、澳洲、紐西蘭與馬來西亞的球場數量比較。" },
  { file: "turf", nav: "草種與南部球場", title: "球場草種與南部球場", desc: "冷季草與暖季草、各區域常見草種，以及台灣南部各球場的果嶺草種整理。" },
];

function nav(current) {
  return pages
    .map((p) => {
      const cls = p.star ? ' class="star"' : "";
      const cur = p.file === current ? ' aria-current="page"' : "";
      return `    <a href="${p.file}.html"${cls}${cur}>${p.nav}</a>`;
    })
    .join("\n");
}

for (const p of pages) {
  const body = readFileSync(`content/${p.file}.html`, "utf8").trim();
  const title = p.file === "index" ? SITE : `${p.title}｜${SITE}`;
  const html = `<!doctype html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${p.desc}">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="style.css">
</head>
<body>
<header class="site"><div class="inner">
  <a class="brand" href="index.html">${SITE}</a>
  <p>${TAGLINE}</p>
  <nav class="site">
${nav(p.file)}
  </nav>
</div></header>
<main>
${body}
</main>
<footer><div class="inner">
  <p>本站內容整理於 2026 年 11 月，屬於一般資訊，不能取代醫師、教練或其他專業人員的個別建議。</p>
  <p>賽程、球場與草種資料可能變動，請以各主辦單位與球場的最新公告為準。</p>
</div></footer>
</body>
</html>
`;
  writeFileSync(`${p.file}.html`, html);
  console.log(`built ${p.file}.html`);
}
