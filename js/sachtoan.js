// Bài tập theo mục lục sách Toán 1 tập một và tập hai (Kết nối tri thức).
// Tên bài lấy theo mục lục, câu hỏi được viết riêng. Tập một chỉ dùng số trong phạm vi 10.

const mix = (...makers) => () => pick(makers)();

function numberRange(min, max) {
  return () => {
    const n = rand(min, max);
    const mode = pick(["count", "count", "word", "next"]);
    if (mode === "word") {
      return { ask: "Số này viết thế nào?", say: numberWords(n), show: `<div class="story verse">${numberWords(n)}</div>`, opts: numberOptions(n, 0, 10), answer: String(n), key: `word${n}` };
    }
    if (mode === "next" && n < max) {
      return { ask: `Số nào đứng ngay sau số ${n}?`, opts: numberOptions(n + 1, 0, 10), answer: String(n + 1), key: `next${n}` };
    }
    if (n === 0) {
      return { ask: "Trên đĩa có mấy quả táo?", show: panel('<span class="pic">🍽️</span>'), opts: numberOptions(0, 0, 10), answer: "0", key: "zero" };
    }
    const emoji = pick(THINGS);
    return { ask: "Có bao nhiêu hình trên bảng?", show: pics(emoji, n), opts: numberOptions(n, 0, 10), answer: String(n), key: `count${n}` };
  };
}

function makeMoreLess() {
  const [top, bottom] = sample(THINGS, 2);
  const a = rand(1, 9);
  const b = Math.random() < 0.3 ? a : rand(1, 9);
  const opts = ["Hàng trên nhiều hơn", "Hàng dưới nhiều hơn", "Hai hàng bằng nhau"];
  const answer = opts[a > b ? 0 : a < b ? 1 : 2];
  const line = (e, n) => `<div class="count-row">${`<span>${e}</span>`.repeat(n)}</div>`;
  return { ask: "So sánh số lượng hai hàng:", show: line(top, a) + line(bottom, b), opts, answer, optClass: "small", cols: 1, key: `${a}-${b}` };
}

function makeCompareTen() {
  const sign = (a, b) => (a > b ? ">" : a < b ? "<" : "=");
  const a = rand(0, 10);
  const b = Math.random() < 0.25 ? a : rand(0, 10);
  if (Math.random() < 0.6) {
    const box = '<span style="color:var(--chalk-yellow)">?</span>';
    return { ask: "Chọn dấu đúng:", say: `So sánh ${a} và ${b}.`, show: `${a} ${box} ${b}`, opts: [">", "<", "="], answer: sign(a, b), cols: 3, key: `${a}?${b}` };
  }
  const list = sample([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3);
  const big = Math.random() < 0.5;
  const ask = big ? "Số nào lớn nhất?" : "Số nào bé nhất?";
  return { ask, opts: list.map(String), answer: String(big ? Math.max(...list) : Math.min(...list)), cols: 3, key: ask + list };
}

function makeSplit() {
  const total = rand(2, 10);
  const a = rand(1, total - 1);
  const b = total - a;
  const [x, y] = sample(THINGS, 2);
  const row = `<div class="pics-row"><span>${x.repeat(a)}</span><span>${y.repeat(b)}</span></div>`;
  if (Math.random() < 0.5) {
    return { ask: `${total} gồm ${a} và mấy?`, show: row, opts: numberOptions(b, 0, 10), answer: String(b), key: `tach${total}-${a}` };
  }
  return { ask: `${a} và ${b} là mấy?`, show: row, opts: numberOptions(total, 0, 10), answer: String(total), key: `gop${a}-${b}` };
}

const JOIN_FACTS = [
  ["Ghép 2 hình vuông bằng nhau cạnh nhau, được hình gì?", "hình chữ nhật"],
  ["Ghép 2 hình tam giác vuông bằng nhau, có thể được hình gì?", "hình vuông"],
  ["Mái nhà hay được xếp bằng hình gì?", "hình tam giác"],
  ["Thân ngôi nhà hay được xếp bằng hình gì?", "hình vuông"],
  ["Bánh xe được xếp bằng hình gì?", "hình tròn"],
];

function makeJoinShapes() {
  if (Math.random() < 0.5) return makeTangram();
  const [ask, answer] = pick(JOIN_FACTS);
  return { ask, opts: shuffle(SHAPES), answer, optClass: "small", cols: 2, key: ask };
}

function makeAddTen() {
  const a = rand(1, 9);
  const b = rand(1, 10 - a);
  const emoji = pick(THINGS);
  return {
    ask: "Có thêm vào thì được bao nhiêu?",
    say: `${a} cộng ${b} bằng mấy?`,
    show: `${a} + ${b} = ?<div class="pics-row"><span>${emoji.repeat(a)}</span><span>${emoji.repeat(b)}</span></div>`,
    opts: numberOptions(a + b, 0, 10),
    answer: String(a + b),
    key: `${a}+${b}`,
  };
}

function makeSubTen() {
  const a = rand(1, 10);
  const b = rand(0, a);
  const emoji = pick(THINGS);
  return {
    ask: "Bớt đi thì còn lại bao nhiêu?",
    say: `${a} trừ ${b} bằng mấy?`,
    show: `${a} - ${b} = ?<div class="pics-row"><span>${emoji.repeat(a - b)}<span class="crossed">${emoji.repeat(b)}</span></span></div>`,
    opts: numberOptions(a - b, 0, 10),
    answer: String(a - b),
    key: `${a}-${b}`,
  };
}

function makeTable() {
  const value = rand(2, 10);
  const mode = pick(["equal", "swap", "gap"]);
  if (mode === "equal") {
    const right = rand(1, value - 1);
    const expr = (a, op, b) => `${a} ${op} ${b}`;
    const answer = expr(right, "+", value - right);
    const pool = [];
    for (let a = 1; a < 10; a++) {
      for (let b = 1; a + b <= 10; b++) if (a + b !== value) pool.push(expr(a, "+", b));
    }
    return { ask: `Phép tính nào có kết quả bằng ${value}?`, opts: withDistractors(answer, pool, 3), answer, cols: 3, key: `bang${value}${right}` };
  }
  const a = rand(1, value - 1);
  const b = value - a;
  if (mode === "swap") {
    return { ask: "Đổi chỗ hai số, kết quả không đổi. Số nào thay được dấu hỏi?", say: `${a} cộng ${b} bằng ${b} cộng mấy?`, show: `${a} + ${b} = ${b} + ?`, opts: numberOptions(a, 0, 10), answer: String(a), key: `swap${a}${b}` };
  }
  return { ask: "Số nào thay được dấu hỏi?", say: `${value} trừ ${a} bằng mấy?`, show: `${value} - ${a} = ?`, opts: numberOptions(b, 0, 10), answer: String(b), key: `gap${value}${a}` };
}

// Vẽ khối nhìn nghiêng gồm mặt trước, mặt trên và mặt bên.
function blockSvg(w, h, color, label) {
  const d = 20;
  const [x, y] = [10, 90 - h];
  return `<svg viewBox="0 0 110 100" role="img" aria-label="${label}">
    <polygon points="${x},${y} ${x + d},${y - d} ${x + w + d},${y - d} ${x + w},${y}" fill="${color}" opacity=".7"/>
    <polygon points="${x + w},${y} ${x + w + d},${y - d} ${x + w + d},${y + h - d} ${x + w},${y + h}" fill="${color}" opacity=".5"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${color}"/>
  </svg>`;
}

const SOLIDS = [
  ["khối lập phương", () => blockSvg(52, 52, "#3a9ad9", "khối lập phương")],
  ["khối hộp chữ nhật", () => blockSvg(78, 36, "#e8638c", "khối hộp chữ nhật")],
];
const SOLID_THINGS = [
  ["Con xúc xắc", "khối lập phương"], ["Khối ru-bích", "khối lập phương"],
  ["Hộp sữa", "khối hộp chữ nhật"], ["Viên gạch", "khối hộp chữ nhật"], ["Quyển sách dày", "khối hộp chữ nhật"], ["Bao diêm", "khối hộp chữ nhật"],
];

function makeSolid() {
  const names = SOLIDS.map((s) => s[0]);
  const mode = pick(["find", "name", "thing"]);
  const pair = pick(SOLIDS);
  if (mode === "find") {
    const opts = shuffle(SOLIDS.map((s) => s[1]()));
    return { ask: `Đâu là ${pair[0]}?`, opts, answer: opts.find((o) => o.includes(`aria-label="${pair[0]}"`)), cols: 2, key: `find${pair[0]}` };
  }
  if (mode === "name") {
    return { ask: "Đây là khối gì?", show: `<span class="white">${pair[1]()}</span>`, opts: shuffle(names), answer: pair[0], optClass: "small", cols: 2, key: `name${pair[0]}` };
  }
  const [thing, answer] = pick(SOLID_THINGS);
  return { ask: `${thing} có dạng khối gì?`, opts: shuffle(names), answer, optClass: "small", cols: 2, key: thing };
}

const ARROWS = [["⬅️", "sang trái"], ["➡️", "sang phải"], ["⬆️", "lên trên"], ["⬇️", "xuống dưới"]];

function makePosition() {
  const list = sample(MG_OBJECTS, 3);
  const opts = shuffle(list);
  const mode = pick(["row", "row", "stack", "arrow"]);
  if (mode === "row") {
    const spot = rand(0, 2);
    const word = ["bên trái", "ở giữa", "bên phải"][spot];
    return { ask: `Hình nào ${word}?`, show: `<div class="pattern">${list.map((e) => `<span>${e}</span>`).join("")}</div>`, opts, answer: list[spot], cols: 3, key: `row${word}${list}` };
  }
  if (mode === "stack") {
    const spot = pick([0, 2]);
    const word = spot === 0 ? "trên cùng" : "dưới cùng";
    return { ask: `Hình nào ở ${word}?`, show: `<div class="stack-row">${list.map((e) => `<span>${e}</span>`).join("")}</div>`, opts, answer: list[spot], cols: 3, key: `stack${word}${list}` };
  }
  const [arrow, way] = pick(ARROWS);
  return { ask: "Mũi tên chỉ hướng nào?", show: arrow, opts: shuffle(ARROWS.map((a) => a[1])), answer: way, optClass: "small", cols: 2, key: way };
}

const numbers5 = numberRange(0, 5);
const numbers10 = numberRange(6, 10);
const numbersAll = numberRange(0, 10);
const shapesPlain = makeShape;
const calc = mix(makeAddTen, makeSubTen, makeTable);
const geometry = mix(shapesPlain, makeSolid, makePosition);

const MATH_TOPICS = [
  ["Chủ đề 1: Các số từ 0 đến 10", [
    [1, "0 → 5", "Các số 0, 1, 2, 3, 4, 5", numbers5],
    [2, "6 → 10", "Các số 6, 7, 8, 9, 10", numbers10],
    [3, "Nhiều, ít", "Nhiều hơn, ít hơn, bằng nhau", makeMoreLess],
    [4, "5 > 3", "So sánh số", makeCompareTen],
    [5, "3 và 2", "Mấy và mấy", makeSplit],
    [6, "Luyện tập", "Luyện tập chung", mix(numbersAll, makeMoreLess, makeCompareTen, makeSplit)],
  ]],
  ["Chủ đề 2: Làm quen với một số hình phẳng", [
    [7, "○ △ □", "Hình vuông, tròn, tam giác, chữ nhật", shapesPlain],
    [8, "Xếp hình", "Thực hành lắp ghép, xếp hình", makeJoinShapes],
    [9, "Luyện tập", "Luyện tập chung", mix(shapesPlain, makeJoinShapes)],
  ]],
  ["Chủ đề 3: Phép cộng, phép trừ trong phạm vi 10", [
    [10, "3 + 4", "Phép cộng trong phạm vi 10", makeAddTen],
    [11, "7 - 2", "Phép trừ trong phạm vi 10", makeSubTen],
    [12, "Bảng", "Bảng cộng, bảng trừ trong phạm vi 10", makeTable],
    [13, "Luyện tập", "Luyện tập chung", calc],
  ]],
  ["Chủ đề 4: Làm quen với một số hình khối", [
    [14, "Khối", "Khối lập phương, khối hộp chữ nhật", makeSolid],
    [15, "Trái, phải", "Vị trí, định hướng trong không gian", makePosition],
    [16, "Luyện tập", "Luyện tập chung", mix(makeSolid, makePosition)],
  ]],
  ["Chủ đề 5: Ôn tập học kì 1", [
    [17, "Ôn số", "Ôn tập các số trong phạm vi 10", mix(numbersAll, makeCompareTen, makeSplit)],
    [18, "Ôn tính", "Ôn tập phép cộng, phép trừ trong phạm vi 10", calc],
    [19, "Ôn hình", "Ôn tập hình học", geometry],
    [20, "Ôn chung", "Ôn tập chung", mix(numbersAll, makeCompareTen, calc, geometry)],
  ]],
];

// Tập hai: số đến 100, đo độ dài, tính không nhớ, giờ và lịch.

function makeTwoDigitNumber() {
  const n = rand(10, 99);
  const [tens, ones] = [Math.floor(n / 10), n % 10];
  const mode = pick(["blocks", "parts", "build", "word"]);
  if (mode === "blocks") {
    return { ask: "Mỗi cột vàng là 1 chục, mỗi chấm trắng là 1 đơn vị. Đây là số mấy?", show: blocks(n), opts: numberOptions(n, 10, 99), answer: String(n), key: `khoi${n}` };
  }
  if (mode === "parts") {
    const label = (t, o) => `${t} chục ${o} đơn vị`;
    const others = [label(ones || 1, tens), label(tens, (ones + 1) % 10), label(tens % 9 + 1, ones), label(tens, (ones + 2) % 10)];
    return { ask: `Số ${n} gồm mấy chục và mấy đơn vị?`, opts: withDistractors(label(tens, ones), others), answer: label(tens, ones), optClass: "small", cols: 2, key: `gom${n}` };
  }
  if (mode === "build") {
    return { ask: `${tens} chục và ${ones} đơn vị là số nào?`, opts: numberOptions(n, 10, 99), answer: String(n), key: `lap${n}` };
  }
  return { ask: "Số này viết thế nào?", say: numberWords(n), show: `<div class="story verse">${numberWords(n)}</div>`, opts: numberOptions(n, 10, 99), answer: String(n), key: `doc${n}` };
}

function makeCompareTwoDigit() {
  const a = rand(10, 99);
  const close = Math.floor(a / 10) * 10 + rand(0, 9);
  const b = Math.random() < 0.15 ? a : Math.random() < 0.5 ? close : rand(10, 99);
  if (Math.random() < 0.6) {
    const sign = a > b ? ">" : a < b ? "<" : "=";
    const box = '<span style="color:var(--chalk-yellow)">?</span>';
    return { ask: "Chọn dấu đúng:", say: `So sánh ${a} và ${b}.`, show: `${a} ${box} ${b}`, opts: [">", "<", "="], answer: sign, cols: 3, key: `${a}?${b}` };
  }
  const list = sample(Array.from({ length: 90 }, (_, i) => i + 10), 4);
  const big = Math.random() < 0.5;
  const ask = big ? "Số nào lớn nhất?" : "Số nào bé nhất?";
  return { ask, opts: list.map(String), answer: String(big ? Math.max(...list) : Math.min(...list)), key: ask + list };
}

function makeHundredChart() {
  const mode = pick(["chart", "chart", "after", "tens"]);
  if (mode === "chart") {
    const row = rand(0, 6);
    const col = rand(0, 5);
    const cells = [];
    for (let r = row; r < row + 4; r++) for (let c = col; c < col + 5; c++) cells.push(r * 10 + c + 1);
    const answer = pick(cells);
    const html = cells.map((n) => (n === answer ? '<span class="blank">?</span>' : `<span>${n}</span>`)).join("");
    return { ask: "Ô nào bị che trong bảng số?", show: `<div class="chart">${html}</div>`, opts: numberOptions(answer, 1, 100), answer: String(answer), key: `bang${answer}${row}${col}` };
  }
  if (mode === "after") {
    const n = rand(1, 99);
    return { ask: `Số liền sau của ${n} là số nào?`, opts: numberOptions(n + 1, 1, 100), answer: String(n + 1), key: `sau${n}` };
  }
  const start = rand(1, 5) * 10;
  const list = [start, start + 10, start + 20, start + 30];
  return { ask: "Đếm thêm 10. Số tiếp theo là số nào?", show: `<div class="seq">${list.map((n) => `<span>${n}</span>`).join("")}<span class="blank">?</span></div>`, opts: numberOptions(start + 40, 10, 100), answer: String(start + 40), key: `muoi${start}` };
}

function makeLengthCompare() {
  const colors = [["đỏ", "#e8433a"], ["xanh", "#3a9ad9"], ["vàng", "#f7b52c"]];
  const widths = shuffle([35, 65, 100]);
  const longest = Math.random() < 0.5;
  const target = widths.indexOf(longest ? 100 : 35);
  const bars = colors.map(([, c], i) => `<span class="len-bar" style="width:${widths[i]}%;background:${c}"></span>`).join("");
  return {
    ask: `Thanh nào ${longest ? "dài nhất" : "ngắn nhất"}?`,
    show: `<div class="len-bars">${bars}</div>`,
    opts: colors.map(([name]) => `Thanh ${name}`),
    answer: `Thanh ${colors[target][0]}`,
    optClass: "small",
    cols: 3,
    key: `${longest}${widths}`,
  };
}

function makeRulerRead() {
  const cm = rand(2, 12);
  return { ask: "Thanh màu hồng dài bao nhiêu xăng-ti-mét?", show: rulerSvg(cm), opts: numberOptions(cm, 1, 12).map((x) => `${x} cm`), answer: `${cm} cm`, optClass: "small", key: `thuoc${cm}` };
}

function makeCmCalc() {
  const a = rand(2, 15);
  const b = rand(1, 19 - a);
  const plus = Math.random() < 0.5 || a <= b;
  const value = plus ? a + b : a - b;
  return {
    ask: "Kết quả là bao nhiêu?",
    say: `${a} xăng-ti-mét ${plus ? "cộng" : "trừ"} ${b} xăng-ti-mét bằng mấy xăng-ti-mét?`,
    show: `${a} cm ${plus ? "+" : "-"} ${b} cm = ?`,
    opts: numberOptions(value, 0, 20).map((x) => `${x} cm`),
    answer: `${value} cm`,
    optClass: "small",
    key: `cm${a}${plus}${b}`,
  };
}

const LENGTH_ESTIMATES = [
  ["Cây bút chì dài khoảng bao nhiêu?", "15 cm", ["1 cm", "90 cm"]],
  ["Quyển vở dài khoảng bao nhiêu?", "24 cm", ["2 cm", "99 cm"]],
  ["Cục tẩy dài khoảng bao nhiêu?", "4 cm", ["40 cm", "90 cm"]],
  ["Cái thước kẻ của em dài khoảng bao nhiêu?", "20 cm", ["2 cm", "80 cm"]],
  ["Một gang tay của em dài khoảng bao nhiêu?", "12 cm", ["1 cm", "70 cm"]],
  ["Chiếc bàn học dài khoảng bao nhiêu?", "90 cm", ["3 cm", "9 cm"]],
];

function makeEstimate() {
  if (Math.random() < 0.4) {
    return { ask: "Xăng-ti-mét viết tắt là gì?", opts: shuffle(["cm", "kg", "km", "m"]), answer: "cm", cols: 2, key: "viettat" };
  }
  const [ask, answer, wrong] = pick(LENGTH_ESTIMATES);
  return { ask, opts: shuffle([answer, ...wrong]), answer, optClass: "small", cols: 3, key: ask };
}

function verticalSum(a, op, b) {
  return `<div class="vertical"><span></span><span>${a}</span><span>${op}</span><span>${b}</span></div>`;
}

// Phép tính không nhớ, mode: "+1" và "-1" là với số có một chữ số, "+2" và "-2" là hai chữ số.
function makeTwoDigitCalc(mode) {
  return () => {
    let a;
    let b;
    if (mode === "+1") {
      const ones = rand(0, 8);
      a = rand(1, 9) * 10 + ones;
      b = rand(1, 9 - ones);
    } else if (mode === "+2") {
      const [ta, oa] = [rand(1, 8), rand(0, 8)];
      a = ta * 10 + oa;
      b = rand(1, 9 - ta) * 10 + rand(0, 9 - oa);
    } else if (mode === "-1") {
      const ones = rand(1, 9);
      a = rand(1, 9) * 10 + ones;
      b = rand(1, ones);
    } else {
      const [ta, oa] = [rand(2, 9), rand(0, 9)];
      a = ta * 10 + oa;
      b = rand(1, ta - 1) * 10 + rand(0, oa);
    }
    const op = mode[0];
    const value = op === "+" ? a + b : a - b;
    const show = Math.random() < 0.5 ? verticalSum(a, op, b) : `${a} ${op} ${b} = ?`;
    return {
      ask: "Kết quả là bao nhiêu?",
      say: `${a} ${op === "+" ? "cộng" : "trừ"} ${b} bằng mấy?`,
      show,
      opts: numberOptions(value, 0, 100),
      answer: String(value),
      calc: [a, op, b],
      key: `${a}${op}${b}`,
    };
  };
}

function makeClockRead() {
  const hour = rand(1, 12);
  const mode = pick(["read", "read", "short", "long", "pick"]);
  if (mode === "short") {
    return { ask: `Lúc ${hour} giờ, kim ngắn chỉ vào số mấy?`, opts: numberOptions(hour, 1, 12), answer: String(hour), key: `ngan${hour}` };
  }
  if (mode === "long") {
    return { ask: "Khi đồng hồ chỉ giờ đúng, kim dài chỉ vào số mấy?", opts: shuffle(["12", "3", "6", "9"]), answer: "12", key: "kimdai" };
  }
  if (mode === "pick") {
    const hours = sample([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].filter((h) => h !== hour), 3);
    const opts = shuffle([hour, ...hours]).map(clockSvg);
    return { ask: `Đồng hồ nào chỉ ${hour} giờ?`, opts, answer: clockSvg(hour), cols: 2, key: `chon${hour}` };
  }
  return { ask: "Đồng hồ chỉ mấy giờ?", show: clockSvg(hour), opts: withDistractors(`${hour} giờ`, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h) => `${h} giờ`)), answer: `${hour} giờ`, optClass: "small", key: `doc${hour}` };
}

function makeWeekday() {
  if (Math.random() < 0.25) {
    return { ask: "Một tuần có mấy ngày?", opts: shuffle(["7", "5", "6", "10"]), answer: "7", key: "tuan" };
  }
  const i = rand(0, 6);
  const tomorrow = Math.random() < 0.5;
  const answer = WEEK[(i + (tomorrow ? 1 : 6)) % 7];
  return { ask: `Hôm nay là ${WEEK[i]}. ${tomorrow ? "Ngày mai" : "Hôm qua"} là thứ mấy?`, opts: withDistractors(answer, WEEK), answer, optClass: "small", key: `${i}${tomorrow}` };
}

function makeCalendar() {
  const start = rand(1, 22);
  const dates = WEEK.map((_, i) => start + i);
  const heads = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((d) => `<b>${d}</b>`).join("");
  const show = `<div class="week-sheet">${heads}${dates.map((d) => `<span>${d}</span>`).join("")}</div>`;
  const i = rand(0, 6);
  if (Math.random() < 0.5) {
    return { ask: `Ngày ${dates[i]} là thứ mấy?`, show, opts: withDistractors(WEEK[i], WEEK), answer: WEEK[i], optClass: "small", key: `thu${start}${i}` };
  }
  return { ask: `${WEEK[i][0].toUpperCase()}${WEEK[i].slice(1)} là ngày mấy?`, show, opts: numberOptions(dates[i], start, start + 6), answer: String(dates[i]), key: `ngay${start}${i}` };
}

const makeAny = mix(makeTwoDigitCalc("+1"), makeTwoDigitCalc("+2"), makeTwoDigitCalc("-1"), makeTwoDigitCalc("-2"));
const twoDigitNumbers = mix(makeTwoDigitNumber, makeCompareTwoDigit, makeHundredChart);
const lengths = mix(makeLengthCompare, makeRulerRead, makeCmCalc, makeEstimate);
const timeAll = mix(makeClockRead, makeWeekday, makeCalendar);

const MATH_TOPICS_2 = [
  ["Chủ đề 6: Các số đến 100", [
    [21, "47", "Số có hai chữ số", makeTwoDigitNumber],
    [22, "47 > 39", "So sánh số có hai chữ số", makeCompareTwoDigit],
    [23, "1 → 100", "Bảng các số từ 1 đến 100", makeHundredChart],
    [24, "Luyện tập", "Luyện tập chung", twoDigitNumbers],
  ]],
  ["Chủ đề 7: Độ dài và đo độ dài", [
    [25, "Dài, ngắn", "Dài hơn, ngắn hơn", makeLengthCompare],
    [26, "cm", "Đơn vị đo độ dài", mix(makeRulerRead, makeCmCalc)],
    [27, "Ước lượng", "Thực hành ước lượng và đo độ dài", mix(makeEstimate, makeRulerRead)],
    [28, "Luyện tập", "Luyện tập chung", lengths],
  ]],
  ["Chủ đề 8: Phép cộng, phép trừ (không nhớ) trong phạm vi 100", [
    [29, "32 + 5", "Số có hai chữ số cộng số có một chữ số", makeTwoDigitCalc("+1")],
    [30, "32 + 15", "Số có hai chữ số cộng số có hai chữ số", makeTwoDigitCalc("+2")],
    [31, "37 - 5", "Số có hai chữ số trừ số có một chữ số", makeTwoDigitCalc("-1")],
    [32, "47 - 15", "Số có hai chữ số trừ số có hai chữ số", makeTwoDigitCalc("-2")],
    [33, "Luyện tập", "Luyện tập chung", mix(makeAny, makeStory)],
  ]],
  ["Chủ đề 9: Thời gian. Giờ và lịch", [
    [34, "7 giờ", "Xem giờ đúng trên đồng hồ", makeClockRead],
    [35, "Thứ hai", "Ngày trong tuần", makeWeekday],
    [36, "Lịch", "Thực hành xem lịch và giờ", mix(makeCalendar, makeClockRead)],
    [37, "Luyện tập", "Luyện tập chung", timeAll],
  ]],
  ["Chủ đề 10: Ôn tập cuối năm", [
    [38, "Ôn 10", "Ôn tập các số và phép tính trong phạm vi 10", mix(numbersAll, makeCompareTen, calc)],
    [39, "Ôn 100", "Ôn tập các số và phép tính trong phạm vi 100", mix(twoDigitNumbers, makeAny)],
    [40, "Ôn hình, đo", "Ôn tập hình học và đo lường", mix(geometry, lengths, timeAll)],
    [41, "Ôn chung", "Ôn tập chung", mix(twoDigitNumbers, makeAny, makeStory, geometry, lengths, timeAll)],
  ]],
];

const mathCards = (volume, topics) => topics.flatMap(([topic, lessons]) => lessons.map(([n, glyph, skill, make]) => ({
  id: `toan-bai-${n}`, book: "toan", group: `${volume} · ${topic}`, glyph, name: `Bài ${n}`, skill, make,
})));

GAMES.sach.push(...mathCards("Tập một", MATH_TOPICS), ...mathCards("Tập hai", MATH_TOPICS_2));
