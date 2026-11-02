// Các trò chơi môn Tiếng Việt.
// Ngoài câu chọn đáp án còn có câu ghép: { ask, show, tiles, target, joiner }

const ALPHABET = ["a", "ă", "â", "b", "c", "d", "đ", "e", "ê", "g", "h", "i", "k", "l", "m", "n", "o", "ô", "ơ", "p", "q", "r", "s", "t", "u", "ư", "v", "x", "y"];
const LETTER_SOUND = ["a", "á", "ớ", "bờ", "cờ", "dờ", "đờ", "e", "ê", "gờ", "hờ", "i", "ca", "lờ", "mờ", "nờ", "o", "ô", "ơ", "pờ", "quờ", "rờ", "sờ", "tờ", "u", "ư", "vờ", "xờ", "i dài"];
const LOOK_ALIKE = [["a", "ă", "â"], ["o", "ô", "ơ"], ["e", "ê"], ["u", "ư"], ["d", "đ"], ["b", "d", "p", "q"], ["m", "n"], ["i", "l"]];

// [âm đầu, phần vần, tiếng, hình]
const SYLLABLES = [
  ["c", "á", "cá", "🐟"], ["b", "ò", "bò", "🐄"], ["g", "à", "gà", "🐔"], ["m", "èo", "mèo", "🐱"],
  ["h", "oa", "hoa", "🌸"], ["nh", "à", "nhà", "🏠"], ["x", "e", "xe", "🚗"], ["c", "ây", "cây", "🌳"],
  ["tr", "ăng", "trăng", "🌙"], ["s", "ao", "sao", "⭐"], ["m", "ưa", "mưa", "🌧️"], ["c", "ua", "cua", "🦀"],
  ["t", "áo", "táo", "🍎"], ["g", "ấu", "gấu", "🐻"], ["kh", "ỉ", "khỉ", "🐵"], ["ch", "ó", "chó", "🐶"],
  ["v", "ịt", "vịt", "🦆"], ["l", "á", "lá", "🍃"], ["b", "út", "bút", "✏️"], ["s", "ách", "sách", "📖"],
  ["tr", "ống", "trống", "🥁"], ["th", "ỏ", "thỏ", "🐰"], ["đ", "èn", "đèn", "💡"], ["gh", "ế", "ghế", "🪑"],
  ["k", "ẹo", "kẹo", "🍬"], ["r", "ắn", "rắn", "🐍"], ["ng", "ựa", "ngựa", "🐴"], ["d", "ưa", "dưa", "🍉"],
  ["b", "ướm", "bướm", "🦋"], ["gi", "ày", "giày", "👟"], ["tr", "ứng", "trứng", "🥚"], ["ch", "uối", "chuối", "🍌"],
  ["c", "am", "cam", "🍊"], ["b", "óng", "bóng", "⚽"], ["m", "ũ", "mũ", "🧢"], ["l", "ợn", "lợn", "🐷"],
];

// [âm thứ nhất, âm thứ hai] tạo thành vần
const RIMES = [["a", "n"], ["a", "m"], ["o", "n"], ["o", "ng"], ["a", "c"], ["a", "t"], ["ê", "n"], ["ô", "ng"], ["a", "nh"], ["i", "a"], ["a", "i"], ["o", "i"], ["a", "o"], ["e", "o"], ["u", "a"], ["ư", "a"]];

const TONES = [
  { name: "dấu sắc", words: [["cá", "🐟"], ["lá", "🍃"], ["táo", "🍎"], ["chó", "🐶"], ["bút", "✏️"]] },
  { name: "dấu huyền", words: [["gà", "🐔"], ["bò", "🐄"], ["mèo", "🐱"], ["nhà", "🏠"], ["dừa", "🥥"]] },
  { name: "dấu hỏi", words: [["thỏ", "🐰"], ["khỉ", "🐵"], ["quả", "🍐"], ["tổ", "🪺"], ["cửa", "🚪"]] },
  { name: "dấu ngã", words: [["mũ", "🧢"], ["sữa", "🥛"], ["gỗ", "🪵"], ["vẽ", "🎨"], ["ngỗng", "🦢"]] },
  { name: "dấu nặng", words: [["vịt", "🦆"], ["ngựa", "🐴"], ["kẹo", "🍬"], ["lợn", "🐷"], ["gạo", "🌾"]] },
];
const TONE_BASES = ["ba", "ma", "la", "ca", "ta", "co", "to", "bo", "me", "ve", "lo", "mi", "bi", "tu", "cu"];
const TONE_FORMS = { a: "áàảãạ", e: "éèẻẽẹ", i: "íìỉĩị", o: "óòỏõọ", u: "úùủũụ" };

const WORDS = [
  [["con", "mèo"], "🐱"], [["bông", "hoa"], "🌸"], [["quả", "táo"], "🍎"], [["cô", "giáo"], "👩‍🏫"],
  [["xe", "đạp"], "🚲"], [["máy", "bay"], "✈️"], [["mặt", "trời"], "☀️"], [["con", "cá"], "🐟"],
  [["cái", "ghế"], "🪑"], [["bút", "chì"], "✏️"], [["quyển", "sách"], "📖"], [["ô", "tô"], "🚗"],
  [["đồng", "hồ"], "⏰"], [["cái", "ô"], "☂️"], [["tàu", "hỏa"], "🚂"], [["trường", "học"], "🏫"],
  [["mặt", "trăng"], "🌙"], [["quả", "bóng"], "⚽"], [["gia", "đình"], "👨‍👩‍👧"], [["bánh", "mì"], "🥖"],
];
const SENTENCES = [
  ["Bé", "đi", "học"], ["Mẹ", "nấu", "cơm"], ["Bố", "đọc", "báo"], ["Bà", "kể", "chuyện"],
  ["Chim", "hót", "trên", "cây"], ["Cô", "giáo", "dạy", "em"], ["Em", "tưới", "cây"], ["Trời", "mưa", "to"],
];

const CONFUSED = {
  "b/d": [["bò", "b", "🐄"], ["bóng", "b", "⚽"], ["bướm", "b", "🦋"], ["bánh", "b", "🍰"], ["dưa", "d", "🍉"], ["dép", "d", "🩴"], ["dao", "d", "🔪"], ["dê", "d", "🐐"], ["dừa", "d", "🥥"]],
  "s/x": [["sao", "s", "⭐"], ["sách", "s", "📖"], ["sữa", "s", "🥛"], ["sóng", "s", "🌊"], ["xe", "x", "🚗"], ["xoài", "x", "🥭"], ["xương", "x", "🦴"], ["xà phòng", "x", "🧼"]],
  "ch/tr": [["chó", "ch", "🐶"], ["chuối", "ch", "🍌"], ["chim", "ch", "🐦"], ["chân", "ch", "🦶"], ["trăng", "tr", "🌙"], ["trống", "tr", "🥁"], ["trâu", "tr", "🐃"], ["trứng", "tr", "🥚"]],
  "l/n": [["lá", "l", "🍃"], ["lửa", "l", "🔥"], ["lợn", "l", "🐷"], ["lê", "l", "🍐"], ["nấm", "n", "🍄"], ["nước", "n", "💧"], ["nho", "n", "🍇"], ["nến", "n", "🕯️"]],
};

const READING = [
  ["Nhà Lan có con mèo. Con mèo màu trắng.", "Con mèo màu gì?", "màu trắng", ["màu đen", "màu vàng", "màu xanh"]],
  ["Mẹ đi chợ mua cá. Bé ở nhà trông em.", "Mẹ mua gì?", "cá", ["thịt", "rau", "gạo"]],
  ["Bé Na có quả bóng đỏ. Na chơi bóng ở sân.", "Bé Na chơi ở đâu?", "ở sân", ["ở lớp", "ở chợ", "ở vườn"]],
  ["Hôm nay trời mưa. Minh mang ô đi học.", "Minh mang gì đi học?", "cái ô", ["cái mũ", "quả bóng", "con gấu"]],
  ["Ông trồng cây cam. Cây cam có nhiều quả.", "Ai trồng cây cam?", "ông", ["bà", "bố", "mẹ"]],
  ["Chú gà trống gáy vang. Mặt trời lên cao.", "Con gì gáy vang?", "gà trống", ["con vịt", "con mèo", "con chó"]],
  ["Hoa vẽ một ngôi nhà. Ngôi nhà có mái đỏ.", "Hoa vẽ gì?", "ngôi nhà", ["con cá", "ông sao", "cái cây"]],
  ["Bà kể chuyện cho bé nghe. Bé ngủ thật ngon.", "Ai kể chuyện?", "bà", ["cô giáo", "mẹ", "bố"]],
  ["Thỏ thích ăn cà rốt. Thỏ chạy rất nhanh.", "Thỏ thích ăn gì?", "cà rốt", ["cá", "xương", "cỏ khô"]],
  ["Nam có ba quyển vở. Nam giữ vở rất sạch.", "Nam có mấy quyển vở?", "ba", ["một", "hai", "bốn"]],
  ["Sáng nay, An đi học cùng bố. Bố đưa An đến trường.", "An đi học cùng ai?", "bố", ["mẹ", "bà", "chị"]],
  ["Vườn nhà em có hoa hồng. Hoa hồng rất thơm.", "Vườn nhà em có hoa gì?", "hoa hồng", ["hoa cúc", "hoa mai", "hoa sen"]],
  ["Chim sẻ làm tổ trên cây. Chim mẹ mớm mồi cho chim con.", "Chim sẻ làm tổ ở đâu?", "trên cây", ["dưới ao", "trong nhà", "ở sân"]],
  ["Trời nắng to. Các bạn ngồi đọc sách dưới gốc cây.", "Các bạn làm gì?", "đọc sách", ["đá bóng", "vẽ tranh", "hát"]],
];

const bigPic = (emoji) => `<span class="pic">${emoji}</span>`;

function makeAlphabet() {
  const mode = pick(["next", "before", "start", "same"]);
  if (mode === "next" || mode === "before") {
    const i = rand(1, ALPHABET.length - 2);
    const answer = ALPHABET[mode === "next" ? i + 1 : i - 1];
    const near = ALPHABET.slice(Math.max(0, i - 4), i + 5).filter((x) => x !== ALPHABET[i]);
    return {
      ask: `Chữ nào đứng ngay ${mode === "next" ? "sau" : "trước"} chữ ${ALPHABET[i]}?`,
      opts: withDistractors(answer, near),
      answer,
    };
  }
  if (mode === "start") {
    const singles = SYLLABLES.filter((s) => s[0].length === 1);
    const [first, , word, emoji] = pick(singles);
    return {
      ask: `Tiếng "${word}" bắt đầu bằng chữ nào?`,
      show: bigPic(emoji),
      opts: withDistractors(first, [...new Set(singles.map((s) => s[0]))]),
      answer: first,
    };
  }
  const group = pick(LOOK_ALIKE);
  const answer = pick(group);
  const opts = withDistractors(answer, [...group, ...sample(ALPHABET, 4)], 4);
  return { ask: `Tìm chữ ${answer}`, say: `Tìm chữ ${LETTER_SOUND[ALPHABET.indexOf(answer)]}`, opts, answer, key: `tim-${answer}` };
}

function makeCase() {
  const letters = ALPHABET;
  const letter = pick(letters);
  const group = LOOK_ALIKE.find((g) => g.includes(letter)) || [];
  const pool = [...group, ...sample(letters, 5)];
  const mode = pick(["upper", "lower", "which"]);
  if (mode === "upper") {
    const answer = letter.toUpperCase();
    return { ask: `Chữ hoa của chữ "${letter}" là chữ nào?`, opts: withDistractors(answer, pool.map((x) => x.toUpperCase())), answer };
  }
  if (mode === "lower") {
    const upper = letter.toUpperCase();
    return { ask: `Chữ thường của chữ "${upper}" là chữ nào?`, opts: withDistractors(letter, pool), answer: letter };
  }
  const answer = letter.toUpperCase();
  const others = sample(letters.filter((x) => x !== letter), 3);
  const wantUpper = Math.random() < 0.5;
  const right = wantUpper ? answer : letter;
  const wrong = others.map((x) => (wantUpper ? x : x.toUpperCase()));
  return { ask: wantUpper ? "Chữ nào là chữ hoa?" : "Chữ nào là chữ thường?", opts: shuffle([right, ...wrong]), answer: right, key: right + wrong.join() };
}

function makeJoin() {
  const mode = pick(["sum", "build", "build", "first", "rime"]);
  if (mode === "rime") {
    const [a, b] = pick(RIMES);
    const answer = a + b;
    return { ask: "Ghép lại thành vần gì?", show: `${a} + ${b}`, opts: withDistractors(answer, RIMES.map((r) => r[0] + r[1])), answer };
  }
  const [first, rime, word, emoji] = pick(SYLLABLES);
  if (mode === "sum") {
    const near = SYLLABLES.filter((s) => s[2] !== word).sort((x, y) => (y[0] === first || y[1] === rime) - (x[0] === first || x[1] === rime));
    return { ask: "Ghép lại thành tiếng gì?", show: `${first} + ${rime}`, opts: withDistractors(word, near.slice(0, 5).map((s) => s[2])), answer: word };
  }
  if (mode === "first") {
    return {
      ask: `Tiếng "${word}" có âm đầu là gì?`,
      show: bigPic(emoji),
      opts: withDistractors(first, SYLLABLES.map((s) => s[0])),
      answer: first,
    };
  }
  const extraFirst = pick(SYLLABLES.filter((s) => s[0] !== first))[0];
  const extraRime = pick(SYLLABLES.filter((s) => s[1] !== rime))[1];
  return {
    ask: "Chọn âm đầu rồi chọn vần để ghép tên hình:",
    say: `Ghép tiếng ${word}`,
    show: bigPic(emoji),
    tiles: shuffle([first, rime, extraFirst, extraRime]),
    target: [first, rime],
    joiner: "",
    key: `build-${word}`,
  };
}

function makeTone() {
  const names = TONES.map((t) => t.name);
  if (Math.random() < 0.6) {
    const tone = pick(TONES);
    const [word, emoji] = pick(tone.words);
    return {
      ask: `Tiếng "${word}" có dấu gì?`,
      show: bigPic(emoji),
      opts: shuffle(names), answer: tone.name, optClass: "small", cols: 3, key: `dau-${word}`,
    };
  }
  const base = pick(TONE_BASES);
  const vowel = base[base.length - 1];
  const forms = [...TONE_FORMS[vowel]].map((f) => base.slice(0, -1) + f);
  const index = rand(0, 4);
  return {
    ask: `Thêm ${names[index]} vào tiếng "${base}":`,
    show: `${base} + ${names[index]}`,
    opts: shuffle(forms), answer: forms[index], cols: 3,
  };
}

function makeBuildWord() {
  if (Math.random() < 0.65) {
    const [parts, emoji] = pick(WORDS);
    const extras = sample(WORDS.flatMap((w) => w[0]).filter((x) => !parts.includes(x)), 2);
    return {
      ask: "Ghép các tiếng thành từ đúng với hình:",
      say: "Ghép các tiếng thành từ đúng với hình",
      show: bigPic(emoji),
      tiles: shuffle([...parts, ...extras]),
      target: parts,
      joiner: " ",
      key: parts.join(" "),
    };
  }
  const parts = pick(SENTENCES);
  return {
    ask: "Sắp xếp các từ thành câu đúng:",
    tiles: shuffle(parts),
    target: parts,
    joiner: " ",
    key: parts.join(" "),
  };
}

function makeFill() {
  const [, , word, emoji] = pick(SYLLABLES);
  const chars = [...word];
  const consonants = "bcdđghklmnpqrstvx";
  const vowels = "aăâeêioôơuưy";
  const spots = chars.map((c, i) => i).filter((i) => (consonants + vowels).includes(chars[i]));
  const i = pick(spots);
  const letter = chars[i];
  const pool = [...(consonants.includes(letter) ? "bcdđghlmnstv" : vowels)];
  const gapped = chars.map((c, n) => (n === i ? "_" : c)).join("");
  return {
    ask: "Điền chữ cái còn thiếu:",
    say: `Điền chữ cái còn thiếu trong tiếng ${word}`,
    show: `${bigPic(emoji)}<span class="gapped">${gapped}</span>`,
    opts: withDistractors(letter, pool),
    answer: letter,
  };
}

function makeConfused(group) {
  const key = group || pick(Object.keys(CONFUSED));
  const [word, sound, emoji] = pick(CONFUSED[key]);
  const gapped = "__" + word.slice(sound.length);
  return {
    ask: "Chọn âm đúng để điền vào chỗ trống:",
    say: `Nghe và chọn âm đầu của tiếng ${word}`,
    show: `${bigPic(emoji)}<span class="gapped">${gapped}</span>`,
    opts: shuffle(key.split("/")),
    answer: sound,
    cols: 2,
    key: word,
  };
}

function makeReading() {
  const [text, ask, answer, wrong] = pick(READING);
  return {
    ask,
    say: `${text} ${ask}`,
    show: `<div class="story">${text}</div>`,
    opts: shuffle([answer, ...wrong]),
    answer,
    optClass: "small",
    key: text,
  };
}

GAMES.tv.push(
  { id: "abc", glyph: "a ă â", name: "Bảng chữ cái", skill: "Xem và nghe 29 chữ cái", page: "alphabet" },
  { id: "chucai", glyph: "b c d", name: "Tìm chữ cái", skill: "Nhận biết bảng chữ cái tiếng Việt", make: makeAlphabet },
  { id: "hoathuong", glyph: "A a", name: "Đôi bạn chữ", skill: "Phân biệt chữ hoa và chữ thường", make: makeCase },
  { id: "ghepam", glyph: "b + a", name: "Xếp hình tiếng", skill: "Ghép âm, ghép vần", make: makeJoin },
  { id: "dauthanh", glyph: "á à ả ã ạ", name: "Năm chiếc dấu", skill: "Sắc, huyền, hỏi, ngã, nặng", make: makeTone },
  { id: "ghepchu", glyph: "bông hoa", name: "Ghép từ, ghép câu", skill: "Ghép chữ thành từ có nghĩa", make: makeBuildWord },
  { id: "dien", glyph: "c_y", name: "Chữ đi trốn", skill: "Điền chữ cái còn thiếu", make: makeFill },
  { id: "nham", glyph: "b/d s/x", name: "Tai thính mắt tinh", skill: "Phân biệt b/d, s/x, ch/tr, l/n", make: () => makeConfused() },
  { id: "doc", glyph: "Bé đọc", name: "Đọc và trả lời", skill: "Đọc hiểu câu ngắn", make: makeReading },
);
