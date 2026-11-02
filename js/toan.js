// Các trò chơi môn Toán. Mỗi trò có hàm make() sinh ra một câu hỏi.
// Câu chọn đáp án: { ask, say, show, opts, answer, optClass, cols }

const THINGS = ["🍎", "🍊", "🍬", "⭐", "🐟", "🌸", "🐥", "🎈"];

const pics = (emoji, n) => `<span class="pics">${`<span>${emoji}</span>`.repeat(n)}</span>`;

function blocks(n) {
  const tens = Math.floor(n / 10);
  const ten = `<span class="ten">${"<i></i>".repeat(10)}</span>`;
  const ones = n % 10 ? `<span class="ones">${'<i class="one"></i>'.repeat(n % 10)}</span>` : "";
  return `<div class="blocks">${ten.repeat(tens)}${ones}</div>`;
}

function shapeSvg(kind, label) {
  const color = pick(["#e8638c", "#3a9ad9", "#f7b52c", "#4fb06a", "#8a63d2"]);
  const body = {
    "hình tròn": `<circle cx="50" cy="50" r="38" fill="${color}"/>`,
    "hình vuông": `<rect x="16" y="16" width="68" height="68" fill="${color}"/>`,
    "hình tam giác": `<polygon points="50,12 90,84 10,84" fill="${color}"/>`,
    "hình chữ nhật": `<rect x="6" y="28" width="88" height="44" fill="${color}"/>`,
  }[kind];
  return `<svg viewBox="0 0 100 100" role="img" aria-label="${label || kind}">${body}</svg>`;
}

function clockSvg(hour) {
  const numbers = Array.from({ length: 12 }, (_, i) => {
    const a = ((i + 1) * 30 - 90) * Math.PI / 180;
    const x = (100 + 74 * Math.cos(a)).toFixed(1);
    const y = (106 + 74 * Math.sin(a)).toFixed(1);
    return `<text x="${x}" y="${y}" text-anchor="middle" font-size="18" font-weight="700" fill="#2c2452">${i + 1}</text>`;
  }).join("");
  return `<span class="white"><svg width="210" height="210" viewBox="0 0 200 200" role="img" aria-label="Đồng hồ">
    <circle cx="100" cy="100" r="94" fill="#ffffff" stroke="#4a2fae" stroke-width="6"/>
    ${numbers}
    <line x1="100" y1="100" x2="100" y2="40" stroke="#3a9ad9" stroke-width="5" stroke-linecap="round"/>
    <line x1="100" y1="100" x2="100" y2="58" stroke="#d6332a" stroke-width="8" stroke-linecap="round" transform="rotate(${hour * 30} 100 100)"/>
    <circle cx="100" cy="100" r="7" fill="#2c2452"/>
  </svg></span>`;
}

function rulerSvg(cm) {
  const unit = 30;
  const left = 20;
  let ticks = "";
  for (let i = 0; i <= 12; i++) {
    const x = left + i * unit;
    ticks += `<line x1="${x}" y1="52" x2="${x}" y2="70" stroke="#2c2452" stroke-width="2"/>`;
    ticks += `<text x="${x}" y="90" text-anchor="middle" font-size="15" fill="#2c2452">${i}</text>`;
  }
  const end = left + cm * unit;
  return `<span class="white"><svg width="400" height="100" viewBox="0 0 400 100" role="img" aria-label="Thước đo">
    <rect x="4" y="52" width="392" height="46" fill="#ffe9a8" stroke="#a86b3c" stroke-width="2"/>
    ${ticks}
    <rect x="${left}" y="16" width="${cm * unit}" height="24" rx="6" fill="#e8638c"/>
    <line x1="${left}" y1="4" x2="${left}" y2="52" stroke="#6f5fb8" stroke-dasharray="4 3"/>
    <line x1="${end}" y1="4" x2="${end}" y2="52" stroke="#6f5fb8" stroke-dasharray="4 3"/>
  </svg></span>`;
}

function makeNumberQuestion() {
  const mode = pick(["count", "blocks", "toDigit", "toWord", "next"]);
  if (mode === "count") {
    const n = rand(1, 20);
    const emoji = pick(THINGS);
    return { ask: "Có bao nhiêu hình trên bảng?", show: pics(emoji, n), opts: numberOptions(n, 0, 25), answer: String(n) };
  }
  if (mode === "blocks") {
    const n = rand(11, 100);
    return {
      ask: "Mỗi cột vàng là 1 chục, mỗi chấm trắng là 1 đơn vị. Đây là số mấy?",
      show: blocks(n),
      opts: numberOptions(n, 0, 100),
      answer: String(n),
    };
  }
  if (mode === "toDigit") {
    const n = rand(0, 100);
    const word = numberWords(n);
    return { ask: "Viết số này như thế nào?", say: word, show: `<div class="story" style="text-align:center">${word}</div>`, opts: numberOptions(n), answer: String(n) };
  }
  if (mode === "toWord") {
    const n = rand(11, 99);
    const near = [n + 1, n - 1, n + 10, n - 10].filter((x) => x >= 1 && x <= 100);
    const opts = withDistractors(numberWords(n), near.map(numberWords), 3);
    return { ask: "Số này đọc là gì?", show: String(n), opts, answer: numberWords(n), optClass: "small", cols: 3 };
  }
  const n = rand(0, 99);
  const after = Math.random() < 0.5 || n === 0;
  const answer = after ? n + 1 : n - 1;
  return {
    ask: after ? `Số liền sau của ${n} là số nào?` : `Số liền trước của ${n} là số nào?`,
    opts: numberOptions(answer),
    answer: String(answer),
  };
}

function makeCompareNumber() {
  const mode = pick(["two", "two", "big", "small"]);
  const top = pick([10, 20, 100]);
  if (mode === "two") {
    const a = rand(0, top - 1);
    const b = Math.random() < 0.5 ? Math.min(100, a + rand(1, 3)) : rand(a + 1, top);
    const wantBig = Math.random() < 0.5;
    const ask = wantBig ? "Số nào lớn hơn?" : "Số nào bé hơn?";
    const answer = String(wantBig ? Math.max(a, b) : Math.min(a, b));
    return { ask, opts: shuffle([String(a), String(b)]), answer, cols: 2, key: `${ask}${a}-${b}` };
  }
  const list = sample(Array.from({ length: top + 1 }, (_, i) => i), 4);
  const wantBig = mode === "big";
  const ask = wantBig ? "Số nào lớn nhất?" : "Số nào bé nhất?";
  const answer = String(wantBig ? Math.max(...list) : Math.min(...list));
  return { ask, opts: list.map(String), answer, key: ask + list.join() };
}

function expression(a, op, b) {
  return { text: `${a} ${op} ${b}`, say: `${a} ${op === "+" ? "cộng" : "trừ"} ${b}`, value: op === "+" ? a + b : a - b };
}

function makeSum(limit) {
  let a, b;
  const op = pick(["+", "-"]);
  if (limit === 10) {
    if (op === "+") { a = rand(0, 9); b = rand(1, 10 - a); }
    else { a = rand(1, 10); b = rand(0, a); }
  } else if (limit === 20) {
    // Lớp 1 học phép tính không nhớ trong phạm vi 20.
    const ones = rand(0, 8);
    a = 10 + ones;
    b = rand(1, 9 - ones);
    if (op === "-") a += b;
  } else {
    const style = pick(["tens", "plusOnes", "both"]);
    const ta = rand(1, 8);
    const oa = style === "tens" ? 0 : rand(0, 8);
    const tb = style === "plusOnes" ? 0 : rand(1, 9 - ta);
    const ob = style === "tens" ? 0 : rand(1, 9 - oa);
    a = ta * 10 + oa;
    b = tb * 10 + ob;
    if (op === "-") a += b;
  }
  const e = expression(a, op, b);
  let show = `${e.text} = ?`;
  if (limit === 10 && op === "+" && a > 0) {
    const emoji = pick(THINGS);
    show += `<div class="pics-row"><span>${emoji.repeat(a)}</span><span>${emoji.repeat(b)}</span></div>`;
  }
  return { ask: "Kết quả là bao nhiêu?", say: `${e.say} bằng mấy?`, show, opts: numberOptions(e.value, 0, limit), answer: String(e.value) };
}

function makeMissing() {
  if (Math.random() < 0.6) {
    const step = pick([1, 1, 2, 5, 10]);
    const size = 5;
    const room = 100 - step * (size - 1);
    let start = rand(0, room);
    if (step >= 5) start -= start % step;
    const list = Array.from({ length: size }, (_, i) => start + i * step);
    const gap = rand(1, size - 1);
    const answer = list[gap];
    const row = list.map((n, i) => (i === gap ? '<span class="blank">?</span>' : `<span>${n}</span>`)).join("");
    return {
      ask: "Dãy số còn thiếu số nào?",
      show: `<div class="seq">${row}</div>`,
      opts: numberOptions(answer),
      answer: String(answer),
      key: list.join() + gap,
    };
  }
  const c = rand(4, 20);
  const a = rand(1, c - 1);
  const kind = pick(["a+?", "?+b", "c-?"]);
  if (kind === "a+?") {
    return { ask: "Số nào thay được dấu hỏi?", say: `${a} cộng mấy bằng ${c}?`, show: `${a} + ? = ${c}`, opts: numberOptions(c - a, 0, 20), answer: String(c - a) };
  }
  if (kind === "?+b") {
    return { ask: "Số nào thay được dấu hỏi?", say: `Mấy cộng ${a} bằng ${c}?`, show: `? + ${a} = ${c}`, opts: numberOptions(c - a, 0, 20), answer: String(c - a) };
  }
  return { ask: "Số nào thay được dấu hỏi?", say: `${c} trừ mấy bằng ${a}?`, show: `${c} - ? = ${a}`, opts: numberOptions(c - a, 0, 20), answer: String(c - a) };
}

const SHAPES = ["hình tròn", "hình vuông", "hình tam giác", "hình chữ nhật"];
const SHAPE_THINGS = [
  ["Bánh xe đạp", "hình tròn"], ["Đồng xu", "hình tròn"], ["Mặt trăng rằm", "hình tròn"],
  ["Bánh chưng", "hình vuông"], ["Ô cờ vua", "hình vuông"],
  ["Mái nhà", "hình tam giác"], ["Lá cờ đuôi nheo", "hình tam giác"],
  ["Quyển vở", "hình chữ nhật"], ["Cánh cửa", "hình chữ nhật"], ["Cái bảng lớp", "hình chữ nhật"],
];

function makeShape() {
  const mode = pick(["find", "name", "count", "thing"]);
  if (mode === "find") {
    const kind = pick(SHAPES);
    const opts = shuffle(SHAPES.map((s) => shapeSvg(s)));
    return { ask: `Đâu là ${kind}?`, opts, answer: opts.find((o) => o.includes(`aria-label="${kind}"`)) };
  }
  if (mode === "name") {
    const kind = pick(SHAPES);
    return {
      ask: "Đây là hình gì?",
      show: `<span class="white">${shapeSvg(kind, "hình cần gọi tên")}</span>`,
      opts: shuffle(SHAPES), answer: kind, optClass: "small", cols: 2, key: `name-${kind}`,
    };
  }
  if (mode === "count") {
    const kind = pick(SHAPES);
    const list = shuffle(Array.from({ length: 8 }, () => pick(SHAPES)).concat(kind));
    const n = list.filter((s) => s === kind).length;
    const cells = list.map((s) => `<span class="white" style="width:64px">${shapeSvg(s, "")}</span>`).join("");
    return {
      ask: `Có bao nhiêu ${kind}?`,
      show: `<div class="pics-row" style="gap:8px">${cells}</div>`,
      opts: numberOptions(n, 1, 10), answer: String(n), key: kind + list.join(),
    };
  }
  const [thing, kind] = pick(SHAPE_THINGS);
  return { ask: `${thing} có dạng hình gì?`, opts: shuffle(SHAPES), answer: kind, optClass: "small", cols: 2 };
}

function makeSign() {
  const options = { opts: [">", "<", "="], cols: 3 };
  const sign = (a, b) => (a > b ? ">" : a < b ? "<" : "=");
  const box = '<span style="color:var(--chalk-yellow)">?</span>';
  if (Math.random() < 0.65) {
    const top = pick([10, 20, 100]);
    const a = rand(0, top);
    const b = Math.random() < 0.25 ? a : Math.min(top, Math.max(0, a + pick([-10, -3, -2, -1, 1, 2, 3, 10])));
    return { ask: "Chọn dấu đúng:", say: `So sánh ${a} và ${b}. Chọn dấu đúng.`, show: `${a} ${box} ${b}`, answer: sign(a, b), ...options };
  }
  const a = rand(1, 5);
  const b = rand(0, 5);
  const c = Math.random() < 0.4 ? a + b : rand(0, 10);
  return { ask: "Tính rồi chọn dấu đúng:", say: `${a} cộng ${b} so với ${c}. Chọn dấu đúng.`, show: `${a} + ${b} ${box} ${c}`, answer: sign(a + b, c), ...options };
}

function makeStory() {
  const [p, q] = sample(["Lan", "Minh", "An", "Hoa", "Nam", "Mai"], 2);
  const addStories = [
    (a, b) => `${p} có ${a} quả táo. Mẹ cho ${p} thêm ${b} quả táo. Hỏi ${p} có tất cả bao nhiêu quả táo?`,
    (a, b) => `Trên cành có ${a} con chim. Có thêm ${b} con chim bay đến. Hỏi trên cành có tất cả bao nhiêu con chim?`,
    (a, b) => `Tổ một có ${a} bạn. Tổ hai có ${b} bạn. Hỏi cả hai tổ có bao nhiêu bạn?`,
    (a, b) => `${p} gấp được ${a} con hạc. ${q} gấp được ${b} con hạc. Hỏi cả hai bạn gấp được bao nhiêu con hạc?`,
    (a, b) => `Vườn nhà ${p} có ${a} cây cam và ${b} cây bưởi. Hỏi vườn có tất cả bao nhiêu cây?`,
  ];
  const subStories = [
    (a, b) => `${p} có ${a} viên bi. ${p} cho ${q} ${b} viên bi. Hỏi ${p} còn lại bao nhiêu viên bi?`,
    (a, b) => `Trên cành có ${a} con chim. Có ${b} con chim bay đi. Hỏi trên cành còn lại bao nhiêu con chim?`,
    (a, b) => `Trong rổ có ${a} quả cam. Mẹ lấy ra ${b} quả cam. Hỏi trong rổ còn lại bao nhiêu quả cam?`,
    (a, b) => `Lớp em có ${a} quyển truyện. Các bạn mượn ${b} quyển truyện. Hỏi lớp em còn lại bao nhiêu quyển truyện?`,
  ];
  const isAdd = Math.random() < 0.5;
  const small = Math.random() < 0.5;
  let a, b, answer;
  if (isAdd) {
    a = small ? rand(1, 8) : rand(10, 15);
    b = small ? rand(1, 10 - a) : rand(1, 4);
    answer = a + b;
  } else {
    a = small ? rand(3, 10) : rand(11, 19);
    b = small ? rand(1, a - 1) : rand(1, a - 10);
    answer = a - b;
  }
  const text = pick(isAdd ? addStories : subStories)(a, b);
  return { ask: "Đọc đề và chọn đáp án:", say: text, show: `<div class="story">${text}</div>`, opts: numberOptions(answer, 0, 20), answer: String(answer), key: text };
}

const WEEK = ["thứ hai", "thứ ba", "thứ tư", "thứ năm", "thứ sáu", "thứ bảy", "chủ nhật"];
const HEAVY = [["con voi", "🐘"], ["ô tô", "🚗"], ["con bò", "🐄"], ["con ngựa", "🐴"], ["quả dưa hấu", "🍉"]];
const LIGHT = [["con kiến", "🐜"], ["cái lông chim", "🪶"], ["con ong", "🐝"], ["chiếc lá", "🍃"], ["cái kẹo", "🍬"]];
const SIZES = [
  ["Cây bút chì dài khoảng", "15 cm", "15 kg"], ["Quyển vở dài khoảng", "24 cm", "24 kg"],
  ["Bao gạo nặng khoảng", "10 kg", "10 cm"], ["Con gà nặng khoảng", "2 kg", "2 cm"],
  ["Cái thước kẻ dài khoảng", "20 cm", "20 kg"], ["Quả dưa hấu nặng khoảng", "3 kg", "3 cm"],
];
const FACTS = [
  ["Một tuần có mấy ngày?", "7", ["5", "6", "10"]],
  ["Em nghỉ học cuối tuần vào ngày nào?", "chủ nhật", ["thứ hai", "thứ tư", "thứ năm"]],
  ["Một ngày có bao nhiêu giờ?", "24", ["7", "12", "60"]],
  ["Dụng cụ nào dùng để đo độ dài?", "cái thước", ["cái cân", "đồng hồ", "tờ lịch"]],
  ["Dụng cụ nào dùng để xem giờ?", "đồng hồ", ["cái thước", "cái cân", "cái bút"]],
  ["Dụng cụ nào dùng để biết cân nặng?", "cái cân", ["cái thước", "đồng hồ", "cái kéo"]],
];

function makeMeasure() {
  const mode = pick(["clock", "clock", "weekday", "ruler", "ruler", "heavy", "unit", "fact", "calc"]);
  if (mode === "clock") {
    const hour = rand(1, 12);
    return { ask: "Đồng hồ chỉ mấy giờ?", show: clockSvg(hour), opts: withDistractors(`${hour} giờ`, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h) => `${h} giờ`)), answer: `${hour} giờ`, optClass: "small", key: `clock${hour}` };
  }
  if (mode === "weekday") {
    const i = rand(0, 6);
    const tomorrow = Math.random() < 0.5;
    const answer = WEEK[(i + (tomorrow ? 1 : 6)) % 7];
    return { ask: `Hôm nay là ${WEEK[i]}. ${tomorrow ? "Ngày mai" : "Hôm qua"} là thứ mấy?`, opts: withDistractors(answer, WEEK), answer, optClass: "small" };
  }
  if (mode === "ruler") {
    const cm = rand(2, 12);
    return { ask: "Thanh màu hồng dài bao nhiêu xăng-ti-mét?", show: rulerSvg(cm), opts: numberOptions(cm, 1, 12).map((x) => `${x} cm`), answer: `${cm} cm`, optClass: "small", key: `ruler${cm}` };
  }
  if (mode === "heavy") {
    const heavy = pick(HEAVY);
    const light = pick(LIGHT);
    const wantHeavy = Math.random() < 0.5;
    const opt = ([name, emoji]) => `<span class="pic">${emoji}</span><span class="cap">${name}</span>`;
    return { ask: wantHeavy ? "Vật nào nặng hơn?" : "Vật nào nhẹ hơn?", opts: shuffle([opt(heavy), opt(light)]), answer: opt(wantHeavy ? heavy : light), cols: 2 };
  }
  if (mode === "unit") {
    const [text, right, wrong] = pick(SIZES);
    return { ask: `${text} bao nhiêu?`, opts: shuffle([right, wrong]), answer: right, cols: 2 };
  }
  if (mode === "fact") {
    const [ask, answer, wrong] = pick(FACTS);
    return { ask, opts: shuffle([answer, ...wrong]), answer, optClass: "small" };
  }
  const unit = pick(["cm", "kg"]);
  const a = rand(2, 10);
  const b = rand(1, 9);
  const plus = Math.random() < 0.5 || a <= b;
  const value = plus ? a + b : a - b;
  const word = unit === "cm" ? "xăng-ti-mét" : "ki-lô-gam";
  return {
    ask: "Kết quả là bao nhiêu?",
    say: `${a} ${word} ${plus ? "cộng" : "trừ"} ${b} ${word} bằng mấy ${word}?`,
    show: `${a} ${unit} ${plus ? "+" : "-"} ${b} ${unit} = ?`,
    opts: numberOptions(value, 0, 20).map((x) => `${x} ${unit}`),
    answer: `${value} ${unit}`,
    optClass: "small",
  };
}

GAMES.toan.push(
  { id: "so", glyph: "0–100", name: "Đếm số vui", skill: "Nhận biết số từ 0 đến 100", make: makeNumberQuestion },
  { id: "sosanh", glyph: "7 hay 9", name: "Chọn số thắng", skill: "So sánh các số từ 0 đến 100", make: makeCompareNumber },
  { id: "cong10", glyph: "3+4", name: "Hái quả trong 10", skill: "Cộng, trừ trong phạm vi 10", make: () => makeSum(10) },
  { id: "cong20", glyph: "12+5", name: "Leo cầu thang 20", skill: "Cộng, trừ trong phạm vi 20", make: () => makeSum(20) },
  { id: "cong100", glyph: "40+25", name: "Tên lửa 100", skill: "Cộng, trừ trong phạm vi 100", make: () => makeSum(100) },
  { id: "thieu", glyph: "2, ?, 6", name: "Tìm số trốn", skill: "Tìm số còn thiếu", make: makeMissing },
  { id: "hinh", glyph: "○ △ □", name: "Thám tử hình", skill: "Hình vuông, tròn, tam giác, chữ nhật", make: makeShape },
  { id: "dau", glyph: "> < =", name: "Cái cân dấu", skill: "Lớn hơn, bé hơn, bằng nhau", make: makeSign },
  { id: "loivan", glyph: "Lan có…", name: "Chuyện toán", skill: "Giải toán có lời văn đơn giản", make: makeStory },
  { id: "dodac", glyph: "cm kg", name: "Giờ, thước và cân", skill: "Ngày, giờ, độ dài, khối lượng", make: makeMeasure },
);
