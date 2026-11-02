// Trò chơi cho trẻ mẫu giáo: chơi bằng hình, mỗi lượt 5 câu, không cần biết đọc.
// Ngoài câu chọn đáp án còn có câu tự vẽ: { ask, custom(area, ctx) }
// ctx: right() báo xong, wrong() báo sai, options(q) hiện đáp án, alive() còn ở câu này không.

const MG_TOTAL = 5;
const MG_OBJECTS = ["🍎", "🍌", "🍇", "🍓", "🐶", "🐱", "🐰", "🐻", "🐟", "🐥", "🚗", "🚲", "⚽", "🎈", "🌸", "⭐", "🌙", "🏠", "🧸", "🥕"];
const once = () => `q${Math.random()}`;
const panel = (html) => `<span class="panel">${html}</span>`;

function makePattern() {
  const [a, b, c] = sample(MG_OBJECTS, 3);
  const unit = pick([[a, b], [a, b], [a, a, b], [a, b, b], [a, b, c]]);
  const row = Array.from({ length: unit.length * 2 + 1 }, (_, i) => unit[i % unit.length]);
  const hidden = row[row.length - 1];
  const cells = row.slice(0, -1).map((e) => `<span>${e}</span>`).join("");
  const other = MG_OBJECTS.filter((x) => !unit.includes(x));
  return {
    ask: "Hình nào đi tiếp theo?",
    show: `<div class="pattern">${cells}<span class="pattern-gap">?</span></div>`,
    opts: withDistractors(hidden, [...unit, ...sample(other, 3)], 3),
    answer: hidden,
    cols: 3,
    key: once(),
  };
}

function makeOddOne() {
  const [same, odd] = sample(MG_OBJECTS, 2);
  const list = shuffle([odd, ...Array(5).fill(same)]);
  const opts = list.map((e, i) => `<span data-cell="${i}">${e}</span>`);
  return { ask: "Hình nào khác các hình còn lại?", opts, answer: opts[list.indexOf(odd)], cols: 3, key: `${same}${odd}` };
}

const STORIES = [
  ["🥚", "🐣", "🐔", "Trứng nở thành gà con, gà con lớn thành gà"],
  ["🌱", "🌿", "🌳", "Hạt nảy mầm rồi lớn thành cây"],
  ["☁️", "🌧️", "🌈", "Mây kéo đến, trời mưa, rồi có cầu vồng"],
  ["🌅", "☀️", "🌙", "Sáng sớm, buổi trưa, rồi đến đêm"],
  ["👶", "🧒", "👴", "Em bé lớn lên rồi thành ông"],
  ["🛏️", "🪥", "🎒", "Ngủ dậy, đánh răng, rồi đi học"],
  ["🌾", "🍚", "😋", "Cây lúa cho gạo, nấu cơm rồi ăn thật ngon"],
];

function makeStoryOrder() {
  const story = pick(STORIES);
  const parts = story.slice(0, 3);
  let tiles = shuffle(parts);
  while (tiles.join() === parts.join()) tiles = shuffle(parts);
  return { ask: "Xếp hình theo đúng thứ tự:", say: story[3], tiles, target: parts, joiner: " ", picture: true, key: story[3] };
}

function buildMaze(size) {
  const open = {};
  const key = (r, c) => `${r},${c}`;
  const seen = new Set([key(0, 0)]);
  const stack = [[0, 0]];
  while (stack.length) {
    const [r, c] = stack[stack.length - 1];
    const next = shuffle([[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]])
      .find(([x, y]) => x >= 0 && y >= 0 && x < size && y < size && !seen.has(key(x, y)));
    if (!next) { stack.pop(); continue; }
    open[`${key(r, c)}|${key(...next)}`] = true;
    open[`${key(...next)}|${key(r, c)}`] = true;
    seen.add(key(...next));
    stack.push(next);
  }
  return (a, b) => Boolean(open[`${key(...a)}|${key(...b)}`]);
}

function makeMaze() {
  const size = pick([4, 4, 5]);
  return {
    ask: "Đưa thỏ đến củ cà rốt nhé!",
    key: once(),
    custom(area, ctx) {
      const isOpen = buildMaze(size);
      let at = [0, 0];
      const board = document.createElement("div");
      board.className = "maze";
      board.style.setProperty("--n", size);
      const go = (r, c) => {
        if (!isOpen(at, [r, c])) return;
        at = [r, c];
        draw();
        if (r === size - 1 && c === size - 1) ctx.right();
      };
      const draw = () => {
        board.innerHTML = "";
        for (let r = 0; r < size; r++) {
          for (let c = 0; c < size; c++) {
            const cell = document.createElement("button");
            cell.type = "button";
            cell.className = "maze-cell";
            if (r === 0 || !isOpen([r, c], [r - 1, c])) cell.classList.add("wall-t");
            if (c === 0 || !isOpen([r, c], [r, c - 1])) cell.classList.add("wall-l");
            if (r === size - 1 || !isOpen([r, c], [r + 1, c])) cell.classList.add("wall-b");
            if (c === size - 1 || !isOpen([r, c], [r, c + 1])) cell.classList.add("wall-r");
            const here = at[0] === r && at[1] === c;
            cell.textContent = here ? "🐰" : r === size - 1 && c === size - 1 ? "🥕" : "";
            cell.addEventListener("click", () => go(r, c));
            board.appendChild(cell);
          }
        }
      };
      const moves = { "↑": [-1, 0], "←": [0, -1], "→": [0, 1], "↓": [1, 0] };
      const pad = document.createElement("div");
      pad.className = "maze-pad";
      Object.entries(moves).forEach(([label, [dr, dc]]) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "opt";
        b.textContent = label;
        b.setAttribute("aria-label", `Đi ${label}`);
        b.addEventListener("click", () => go(at[0] + dr, at[1] + dc));
        pad.appendChild(b);
      });
      const keys = { ArrowUp: "↑", ArrowLeft: "←", ArrowRight: "→", ArrowDown: "↓" };
      ctx.onKey((e) => {
        if (!keys[e.key]) return;
        e.preventDefault();
        const [dr, dc] = moves[keys[e.key]];
        go(at[0] + dr, at[1] + dc);
      });
      draw();
      area.append(board, pad);
    },
  };
}

const TANGRAMS = [
  { name: "ngôi nhà", pieces: [["25,50 75,50 75,90 25,90", "#3a9ad9"], ["15,50 50,15 85,50", "#e8638c"]] },
  { name: "cái cây", pieces: [["50,8 72,40 28,40", "#4fb06a"], ["50,30 80,68 20,68", "#2f8f55"], ["42,68 58,68 58,92 42,92", "#a86b3c"]] },
  { name: "con thuyền", pieces: [["50,10 50,55 20,55", "#f7b52c"], ["55,20 55,55 80,55", "#e8638c"], ["15,60 85,60 72,82 28,82", "#3a9ad9"]] },
  { name: "con cá", pieces: [["15,50 60,20 60,80", "#f7b52c"], ["60,50 90,25 90,75", "#e8638c"]] },
  { name: "tên lửa", pieces: [["50,6 66,34 34,34", "#e8638c"], ["34,34 66,34 66,74 34,74", "#3a9ad9"], ["34,54 34,74 18,74", "#f7b52c"], ["66,54 82,74 66,74", "#4fb06a"]] },
];

function pieceSvg(points, color) {
  const nums = points.split(/[ ,]/).map(Number);
  const xs = nums.filter((_, i) => i % 2 === 0);
  const ys = nums.filter((_, i) => i % 2 === 1);
  const [x, y] = [Math.min(...xs), Math.min(...ys)];
  const box = `${x - 2} ${y - 2} ${Math.max(...xs) - x + 4} ${Math.max(...ys) - y + 4}`;
  return `<svg viewBox="${box}" aria-hidden="true"><polygon points="${points}" fill="${color}"/></svg>`;
}

function makeTangram() {
  const puzzle = pick(TANGRAMS);
  return {
    ask: `Ghép các mảnh thành ${puzzle.name}: chọn mảnh rồi bấm vào chỗ của nó.`,
    key: puzzle.name,
    custom(area, ctx) {
      const NS = "http://www.w3.org/2000/svg";
      let chosen = null;
      let placed = 0;
      const svg = document.createElementNS(NS, "svg");
      svg.setAttribute("viewBox", "0 0 100 100");
      svg.setAttribute("class", "tangram");
      const tray = document.createElement("div");
      tray.className = "tangram-tray";
      puzzle.pieces.forEach(([points, color], i) => {
        const slot = document.createElementNS(NS, "polygon");
        slot.setAttribute("points", points);
        slot.setAttribute("class", "tangram-slot");
        slot.addEventListener("click", () => {
          if (!chosen || slot.dataset.done) return;
          if (chosen.index !== i) {
            chosen.button.classList.add("wrong");
            setTimeout(() => chosen && chosen.button.classList.remove("wrong"), 400);
            ctx.wrong();
            return;
          }
          slot.dataset.done = "1";
          slot.style.fill = color;
          slot.style.stroke = color;
          chosen.button.hidden = true;
          chosen = null;
          placed++;
          if (placed === puzzle.pieces.length) ctx.right();
        });
        svg.appendChild(slot);
      });
      shuffle(puzzle.pieces.map((p, i) => ({ p, i }))).forEach(({ p, i }) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "opt tangram-piece";
        b.innerHTML = pieceSvg(p[0], p[1]);
        b.setAttribute("aria-label", `Mảnh ${i + 1}`);
        b.addEventListener("click", () => {
          tray.querySelectorAll("button").forEach((x) => x.classList.remove("picked"));
          b.classList.add("picked");
          chosen = { index: i, button: b };
        });
        tray.appendChild(b);
      });
      area.append(svg, tray);
    },
  };
}

function makeMemory() {
  const pairs = pick([3, 3, 4]);
  return {
    ask: "Lật hai thẻ giống nhau nhé!",
    key: once(),
    custom(area, ctx) {
      const cards = shuffle(sample(MG_OBJECTS, pairs).flatMap((e) => [e, e]));
      const grid = document.createElement("div");
      grid.className = "memory";
      let open = [];
      let found = 0;
      cards.forEach((emoji) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "memory-card";
        b.setAttribute("aria-label", "Thẻ úp");
        b.addEventListener("click", () => {
          if (open.length === 2 || open.includes(b) || b.classList.contains("up")) return;
          b.textContent = emoji;
          b.classList.add("up");
          open.push(b);
          if (open.length < 2) return;
          const [x, y] = open;
          if (x.textContent === y.textContent) {
            open = [];
            found++;
            Sound.tone([[660, 0, 0.12]]);
            if (found === pairs) ctx.right();
          } else {
            setTimeout(() => {
              [x, y].forEach((c) => { c.textContent = ""; c.classList.remove("up"); });
              open = [];
            }, 900);
          }
        });
        grid.appendChild(b);
      });
      area.appendChild(grid);
    },
  };
}

function makeVanish() {
  const size = pick([3, 4, 4]);
  const list = sample(MG_OBJECTS, size + 3);
  const shown = list.slice(0, size);
  const gone = pick(shown);
  return {
    ask: "Nhìn thật kỹ rồi bấm nút nhé!",
    key: once(),
    custom(area, ctx) {
      const row = (items) => `<div class="pattern big">${items.map((e) => `<span>${e}</span>`).join("")}</div>`;
      area.innerHTML = `<div class="custom-note">${row(shown)}</div>`;
      const ready = document.createElement("button");
      ready.type = "button";
      ready.className = "btn primary center";
      ready.textContent = "Bé nhớ rồi";
      ready.addEventListener("click", () => {
        ctx.ask("Hình nào vừa biến mất?");
        area.innerHTML = `<div class="custom-note">${row(shown.filter((e) => e !== gone))}</div>`;
        ctx.options({ opts: withDistractors(gone, list.filter((e) => !shown.includes(e) || e === gone), 3).concat([]), answer: gone, cols: 3 });
      });
      area.appendChild(ready);
    },
  };
}

const PADS = [["#e8433a", 330], ["#3a9ad9", 392], ["#f7b52c", 494], ["#4fb06a", 587]];

function makeColors(length) {
  return {
    ask: "Nhìn màu sáng lên, rồi bấm lại đúng thứ tự.",
    key: once(),
    custom(area, ctx) {
      const seq = Array.from({ length }, () => rand(0, 3));
      let step = 0;
      let busy = true;
      const grid = document.createElement("div");
      grid.className = "pads";
      const pads = PADS.map(([color, freq], i) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "pad";
        b.style.background = color;
        b.setAttribute("aria-label", `Ô màu ${i + 1}`);
        b.addEventListener("click", () => {
          if (busy) return;
          flash(i);
          if (i !== seq[step]) {
            ctx.wrong();
            step = 0;
            busy = true;
            setTimeout(play, 1000);
            return;
          }
          step++;
          if (step === seq.length) {
            busy = true;
            ctx.right();
          }
        });
        grid.appendChild(b);
        return { b, freq };
      });
      function flash(i) {
        pads[i].b.classList.add("lit");
        Sound.tone([[pads[i].freq, 0, 0.3]]);
        setTimeout(() => pads[i].b.classList.remove("lit"), 380);
      }
      function play() {
        if (!ctx.alive()) return;
        seq.forEach((c, n) => setTimeout(() => ctx.alive() && flash(c), 650 * n + 300));
        setTimeout(() => { busy = false; }, 650 * seq.length + 300);
      }
      area.appendChild(grid);
      play();
    },
  };
}

function makeCounting() {
  const n = rand(1, 10);
  const emoji = pick(MG_OBJECTS);
  return { ask: "Có bao nhiêu hình?", show: pics(emoji, n), opts: numberOptions(n, 1, 10, 3), answer: String(n), cols: 3, key: emoji + n };
}

function makePictureSum() {
  const emoji = pick(MG_OBJECTS);
  const plus = Math.random() < 0.6;
  const a = plus ? rand(1, 4) : rand(2, 5);
  const b = plus ? rand(1, 5 - a) : rand(1, a - 1);
  const value = plus ? a + b : a - b;
  const say = plus ? `${a} thêm ${b} là mấy?` : `Có ${a}, bớt đi ${b}, còn mấy?`;
  const left = emoji.repeat(a);
  const show = plus
    ? `<div class="pics-row"><span>${left}</span><span>+</span><span>${emoji.repeat(b)}</span></div>`
    : `<div class="pics-row"><span>${emoji.repeat(a - b)}<span class="crossed">${emoji.repeat(b)}</span></span></div>`;
  return { ask: plus ? "Gộp lại có mấy hình?" : "Bỏ đi các hình gạch chéo, còn mấy hình?", say, show, opts: numberOptions(value, 0, 6, 3), answer: String(value), cols: 3, key: `${a}${plus}${b}` };
}

function makeSize() {
  const emoji = pick(MG_OBJECTS);
  const mode = pick(["big", "small", "long", "short", "tall", "low"]);
  if (mode === "big" || mode === "small") {
    const sizes = shuffle([1.6, 2.8, 4.4]);
    const opts = sizes.map((s) => `<span style="font-size:${s}rem;line-height:1.1">${emoji}</span>`);
    const target = mode === "big" ? 4.4 : 1.6;
    return { ask: mode === "big" ? "Hình nào to nhất?" : "Hình nào nhỏ nhất?", opts, answer: opts[sizes.indexOf(target)], cols: 3, key: mode + emoji };
  }
  const flat = mode === "long" || mode === "short";
  const sizes = shuffle([30, 60, 100]);
  const color = pick(["#e8638c", "#3a9ad9", "#4fb06a"]);
  const bar = (s) => (flat
    ? `<span class="bar" style="width:${s}%;height:20px;background:${color}"></span>`
    : `<span class="bar" style="height:${s * 0.9}px;width:24px;background:${color}"></span>`);
  const opts = sizes.map(bar);
  const target = mode === "long" || mode === "tall" ? 100 : 30;
  const ask = { long: "Thanh nào dài nhất?", short: "Thanh nào ngắn nhất?", tall: "Cột nào cao nhất?", low: "Cột nào thấp nhất?" }[mode];
  return { ask, opts, answer: opts[sizes.indexOf(target)], cols: 3, key: `${mode}${sizes}` };
}

function makeShapeFind() {
  const kind = pick(SHAPES);
  const opts = shuffle(SHAPES.map((s) => shapeSvg(s)));
  return { ask: `Đâu là ${kind}?`, opts, answer: opts.find((o) => o.includes(`aria-label="${kind}"`)), key: once() };
}

const THINGS_NAMED = [
  ["cái bàn chải", "🪥"], ["cái ô", "☂️"], ["quả bóng", "⚽"], ["cái ghế", "🪑"], ["đôi giày", "👟"], ["cái mũ", "🧢"],
  ["quyển sách", "📖"], ["cái kéo", "✂️"], ["cái chìa khóa", "🔑"], ["xe đạp", "🚲"], ["máy bay", "✈️"], ["cái đồng hồ", "⏰"],
  ["bông hoa", "🌸"], ["quả táo", "🍎"], ["cái thìa", "🥄"], ["cái cốc", "🥛"],
];

function makeNaming() {
  const [name, emoji] = pick(THINGS_NAMED);
  const opt = ([n, e]) => `<span class="pic">${e}</span><span class="cap">${n}</span>`;
  const others = THINGS_NAMED.filter((t) => t[0] !== name);
  const list = shuffle([[name, emoji], ...sample(others, 3)]);
  return { ask: `Đâu là ${name}?`, opts: list.map(opt), answer: opt([name, emoji]), key: name };
}

const ANIMAL_SOUNDS = [
  ["con chó", "🐶", "Gâu gâu"], ["con mèo", "🐱", "Meo meo"], ["con gà", "🐔", "Ò ó o"], ["con vịt", "🦆", "Cạp cạp"],
  ["con bò", "🐄", "Ụm bò"], ["con dê", "🐐", "Be be"], ["con ếch", "🐸", "Ộp ộp"], ["con lợn", "🐷", "Ụt ịt"], ["con chim", "🐦", "Chích chòe"],
];

function makeAnimalSound() {
  const [name, emoji, sound] = pick(ANIMAL_SOUNDS);
  const list = shuffle([ANIMAL_SOUNDS.find((a) => a[0] === name), ...sample(ANIMAL_SOUNDS.filter((a) => a[0] !== name), 3)]);
  const opt = (a) => `<span class="pic">${a[1]}</span><span class="cap">${a[0]}</span>`;
  return { ask: "Con gì kêu thế này?", say: `${sound}, ${sound}. Con gì kêu thế này?`, show: `${sound}!`, opts: list.map(opt), answer: opt([name, emoji]), key: name };
}

function makeSpotDifference() {
  return {
    ask: "Hai tranh khác nhau một chỗ. Bấm vào chỗ đó ở tranh bên phải.",
    key: once(),
    custom(area, ctx) {
      const items = sample(MG_OBJECTS, 7);
      const scene = Array.from({ length: 6 }, (_, i) => items[i]);
      const changed = rand(0, 5);
      const second = scene.map((e, i) => (i === changed ? items[6] : e));
      const wrap = document.createElement("div");
      wrap.className = "two-scenes";
      const drawn = (list, active) => {
        const box = document.createElement("div");
        box.className = "scene";
        list.forEach((emoji, i) => {
          const cell = document.createElement(active ? "button" : "span");
          cell.textContent = emoji;
          if (active) {
            cell.type = "button";
            cell.addEventListener("click", () => {
              if (i === changed) { cell.classList.add("found"); ctx.right(); } else ctx.wrong();
            });
          }
          box.appendChild(cell);
        });
        return box;
      };
      wrap.append(drawn(scene, false), drawn(second, true));
      area.appendChild(wrap);
    },
  };
}

function makeBuilder() {
  return {
    ask: "Chọn màu rồi tô cho giống tranh mẫu.",
    key: once(),
    custom(area, ctx) {
      const size = 3;
      const colors = sample(PADS.map((p) => p[0]), 2);
      const target = Array.from({ length: size * size }, () => (Math.random() < 0.55 ? rand(1, 2) : 0));
      if (!target.some(Boolean)) target[4] = 1;
      const mine = target.map(() => 0);
      let brush = 1;
      const paint = (cell, v) => { cell.style.background = v ? colors[v - 1] : "var(--white)"; };
      const sampleGrid = document.createElement("div");
      sampleGrid.className = "paint-grid";
      target.forEach((v) => {
        const cell = document.createElement("span");
        paint(cell, v);
        sampleGrid.appendChild(cell);
      });
      const myGrid = document.createElement("div");
      myGrid.className = "paint-grid";
      mine.forEach((_, i) => {
        const cell = document.createElement("button");
        cell.type = "button";
        cell.setAttribute("aria-label", `Ô ${i + 1}`);
        paint(cell, 0);
        cell.addEventListener("click", () => {
          mine[i] = mine[i] === brush ? 0 : brush;
          paint(cell, mine[i]);
          if (mine.join() === target.join()) ctx.right();
        });
        myGrid.appendChild(cell);
      });
      const palette = document.createElement("div");
      palette.className = "palette";
      colors.forEach((color, i) => {
        const b = document.createElement("button");
        b.type = "button";
        b.style.background = color;
        b.setAttribute("aria-label", `Màu ${i + 1}`);
        if (i === 0) b.classList.add("picked");
        b.addEventListener("click", () => {
          brush = i + 1;
          palette.querySelectorAll("button").forEach((x) => x.classList.remove("picked"));
          b.classList.add("picked");
        });
        palette.appendChild(b);
      });
      const two = document.createElement("div");
      two.className = "two-scenes";
      two.append(sampleGrid, myGrid);
      area.append(two, palette);
    },
  };
}

function makeShadow() {
  const list = sample(MG_OBJECTS, 3);
  const answer = pick(list);
  const shape = (e) => `<span class="pic">${e}</span>`;
  return {
    ask: "Hình nào khớp với cái bóng?",
    show: panel(`<span class="shadow">${answer}</span>`),
    opts: list.map(shape), answer: shape(answer), cols: 3, key: answer,
  };
}

function quadrant(emoji, i) {
  return `<span class="quad"><span style="left:${i % 2 ? -44 : 0}px;top:${i > 1 ? -44 : 0}px">${emoji}</span></span>`;
}

function makeCompletePicture() {
  const emoji = pick(["🐶", "🐱", "🐻", "🐼", "🍎", "🏠", "🌻", "🐸", "🐷", "⚽"]);
  const missing = rand(0, 3);
  const cells = [0, 1, 2, 3].map((i) => (i === missing ? '<span class="quad empty">?</span>' : quadrant(emoji, i))).join("");
  const opts = shuffle([0, 1, 2, 3].map((i) => quadrant(emoji, i)));
  return {
    ask: "Mảnh nào hoàn thành bức tranh?",
    show: panel(`<span class="quad-grid">${cells}</span>`),
    opts, answer: quadrant(emoji, missing), key: emoji + missing,
  };
}

const MG_GAMES = [
  ["quyluat", "🐰🥕🐰", "Tìm quy luật", "Tư duy", makePattern],
  ["khacbiet", "🍎🍎🍌", "Tìm hình khác biệt", "Tư duy", makeOddOne],
  ["cauchuyen", "🥚🐣🐔", "Sắp xếp câu chuyện", "Tư duy", makeStoryOrder],
  ["mecung", "🐰⇢🥕", "Mê cung", "Tư duy", makeMaze],
  ["tangram", "🔷🔺", "Tangram", "Tư duy", makeTangram],
  ["latthe", "🃏🃏", "Lật thẻ tìm cặp", "Trí nhớ", makeMemory],
  ["bienmat", "🎈❓", "Vật gì biến mất", "Trí nhớ", makeVanish],
  ["chuoimau", "🔴🔵🟢", "Ghi nhớ chuỗi màu", "Trí nhớ", null],
  ["demso", "🍓 3", "Đếm số lượng", "Toán", makeCounting],
  ["toanhinh", "🍎+🍎", "Toán hình ảnh", "Toán", makePictureSum],
  ["kichthuoc", "🐘🐭", "So sánh kích thước", "Toán", makeSize],
  ["hinhhoc", "🔵🔺🟩", "Nhận diện hình học", "Toán", makeShapeFind],
  ["doivat", "☂️👟", "Gọi tên đồ vật", "Ngôn ngữ", makeNaming],
  ["tiengkeu", "🐶💬", "Đoán tiếng con vật", "Ngôn ngữ", makeAnimalSound],
  ["diemkhac", "🔍", "Tìm điểm khác nhau", "Quan sát", makeSpotDifference],
  ["theomau", "🎨", "Xây dựng theo mẫu", "Quan sát", makeBuilder],
  ["ghepbong", "👤", "Ghép hình với bóng", "Quan sát", makeShadow],
  ["tranh", "🖼️", "Hoàn thành bức tranh", "Quan sát", makeCompletePicture],
];

GAMES.mg.push(
  ...MG_GAMES.map(([id, glyph, name, group, make]) => {
    const game = { id: `mg-${id}`, glyph, name, group, skill: "5 câu", total: MG_TOTAL, make };
    if (id === "chuoimau") {
      // Chuỗi dài dần từ 2 đến 4 màu trong một lượt.
      let step = 0;
      game.make = () => makeColors([2, 2, 3, 3, 4][step++ % MG_TOTAL]);
    }
    return game;
  }),
);
