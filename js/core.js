// Hàm dùng chung: số ngẫu nhiên, đọc số thành chữ, giọng đọc và tiếng chuông.

const GAMES = { mg: [], toan: [], tv: [], tho: [], sach: [] };

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (list) => list[rand(0, list.length - 1)];

function shuffle(list) {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = rand(0, i);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

const sample = (list, n) => shuffle(list).slice(0, n);

// Đáp án đúng cùng các đáp án sai, không trùng nhau, đã xáo trộn.
function withDistractors(answer, others, total = 4) {
  const wrong = [...new Set(others)].filter((x) => x !== answer);
  return shuffle([answer, ...sample(wrong, total - 1)]);
}

// Đáp án số gần với số đúng để bé phải suy nghĩ.
function numberOptions(answer, min = 0, max = 100, total = 4) {
  const near = [];
  for (let d = 1; d <= 12; d++) {
    if (answer - d >= min) near.push(answer - d);
    if (answer + d <= max) near.push(answer + d);
  }
  const close = near.slice(0, Math.max(total + 2, 6));
  return withDistractors(answer, close, total).map(String);
}

// 21 -> "hai mươi mốt", 25 -> "hai mươi lăm", 14 -> "mười bốn"
function numberWords(n) {
  const unit = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
  if (n === 100) return "một trăm";
  if (n < 10) return unit[n];
  if (n === 10) return "mười";
  const tens = Math.floor(n / 10);
  const ones = n % 10;
  if (tens === 1) return "mười " + (ones === 5 ? "lăm" : unit[ones]);
  let tail = "";
  if (ones === 1) tail = " mốt";
  else if (ones === 4) tail = " tư";
  else if (ones === 5) tail = " lăm";
  else if (ones > 0) tail = " " + unit[ones];
  return unit[tens] + " mươi" + tail;
}

const Sound = {
  on: true,
  voice: null,
  ctx: null,

  loadVoices() {
    if (!("speechSynthesis" in window)) return;
    this.voice = speechSynthesis.getVoices().find((v) => /^vi/i.test(v.lang)) || null;
  },

  // Giọng đọc phụ thuộc vào máy, không có giọng tiếng Việt thì bỏ qua.
  speak(text) {
    if (!this.on || !this.voice || !text) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.voice = this.voice;
    u.lang = this.voice.lang;
    u.rate = 0.85;
    speechSynthesis.speak(u);
  },

  stopSpeaking() {
    if ("speechSynthesis" in window) speechSynthesis.cancel();
  },

  tone(notes) {
    if (!this.on) return;
    try {
      this.ctx = this.ctx || new (window.AudioContext || window.webkitAudioContext)();
      notes.forEach(([freq, at, length]) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = this.ctx.currentTime + at;
        osc.type = "triangle";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.18, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + length);
        osc.connect(gain).connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + length);
      });
    } catch (e) {
      // Trình duyệt không hỗ trợ âm thanh thì vẫn chơi bình thường.
    }
  },

  right() { this.tone([[660, 0, 0.15], [880, 0.12, 0.25]]); },
  wrong() { this.tone([[220, 0, 0.25]]); },
  fanfare() { this.tone([[523, 0, 0.15], [659, 0.15, 0.15], [784, 0.3, 0.15], [1047, 0.45, 0.4]]); },
};

Sound.loadVoices();
if ("speechSynthesis" in window) speechSynthesis.onvoiceschanged = () => Sound.loadVoices();
