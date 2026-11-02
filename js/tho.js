// Học thuộc thơ. Dùng đồng dao và ca dao dân gian.
// Muốn thêm bài, chỉ cần thêm một dòng vào POEMS.

const POEMS = [
  { id: "cai-bong", glyph: "Bống", title: "Cái Bống", kind: "Đồng dao", lines: ["Cái Bống là cái bống bang", "Khéo sảy khéo sàng cho mẹ nấu cơm", "Mẹ Bống đi chợ đường trơn", "Bống ra gánh đỡ chạy cơn mưa ròng"] },
  { id: "dung-dang", glyph: "Dung dăng", title: "Dung dăng dung dẻ", kind: "Đồng dao", lines: ["Dung dăng dung dẻ", "Dắt trẻ đi chơi", "Đến cửa nhà trời", "Lạy cậu lạy mợ", "Cho cháu về quê", "Cho dê đi học", "Cho cóc ở nhà", "Cho gà bới bếp", "Xì xà xì xụp", "Ngồi thụp xuống đây"] },
  { id: "con-ga", glyph: "Cục tác", title: "Con gà cục tác lá chanh", kind: "Đồng dao", lines: ["Con gà cục tác lá chanh", "Con lợn ủn ỉn mua hành cho tôi", "Con chó khóc đứng khóc ngồi", "Bà ơi đi chợ mua tôi đồng riềng"] },
  { id: "ba-cong", glyph: "Bà còng", title: "Bà còng đi chợ", kind: "Đồng dao", lines: ["Bà còng đi chợ trời mưa", "Cái tôm cái tép đi đưa bà còng", "Đưa bà đến quãng đường cong", "Đưa bà vào tận ngõ trong nhà bà", "Tiền bà trong túi rơi ra", "Tép tôm nhặt được trả bà mua rau"] },
  { id: "con-trau", glyph: "Trâu ơi", title: "Trâu ơi", kind: "Ca dao", lines: ["Trâu ơi ta bảo trâu này", "Trâu ra ngoài ruộng trâu cày với ta", "Cấy cày vốn nghiệp nông gia", "Ta đây trâu đấy ai mà quản công"] },
  { id: "cong-cha", glyph: "Công cha", title: "Công cha nghĩa mẹ", kind: "Ca dao", lines: ["Công cha như núi Thái Sơn", "Nghĩa mẹ như nước trong nguồn chảy ra", "Một lòng thờ mẹ kính cha", "Cho tròn chữ hiếu mới là đạo con"] },
  { id: "bat-com", glyph: "Bát cơm", title: "Bát cơm đầy", kind: "Ca dao", lines: ["Ai ơi bưng bát cơm đầy", "Dẻo thơm một hạt đắng cay muôn phần"] },
  { id: "bau-bi", glyph: "Bầu bí", title: "Bầu ơi thương lấy bí cùng", kind: "Ca dao", lines: ["Bầu ơi thương lấy bí cùng", "Tuy rằng khác giống nhưng chung một giàn"] },
  { id: "mot-cay", glyph: "Ba cây", title: "Một cây làm chẳng nên non", kind: "Ca dao", lines: ["Một cây làm chẳng nên non", "Ba cây chụm lại nên hòn núi cao"] },
  { id: "di-cho-biet", glyph: "Đi cho biết", title: "Đi cho biết đó biết đây", kind: "Ca dao", lines: ["Đi cho biết đó biết đây", "Ở nhà với mẹ biết ngày nào khôn"] },
];

function makePoemQuestion(poem) {
  const { lines } = poem;
  const allWords = lines.flatMap((l) => l.split(" ").slice(1));
  const otherLines = POEMS.filter((p) => p !== poem).flatMap((p) => p.lines);
  const modes = ["fill", "fill", "next", "words"];
  if (lines.length > 2) modes.push("order");
  const mode = pick(modes);

  if (mode === "fill") {
    const line = pick(lines);
    const words = line.split(" ");
    const i = rand(1, words.length - 1);
    const answer = words[i];
    const gapped = words.map((w, n) => (n === i ? '<span class="blank-word">?</span>' : w)).join(" ");
    return {
      ask: "Chọn từ còn thiếu trong câu thơ:",
      say: `Câu thơ: ${words.slice(0, i).join(" ")}. Từ tiếp theo là gì?`,
      show: `<div class="story verse">${gapped}</div>`,
      opts: withDistractors(answer, allWords.filter((w) => w.toLowerCase() !== answer.toLowerCase())),
      answer,
      optClass: "small",
      key: `fill-${line}-${i}`,
    };
  }
  if (mode === "next") {
    const i = rand(0, lines.length - 2);
    const inPoem = lines.filter((l, n) => n !== i && n !== i + 1);
    const opts = shuffle([lines[i + 1], ...sample(inPoem, 1), ...sample(otherLines, 2)]).slice(0, 4);
    if (!opts.includes(lines[i + 1])) opts[0] = lines[i + 1];
    return {
      ask: "Câu thơ tiếp theo là câu nào?",
      show: `<div class="story verse">${lines[i]}</div>`,
      opts: [...new Set(opts)], answer: lines[i + 1], optClass: "small line-opt", cols: 1, key: `next-${i}`,
    };
  }
  if (mode === "words") {
    const line = pick(lines);
    const parts = line.split(" ");
    return { ask: "Ghép các từ thành câu thơ:", tiles: shuffle(parts), target: parts, joiner: " ", key: `words-${line}` };
  }
  return {
    ask: "Xếp các câu thơ theo đúng thứ tự:",
    tiles: shuffle(lines.slice(0, 6)),
    target: lines.slice(0, 6),
    joiner: "|",
    stack: true,
    key: "order",
  };
}

GAMES.tho.push(
  ...POEMS.map((poem) => ({
    id: `tho-${poem.id}`,
    glyph: poem.glyph,
    name: poem.title,
    skill: `${poem.kind} · ${poem.lines.length} câu`,
    poem,
    make: () => makePoemQuestion(poem),
  })),
);
