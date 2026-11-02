// Điều khiển màn hình: trang chủ, một lượt chơi 10 câu, kết quả.

const ROUND = 10;
const STORE_KEY = "be-vui-hoc";
const $ = (id) => document.getElementById(id);

const PRAISE = ["Đúng rồi!", "Giỏi quá!", "Tuyệt vời!", "Bé làm đúng rồi!", "Chính xác!"];

let saved = loadSaved();
let round = null;
let subject = GAMES[saved.subject] ? saved.subject : "toan";
const SUBJECTS = ["mg", "toan", "tv", "tho", "sach"];
let book = saved.book === "toan" ? "toan" : "tv";

function loadSaved() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY)) || { stars: {} };
  } catch (e) {
    return { stars: {} };
  }
}

function save() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(saved));
  } catch (e) {
    // Không lưu được thì lần sau bé bắt đầu lại từ đầu.
  }
}

function showScreen(name) {
  ["home", "play", "result", "alphabet", "poem"].forEach((id) => { $(id).hidden = id !== name; });
  window.scrollTo(0, 0);
}

function starsText(n) {
  return `<b>${"★".repeat(n)}</b>${"★".repeat(3 - n)}`;
}

function renderHome() {
  Sound.stopSpeaking();
  round = null;
  const stars = saved.stars || {};
  const total = Object.values(stars).reduce((sum, n) => sum + n, 0);
  $("star-total").textContent = `★ ${total}`;
  SUBJECTS.forEach((s) => {
    $(`tab-${s}`).setAttribute("aria-selected", String(s === subject));
  });
  $("cards").innerHTML = "";
  $("cards").className = `cards ${subject}`;
  $("book-switch").hidden = subject !== "sach";
  $("book-tv").setAttribute("aria-pressed", String(book === "tv"));
  $("book-toan").setAttribute("aria-pressed", String(book === "toan"));
  const games = subject === "sach" ? GAMES.sach.filter((g) => (g.book || "tv") === book) : GAMES[subject];
  let group = null;
  games.forEach((game, i) => {
    if (game.group && game.group !== group) {
      group = game.group;
      const head = document.createElement("h2");
      head.className = "group-title";
      head.textContent = group;
      $("cards").appendChild(head);
    }
    const card = document.createElement("button");
    card.type = "button";
    card.className = `card tint-${i % 4}`;
    card.innerHTML = `
      <span class="card-glyph">${game.glyph}</span>
      <span class="card-name">${game.name}</span>
      <span class="card-skill">${game.skill}</span>
      ${game.make ? `<span class="card-stars">${starsText(stars[game.id] || 0)}</span>` : ""}`;
    card.addEventListener("click", () => {
      if (game.page) renderAlphabet();
      else if (game.poem) renderPoem(game);
      else startGame(game);
    });
    $("cards").appendChild(card);
  });
  showScreen("home");
}

// Học thuộc bằng cách che dần các chữ, bé đọc nhẩm phần bị che.
function renderPoem(game) {
  const { poem } = game;
  const cover = Sound.voice ? "Bấm vào câu thơ để nghe đọc." : "Đọc to từng câu rồi che bớt chữ và đọc lại.";
  const lines = poem.lines.map((line) => line.split(" ").map((word, i) => ({ word, i, hidden: false })));
  $("poem").innerHTML = `
    <div class="play-head">
      <button class="back" id="btn-back" type="button">← Trang chủ</button>
      <h1 class="play-title">${poem.title}</h1>
    </div>
    <p class="abc-note">${poem.kind}. ${cover}</p>
    <div class="board poem-board" id="poem-lines"></div>
    <div class="result-actions poem-actions">
      <button class="btn" id="btn-cover" type="button">Che bớt chữ</button>
      <button class="btn" id="btn-uncover" type="button">Hiện lại cả bài</button>
      ${Sound.voice ? '<button class="btn" id="btn-listen" type="button">Nghe cả bài</button>' : ""}
      <button class="btn primary" id="btn-practice" type="button">Luyện thuộc lòng</button>
    </div>`;

  const draw = () => {
    $("poem-lines").innerHTML = "";
    lines.forEach((line, n) => {
      const row = document.createElement("p");
      row.className = "poem-line";
      row.addEventListener("click", () => Sound.speak(poem.lines[n]));
      line.forEach((item) => {
        const word = document.createElement(item.hidden ? "button" : "span");
        word.textContent = item.word;
        if (item.hidden) {
          word.type = "button";
          word.className = "covered";
          word.setAttribute("aria-label", "Hiện chữ bị che");
          word.addEventListener("click", (e) => {
            e.stopPropagation();
            item.hidden = false;
            draw();
          });
        }
        row.append(word, " ");
      });
      $("poem-lines").appendChild(row);
    });
  };

  $("btn-back").addEventListener("click", renderHome);
  $("btn-practice").addEventListener("click", () => startGame(game));
  $("btn-uncover").addEventListener("click", () => {
    lines.flat().forEach((item) => { item.hidden = false; });
    draw();
  });
  $("btn-cover").addEventListener("click", () => {
    // Chừa lại chữ đầu mỗi câu làm gợi ý, các chữ còn lại che dần.
    const visible = lines.flat().filter((item) => !item.hidden && item.i > 0);
    sample(visible, Math.ceil(visible.length / 3) || 0).forEach((item) => { item.hidden = true; });
    draw();
  });
  if (Sound.voice) $("btn-listen").addEventListener("click", () => Sound.speak(poem.lines.join(". ")));
  draw();
  showScreen("poem");
}

function renderAlphabet() {
  const note = Sound.voice ? "Bấm vào chữ để nghe đọc." : "Mỗi ô có chữ hoa và chữ thường đi cùng nhau.";
  $("alphabet").innerHTML = `
    <div class="play-head">
      <button class="back" id="btn-back" type="button">← Trang chủ</button>
      <h1 class="play-title">Bảng chữ cái tiếng Việt</h1>
    </div>
    <p class="abc-note">${note}</p>
    <div class="abc" id="abc"></div>`;
  $("btn-back").addEventListener("click", renderHome);
  ALPHABET.forEach((letter, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "opt";
    b.textContent = `${letter.toUpperCase()} ${letter}`;
    b.addEventListener("click", () => Sound.speak(LETTER_SOUND[i]));
    $("abc").appendChild(b);
  });
  showScreen("alphabet");
}

// Mười câu không trùng nhau; nếu trò có ít dạng câu thì chấp nhận lặp lại.
function makeQuestions(game) {
  const seen = new Set();
  const list = [];
  const total = game.total || ROUND;
  for (let tries = 0; list.length < total && tries < 300; tries++) {
    const q = game.make();
    const key = q.key || q.ask + (q.show || "") + q.answer;
    if (seen.has(key) && tries < 250) continue;
    seen.add(key);
    list.push(q);
  }
  return list;
}

function startGame(game) {
  round = { game, questions: makeQuestions(game), index: 0, score: 0, missed: false, streak: 0, total: game.total || ROUND };
  renderQuestion();
  showScreen("play");
}

function renderQuestion() {
  const q = round.questions[round.index];
  round.missed = false;
  round.locked = false;
  round.onKey = null;
  const place = (round.index / round.total) * 100;
  const sayButton = Sound.voice ? '<button class="say" id="btn-say" type="button" aria-label="Nghe đọc câu hỏi">♪</button>' : "";
  $("play").innerHTML = `
    <div class="play-head">
      <button class="back" id="btn-back" type="button">← Trang chủ</button>
      <h1 class="play-title">${round.game.name} · Câu ${round.index + 1}/${round.total}</h1>
    </div>
    <div class="track" aria-hidden="true">
      <span class="runner" style="left:${place}%">🐰</span>
      <span class="goal">🥕</span>
    </div>
    <div class="board">
      <div class="ask-row">${sayButton}<p class="ask">${q.ask}</p></div>
      <div class="show">${q.show || ""}</div>
    </div>
    <div id="answer-area"></div>
    <p class="feedback" id="feedback" role="status"></p>`;
  $("btn-back").addEventListener("click", renderHome);
  if (sayButton) $("btn-say").addEventListener("click", () => Sound.speak(q.say || q.ask));
  if (q.custom) renderCustom(q);
  else if (q.tiles) renderBuild(q);
  else renderOptions(q);
  Sound.speak(q.say || q.ask);
}

// Trò có cách chơi riêng tự vẽ vào vùng trả lời và báo kết quả qua ctx.
function renderCustom(q) {
  const area = document.createElement("div");
  const here = round;
  const index = round.index;
  const alive = () => round === here && round.index === index;
  $("answer-area").appendChild(area);
  q.custom(area, {
    alive,
    right: () => alive() && onRight(),
    wrong: () => alive() && onWrong(),
    onKey: (fn) => { round.onKey = fn; },
    ask: (text) => {
      document.querySelector(".ask").textContent = text;
      Sound.speak(text);
    },
    options: (next) => renderOptions(next),
  });
}

function renderOptions(q) {
  const area = document.createElement("div");
  area.className = "options";
  area.style.setProperty("--cols", q.cols || 4);
  q.opts.forEach((opt) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = `opt ${q.optClass || ""}`;
    b.innerHTML = opt;
    b.addEventListener("click", () => {
      if (round.locked) return;
      if (opt === q.answer) {
        b.classList.add("right");
        area.querySelectorAll("button").forEach((x) => { x.disabled = true; });
        onRight();
      } else {
        b.classList.add("wrong");
        b.disabled = true;
        onWrong();
      }
    });
    area.appendChild(b);
  });
  $("answer-area").appendChild(area);
}

function renderBuild(q) {
  const slots = document.createElement("div");
  slots.className = `slots ${q.stack ? "stack" : ""} ${q.picture ? "picture" : ""}`;
  const pool = document.createElement("div");
  pool.className = `pool ${q.stack ? "stack" : ""} ${q.picture ? "picture" : ""}`;
  const placed = q.target.map(() => null);

  const redrawSlots = () => {
    slots.innerHTML = "";
    placed.forEach((tile, i) => {
      const s = document.createElement("button");
      s.type = "button";
      s.className = `slot ${tile ? "filled" : ""}`;
      s.textContent = tile ? tile.text : "";
      s.setAttribute("aria-label", tile ? `Bỏ ${tile.text}` : `Ô trống ${i + 1}`);
      s.addEventListener("click", () => {
        if (!tile || round.locked) return;
        tile.button.disabled = false;
        placed[i] = null;
        slots.classList.remove("wrong");
        redrawSlots();
      });
      slots.appendChild(s);
    });
  };

  q.tiles.forEach((text) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "opt tile";
    b.textContent = text;
    b.addEventListener("click", () => {
      if (round.locked) return;
      const free = placed.indexOf(null);
      if (free < 0) return;
      placed[free] = { text, button: b };
      b.disabled = true;
      slots.classList.remove("wrong");
      redrawSlots();
      if (placed.includes(null)) return;
      if (placed.map((t) => t.text).join(q.joiner) === q.target.join(q.joiner)) {
        slots.classList.add("right");
        onRight();
      } else {
        slots.classList.add("wrong");
        onWrong();
        round.locked = true;
        setTimeout(() => {
          placed.forEach((t, i) => { t.button.disabled = false; placed[i] = null; });
          slots.classList.remove("wrong");
          redrawSlots();
          round.locked = false;
        }, 900);
      }
    });
    pool.appendChild(b);
  });

  redrawSlots();
  $("answer-area").append(slots, pool);
}

function onRight() {
  round.locked = true;
  if (!round.missed) {
    round.score++;
    round.streak++;
  }
  const text = round.streak >= 3 && !round.missed ? `${round.streak} câu đúng liên tiếp!` : pick(PRAISE);
  const fb = $("feedback");
  fb.className = "feedback good";
  fb.textContent = text;
  Sound.right();
  document.querySelector(".runner").style.left = `${((round.index + 1) / round.total) * 100}%`;
  setTimeout(nextQuestion, 1200);
}

function onWrong() {
  round.missed = true;
  round.streak = 0;
  const fb = $("feedback");
  fb.className = "feedback bad";
  fb.textContent = "Chưa đúng, bé thử lại nhé!";
  Sound.wrong();
}

function nextQuestion() {
  if (!round) return;
  round.index++;
  if (round.index >= round.total) renderResult();
  else renderQuestion();
}

function renderResult() {
  const { game, score, total } = round;
  const ratio = score / total;
  const stars = ratio >= 0.9 ? 3 : ratio >= 0.7 ? 2 : ratio >= 0.5 ? 1 : 0;
  saved.stars = saved.stars || {};
  saved.stars[game.id] = Math.max(saved.stars[game.id] || 0, stars);
  save();
  const message = ["Bé chơi lại để giành sao nhé!", "Khá lắm, cố thêm chút nữa!", "Bé giỏi lắm!", "Xuất sắc! Bé được đủ 3 sao!"][stars];
  $("result").innerHTML = `
    <div class="result-page">
      <div class="stamp"><b>${total === ROUND ? score : `${score}/${total}`}</b>${total === ROUND ? "điểm" : "câu đúng"}</div>
      <p class="result-stars" aria-label="${stars} trên 3 sao">${starsText(stars)}</p>
      <p class="result-msg">${message}</p>
      <div class="result-actions">
        <button class="btn primary" id="btn-again" type="button">Chơi lại</button>
        <button class="btn" id="btn-other" type="button">Chọn trò khác</button>
      </div>
    </div>`;
  $("btn-again").addEventListener("click", () => startGame(game));
  $("btn-other").addEventListener("click", renderHome);
  showScreen("result");
  Sound.fanfare();
  Sound.speak(total === ROUND ? `Bé được ${score} điểm. ${message}` : message);
}

function setSubject(next) {
  subject = next;
  saved.subject = next;
  save();
  renderHome();
}

$("btn-home").addEventListener("click", renderHome);
["tv", "toan"].forEach((b) => $(`book-${b}`).addEventListener("click", () => {
  book = b;
  saved.book = b;
  save();
  renderHome();
}));
document.addEventListener("keydown", (e) => {
  if (round && round.onKey) round.onKey(e);
});
SUBJECTS.forEach((s) => $(`tab-${s}`).addEventListener("click", () => setSubject(s)));
$("btn-sound").addEventListener("click", (e) => {
  Sound.on = !Sound.on;
  if (!Sound.on) Sound.stopSpeaking();
  e.target.setAttribute("aria-pressed", String(Sound.on));
  e.target.textContent = `Âm thanh: ${Sound.on ? "bật" : "tắt"}`;
});

renderHome();
