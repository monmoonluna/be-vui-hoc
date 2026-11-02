// Bài tập theo trình tự bài học sách Tiếng Việt 1 (NXB Giáo dục Việt Nam).
// Danh sách bài lấy theo mục lục sách; câu hỏi và bài đọc được viết riêng cho trang này.

// Kho từ và câu đọc của tập một, xếp theo nhóm bài.
const BOOK_HK1 = [
  {
    id: "hk1-1", glyph: "b c d đ", name: "Âm đầu tiên", lessons: "Bài 1–9: a, b, c, e, ê, o, ô, d, đ, ơ", label: "âm đầu",
    sounds: { b: ["ba", "bà", "bé", "bê"], c: ["cá", "cà", "cô", "cờ"], d: ["dê", "dế", "da"], đ: ["đá", "đò", "đỗ", "đê"] },
    read: [
      ["Bà có cá.", "Bà có gì?", "cá", ["cà", "dê", "đỗ"]],
      ["Bé có cờ đỏ.", "Bé có gì?", "cờ đỏ", ["cá", "bê", "đá"]],
      ["Cô có dế. Bé có bê.", "Bé có con gì?", "bê", ["dế", "cá", "dê"]],
    ],
    order: [["Bà", "có", "cá"], ["Bé", "có", "cờ"], ["Cô", "có", "dê"]],
  },
  {
    id: "hk1-2", glyph: "ch kh ng", name: "Âm ghép đôi", lessons: "Bài 11–19: i, k, h, l, u, ư, ch, kh, m, n, g, gi, gh, nh, ng, ngh", label: "âm đầu",
    sounds: { h: ["hổ", "hè", "hồ"], l: ["lá", "lê", "lọ"], k: ["kẻ", "kê", "kể"], ch: ["chó", "chè", "chợ"], kh: ["khỉ", "khế", "khó"], m: ["mẹ", "mũ", "mè"], n: ["nơ", "na", "no"], g: ["gà", "gỗ", "gờ"], gi: ["giỏ", "giá", "giò"], gh: ["ghế", "ghi", "ghẹ"], nh: ["nhà", "nho", "nhớ"], ng: ["ngô", "ngủ", "ngõ"], ngh: ["nghé", "nghĩ", "nghe"] },
    read: [
      ["Mẹ đi chợ mua khế và lê.", "Mẹ đi đâu?", "đi chợ", ["đi học", "đi ngủ", "đi chơi"]],
      ["Nhà bé có ghế gỗ.", "Ghế làm bằng gì?", "gỗ", ["đá", "lá", "giỏ"]],
      ["Chú khỉ thích ăn na.", "Chú khỉ thích ăn gì?", "na", ["cá", "ngô", "khế"]],
    ],
    order: [["Mẹ", "đi", "chợ"], ["Bé", "ngủ", "ở", "nhà"], ["Gà", "ăn", "ngô"]],
  },
  {
    id: "hk1-3", glyph: "tr th ph", name: "Âm chị, âm em", lessons: "Bài 21–28: r, s, t, tr, th, ia, ua, ưa, ph, qu, v, x, y", label: "âm đầu",
    sounds: { r: ["rổ", "rễ", "ru"], s: ["sò", "sẻ", "su"], t: ["tô", "tổ", "tủ"], tr: ["tre", "trà", "trê"], th: ["thỏ", "thu", "thơ"], ph: ["phố", "phở", "phà"], qu: ["quả", "quê", "quà"], v: ["vở", "vẽ", "vé"], x: ["xe", "xa", "xô"] },
    read: [
      ["Bố đi xe về quê thăm bà.", "Bố về đâu?", "về quê", ["về phố", "về nhà", "về trường"]],
      ["Bé vẽ quả thị vào vở.", "Bé vẽ vào đâu?", "vào vở", ["vào tủ", "vào rổ", "vào xô"]],
      ["Mẹ cho bé quả na. Bé chia cho em.", "Bé chia quả cho ai?", "cho em", ["cho bà", "cho mẹ", "cho bố"]],
    ],
    order: [["Bố", "đi", "xe"], ["Bé", "vẽ", "quả", "na"], ["Mẹ", "về", "quê"]],
  },
  {
    id: "hk1-4", glyph: "an am", name: "Vần n và m", lessons: "Bài 31–37: an, ăn, ân, on, ôn, ơn, en, ên, in, un, am, ăm, âm, om, ôm, ơm, em, êm, im, um", label: "vần",
    sounds: { an: ["bàn", "lan", "đàn"], ăn: ["khăn", "chăn", "lặn"], ân: ["cân", "sân", "chân"], on: ["con", "non", "ngon"], ôn: ["thôn", "môn", "tôn"], ơn: ["sơn", "lợn", "cơn"], en: ["đèn", "sen", "kèn"], ên: ["tên", "nến", "lên"], in: ["tin", "pin", "xin"], un: ["giun", "bún", "phun"], am: ["cam", "làm", "nam"], ăm: ["tăm", "chăm", "năm"], âm: ["nấm", "tấm", "cầm"], om: ["xóm", "nhóm", "đom"], ôm: ["tôm", "cốm", "nồm"], ơm: ["cơm", "bơm", "thơm"], em: ["kem", "tem", "xem"], êm: ["đêm", "mềm", "thêm"], im: ["chim", "tim", "kim"], um: ["chùm", "trùm", "tùm"] },
    read: [
      ["Bé quét sân cùng mẹ. Sân nhà thật sạch.", "Bé quét gì?", "quét sân", ["quét nhà", "quét lớp", "quét vườn"]],
      ["Đêm nay trăng sáng. Cả nhà ăn cơm ngoài sân.", "Cả nhà ăn cơm ở đâu?", "ngoài sân", ["trong bếp", "ở chợ", "ở lớp"]],
      ["Con chim non đậu trên cành cam.", "Con chim đậu ở đâu?", "trên cành cam", ["trên mái nhà", "dưới sân", "trong rổ"]],
    ],
    order: [["Bé", "ăn", "cơm"], ["Chim", "đậu", "trên", "cành"], ["Mẹ", "thắp", "nến"]],
  },
  {
    id: "hk1-5", glyph: "ai ao", name: "Vần i và o", lessons: "Bài 38–44: ai, ay, ây, oi, ôi, ơi, ui, ưi, ao, eo, au, âu, êu, iu, ưu", label: "vần",
    sounds: { ai: ["hai", "tai", "mai"], ay: ["tay", "bay", "máy"], ây: ["cây", "mây", "dây"], oi: ["voi", "còi", "ngói"], ôi: ["tôi", "đôi", "nồi"], ơi: ["bơi", "chơi", "lời"], ui: ["vui", "núi", "túi"], ưi: ["gửi", "ngửi"], ao: ["sao", "táo", "cháo"], eo: ["mèo", "kéo", "kẹo"], au: ["rau", "cau", "sáu"], âu: ["trâu", "cầu", "sâu"], êu: ["kêu", "lều", "nêu"], iu: ["rìu", "níu", "dịu"], ưu: ["cừu", "hưu", "lựu"] },
    read: [
      ["Con mèo trèo cây cau. Con chuột sợ chạy mau.", "Con mèo trèo cây gì?", "cây cau", ["cây táo", "cây cam", "cây tre"]],
      ["Bé hái rau cùng bà. Rau tươi và xanh mát.", "Bé hái rau cùng ai?", "cùng bà", ["cùng mẹ", "cùng bố", "cùng em"]],
      ["Mây bay trên núi. Gió thổi mát rượi.", "Mây bay ở đâu?", "trên núi", ["trên sông", "trong nhà", "dưới ao"]],
    ],
    order: [["Mèo", "trèo", "cây", "cau"], ["Bé", "hái", "rau"], ["Voi", "có", "vòi", "dài"]],
  },
  {
    id: "hk1-6", glyph: "ac at ap", name: "Vần c, t, p", lessons: "Bài 46–54: ac, ăc, âc, oc, ôc, uc, ưc, at, ăt, ât, ot, ôt, ơt, et, êt, it, ut, ưt, ap, ăp, âp, op, ôp, ơp", label: "vần",
    sounds: { ac: ["bác", "nhạc", "lạc"], ăc: ["mặc", "bắc", "mắc"], âc: ["gấc", "bậc", "nhấc"], oc: ["cóc", "học", "sóc"], ôc: ["cốc", "gốc", "độc"], uc: ["cúc", "trúc", "múc"], ưc: ["mực", "sức", "lực"], at: ["hát", "mát", "bát"], ăt: ["mắt", "cắt", "mặt"], ât: ["đất", "mật", "thật"], ot: ["ngọt", "hót", "rót"], ôt: ["cột", "bột", "tốt"], ơt: ["vợt", "thớt", "nhớt"], et: ["vẹt", "két", "mét"], êt: ["tết", "dệt", "bết"], it: ["vịt", "mít", "thịt"], ut: ["bút", "mút", "phút"], ưt: ["mứt", "nứt", "sứt"], ap: ["tháp", "cáp", "đáp"], ăp: ["cặp", "bắp", "sắp"], âp: ["tập", "mập", "lập"], op: ["họp", "góp", "cọp"], ôp: ["hộp", "lốp", "tốp"], ơp: ["lớp", "hợp", "chớp"] },
    read: [
      ["Tết đến, bà làm mứt gừng. Mứt ngọt và thơm.", "Bà làm gì?", "làm mứt", ["làm bánh", "làm cơm", "làm vườn"]],
      ["Bé đeo cặp đến lớp. Ở lớp, bé học hát.", "Bé học gì ở lớp?", "học hát", ["học bơi", "học vẽ", "học múa"]],
      ["Chú vẹt có bộ lông xanh. Vẹt nói rất giỏi.", "Lông chú vẹt màu gì?", "màu xanh", ["màu đỏ", "màu đen", "màu trắng"]],
    ],
    order: [["Bé", "đeo", "cặp", "đến", "lớp"], ["Chim", "hót", "hay"], ["Bà", "làm", "mứt"]],
  },
  {
    id: "hk1-7", glyph: "anh ong", name: "Vần ng và nh", lessons: "Bài 56–61: ep, êp, ip, up, anh, ênh, inh, ach, êch, ich, ang, ăng, âng, ong, ông, ung, ưng", label: "vần",
    sounds: { ep: ["dép", "đẹp", "kẹp"], êp: ["bếp", "xếp", "nếp"], ip: ["nhịp", "kịp", "chíp"], up: ["búp", "súp", "giúp"], anh: ["bánh", "canh", "xanh"], ênh: ["kênh", "lênh", "bệnh"], inh: ["tính", "kính", "xinh"], ach: ["sách", "vách", "khách"], êch: ["lệch", "chệch"], ich: ["xích", "thích", "lịch"], ang: ["bàng", "trang", "vàng"], ăng: ["trăng", "măng", "nắng"], âng: ["tầng", "vâng", "nâng"], ong: ["bóng", "dòng", "cong"], ông: ["sông", "công", "trồng"], ung: ["trung", "nhung", "cùng"], ưng: ["trứng", "lưng", "mừng"] },
    read: [
      ["Mẹ nấu canh rau trong bếp. Bé giúp mẹ xếp bát.", "Bé giúp mẹ làm gì?", "xếp bát", ["quét nhà", "nấu cơm", "tưới cây"]],
      ["Bé thích đọc sách. Sách có nhiều tranh đẹp.", "Bé thích làm gì?", "đọc sách", ["đá bóng", "vẽ tranh", "đi bơi"]],
      ["Trăng tròn và sáng. Cả xóm ra sông ngắm trăng.", "Cả xóm ngắm gì?", "ngắm trăng", ["ngắm sao", "ngắm hoa", "ngắm mưa"]],
    ],
    order: [["Bé", "thích", "đọc", "sách"], ["Mẹ", "nấu", "canh"], ["Gà", "mẹ", "ấp", "trứng"]],
  },
  {
    id: "hk1-8", glyph: "iê uô", name: "Vần iê, uô", lessons: "Bài 62–69: iêc, iên, iêp, iêng, iêm, yên, iêt, iêu, yêu, uôi, uôm, uôc, uôt, uôn, uông, ươi, ươu", label: "vần",
    sounds: { iêc: ["xiếc", "tiệc", "việc"], iên: ["tiên", "biển", "kiến"], iêp: ["hiệp", "tiếp", "thiếp"], iêng: ["tiếng", "miệng", "riêng"], iêm: ["kiếm", "tiệm", "chiếm"], yên: ["yên", "yến"], iêt: ["viết", "biết", "tiết"], iêu: ["diều", "chiều", "nhiều"], yêu: ["yêu", "yếu"], uôi: ["chuối", "muối", "đuôi"], uôm: ["buồm", "nhuộm"], uôc: ["cuốc", "thuốc", "đuốc"], uôt: ["chuột", "suốt", "tuốt"], uôn: ["cuộn", "muốn", "khuôn"], uông: ["chuông", "luống", "xuống"], ươi: ["mười", "tươi", "người"], ươu: ["hươu", "bướu", "khướu"] },
    read: [
      ["Chiều nay, bé thả diều cùng anh. Diều bay cao lắm.", "Bé thả diều cùng ai?", "cùng anh", ["cùng bố", "cùng mẹ", "cùng bà"]],
      ["Thuyền buồm ra biển. Gió thổi căng cánh buồm.", "Thuyền buồm đi đâu?", "ra biển", ["lên núi", "về sông", "vào chợ"]],
      ["Bé tập viết. Bé viết chữ thật cẩn thận.", "Bé viết chữ như thế nào?", "thật cẩn thận", ["thật nhanh", "thật to", "thật ẩu"]],
    ],
    order: [["Bé", "thả", "diều"], ["Em", "yêu", "biển", "xanh"], ["Chuông", "kêu", "reng", "reng"]],
  },
  {
    id: "hk1-9", glyph: "ươ oa", name: "Vần ươ, oa, uy", lessons: "Bài 71–79: ươc, ươt, ươm, ươp, ươn, ương, oa, oe, oan, oăn, oat, oăt, oai, uê, uy, uân, uât, uyên, uyêt", label: "vần",
    sounds: { ươc: ["nước", "thước", "bước"], ươt: ["lướt", "mượt", "vượt"], ươm: ["bướm", "gươm", "lượm"], ươp: ["mướp", "cướp"], ươn: ["vườn", "lươn", "mượn"], ương: ["gương", "đường", "trường"], oa: ["hoa", "loa", "tỏa"], oe: ["xòe", "khỏe", "lóe"], oan: ["ngoan", "toán", "khoan"], oăn: ["xoăn", "thoăn"], oat: ["hoạt", "soát", "thoát"], oăt: ["ngoặt", "loắt", "hoắt"], oai: ["ngoài", "khoai", "xoài"], uê: ["huệ", "thuê"], uy: ["thủy", "lũy", "tùy"], uân: ["xuân", "huân", "tuần"], uât: ["xuất", "khuất", "luật"], uyên: ["thuyền", "khuyên", "chuyện"], uyêt: ["tuyết", "huyết", "khuyết"] },
    read: [
      ["Mùa xuân, vườn nhà em đầy hoa. Bướm bay lượn quanh vườn.", "Vườn có nhiều gì?", "hoa", ["quả", "cá", "gà"]],
      ["Bé đi đường cẩn thận. Bé đi trên vỉa hè.", "Bé đi ở đâu?", "trên vỉa hè", ["giữa đường", "dưới nước", "trong vườn"]],
      ["Nam học toán rất giỏi. Nam ngoan và hay giúp bạn.", "Nam giỏi môn gì?", "môn toán", ["môn hát", "môn vẽ", "môn bơi"]],
    ],
    order: [["Bé", "đi", "đến", "trường"], ["Bướm", "bay", "trong", "vườn"], ["Nam", "học", "toán", "giỏi"]],
  },
];

// Học kì 2: tám chủ đề, mỗi chủ đề đúng 10 câu.
const BOOK_HK2 = [
  {
    id: "hk2-1", glyph: "Bạn", name: "Tôi và các bạn", lessons: "Chủ đề 1",
    read: [
      ["An là học sinh lớp 1. An có bạn thân tên là Bi.", "Bạn thân của An tên là gì?", "Bi", ["Lan", "Nam", "Mai"]],
      ["Bi quên bút. An cho Bi mượn bút của mình.", "An cho Bi mượn gì?", "bút", ["vở", "thước", "cặp"]],
      ["Ra chơi, các bạn cùng nhảy dây ở sân trường.", "Các bạn chơi gì?", "nhảy dây", ["đá cầu", "trốn tìm", "bắn bi"]],
      ["Hôm nay là sinh nhật Mai. Các bạn tặng Mai một tấm thiệp.", "Các bạn tặng Mai gì?", "tấm thiệp", ["cái bánh", "quả bóng", "bông hoa"]],
    ],
    fill: [["Bạn bè phải biết", "nhau.", "giúp đỡ", ["trêu chọc", "cãi", "giành"]], ["Em nói lời", "khi được bạn giúp.", "cảm ơn", ["tạm biệt", "xin lỗi", "chào"]], ["Em là", "lớp 1.", "học sinh", ["cô giáo", "bác sĩ", "chú bộ đội"]]],
    order: [["An", "cho", "bạn", "mượn", "bút"], ["Em", "là", "học", "sinh", "lớp", "1"], ["Các", "bạn", "chơi", "nhảy", "dây"]],
  },
  {
    id: "hk2-2", glyph: "Nhà", name: "Mái ấm gia đình", lessons: "Chủ đề 2",
    read: [
      ["Tối nào, cả nhà cũng ăn cơm cùng nhau. Bữa cơm thật vui.", "Khi nào cả nhà ăn cơm cùng nhau?", "buổi tối", ["buổi sáng", "buổi trưa", "giờ ra chơi"]],
      ["Trời nóng, bé cầm quạt quạt cho ông ngủ.", "Bé quạt cho ai?", "ông", ["bố", "em", "chị"]],
      ["Là anh, Tí nhường đồ chơi cho em.", "Tí nhường gì cho em?", "đồ chơi", ["quần áo", "sách", "cơm"]],
      ["Chủ nhật, bố mẹ đưa hai chị em đi công viên.", "Cả nhà đi đâu?", "công viên", ["đi chợ", "đi biển", "về quê"]],
    ],
    fill: [["Ông bà là người", "trong nhà.", "lớn tuổi nhất", ["nhỏ nhất", "cao nhất", "nhanh nhất"]], ["Con phải", "lời bố mẹ.", "nghe", ["cãi", "quên", "bỏ"]], ["Anh chị phải", "em nhỏ.", "nhường", ["giành với", "dọa", "mắng"]]],
    order: [["Cả", "nhà", "ăn", "cơm"], ["Em", "yêu", "bà"], ["Bố", "đưa", "em", "đi", "học"]],
  },
  {
    id: "hk2-3", glyph: "Lớp", name: "Mái trường mến yêu", lessons: "Chủ đề 3",
    read: [
      ["Sáng sớm, tiếng trống trường vang lên. Các bạn xếp hàng vào lớp.", "Các bạn nghe tiếng gì?", "tiếng trống", ["tiếng chim", "tiếng còi", "tiếng đàn"]],
      ["Trong sân trường có cây bàng to. Tán bàng che mát cả sân.", "Cây gì che mát sân trường?", "cây bàng", ["cây bưởi", "cây tre", "cây mít"]],
      ["Cô giáo dạy em đọc và viết. Em rất quý cô.", "Cô dạy em làm gì?", "đọc và viết", ["nấu cơm", "bơi lội", "lái xe"]],
      ["Giờ ra chơi, sân trường rộn tiếng cười.", "Sân trường vui nhất vào lúc nào?", "giờ ra chơi", ["giờ học", "ban đêm", "ngày nghỉ"]],
    ],
    fill: [["Em đến lớp phải đúng", ".", "giờ", ["ngày", "tháng", "năm"]], ["Trước khi vào lớp, chúng em", "ngay ngắn.", "xếp hàng", ["ngủ", "nằm", "chạy"]], ["Em giữ gìn sách", "sạch đẹp.", "vở", ["bánh", "cá", "gà"]]],
    order: [["Cô", "giáo", "dạy", "em", "đọc"], ["Em", "đi", "học", "đúng", "giờ"], ["Trống", "trường", "vang", "lên"]],
  },
  {
    id: "hk2-4", glyph: "Biết", name: "Điều em cần biết", lessons: "Chủ đề 4",
    read: [
      ["Trước khi ăn, em rửa tay bằng xà phòng. Tay sạch thì không sợ bệnh.", "Em rửa tay khi nào?", "trước khi ăn", ["sau khi ngủ", "lúc đi chơi", "khi đọc sách"]],
      ["Gặp người lớn, em khoanh tay chào. Ai cũng khen em ngoan.", "Gặp người lớn, em làm gì?", "chào", ["chạy đi", "quay mặt", "im lặng"]],
      ["Bố mẹ vắng nhà, người lạ gõ cửa. Em không mở cửa.", "Khi có người lạ gõ cửa, em làm gì?", "không mở cửa", ["mở cửa ngay", "đi theo", "nhận quà"]],
      ["Nếu bị lạc, em đứng yên ở chỗ đông người và nhờ cô chú bảo vệ giúp đỡ.", "Bị lạc, em nhờ ai?", "cô chú bảo vệ", ["người lạ gọi đi", "con chó", "bạn nhỏ"]],
    ],
    fill: [["Đèn đỏ thì phải", ".", "dừng lại", ["chạy nhanh", "đi tiếp", "rẽ ngay"]], ["Đèn xanh thì được", ".", "đi", ["dừng", "ngủ", "ngồi"]], ["Sang đường, em phải nắm tay", ".", "người lớn", ["em bé", "bạn nhỏ", "con mèo"]]],
    order: [["Em", "rửa", "tay", "trước", "khi", "ăn"], ["Đèn", "đỏ", "phải", "dừng", "lại"], ["Em", "chào", "người", "lớn"]],
  },
  {
    id: "hk2-5", glyph: "Học", name: "Bài học từ cuộc sống", lessons: "Chủ đề 5",
    read: [
      ["Thỏ chế giễu rùa chậm. Thỏ mải ngủ nên thua rùa.", "Vì sao thỏ thua?", "vì mải ngủ", ["vì bị đau", "vì trời mưa", "vì đói"]],
      ["Kiến rơi xuống nước. Chim thả chiếc lá cho kiến bám vào.", "Chim giúp kiến bằng gì?", "chiếc lá", ["sợi dây", "cành cây", "hòn đá"]],
      ["Cậu bé nói dối nhiều lần. Về sau, không ai tin cậu nữa.", "Vì sao không ai tin cậu bé?", "vì cậu nói dối", ["vì cậu ốm", "vì cậu nhỏ", "vì cậu đi xa"]],
      ["Em cười thì bạn cười. Em tốt với bạn thì bạn tốt với em.", "Em tốt với bạn thì bạn thế nào?", "tốt với em", ["giận em", "bỏ đi", "khóc"]],
    ],
    fill: [["Em luôn nói", "với bố mẹ.", "thật", ["dối", "to", "xấu"]], ["Được giúp đỡ thì phải biết", "ơn.", "nhớ", ["quên", "bỏ", "trả"]], ["Làm sai thì nói lời", ".", "xin lỗi", ["cảm ơn", "tạm biệt", "chúc mừng"]]],
    order: [["Em", "luôn", "nói", "thật"], ["Rùa", "thắng", "thỏ"], ["Chim", "cứu", "kiến"]],
  },
  {
    id: "hk2-6", glyph: "Rừng", name: "Thiên nhiên kì thú", lessons: "Chủ đề 6",
    read: [
      ["Cầu vồng có bảy màu. Cầu vồng hiện ra sau cơn mưa.", "Cầu vồng có mấy màu?", "bảy", ["ba", "năm", "mười"]],
      ["Hải âu bay giỏi trên biển. Nó còn biết báo bão.", "Hải âu sống ở đâu?", "trên biển", ["trong rừng", "trên núi", "trong nhà"]],
      ["Hổ khỏe và nhanh. Ai cũng gọi hổ là chúa rừng.", "Con nào được gọi là chúa rừng?", "hổ", ["thỏ", "nai", "khỉ"]],
      ["Cành liễu mềm và dẻo. Gió to cũng không làm cành gãy.", "Cành liễu như thế nào?", "mềm và dẻo", ["cứng và giòn", "to và nặng", "ngắn và dày"]],
    ],
    fill: [["Sau cơn mưa, trên trời có", ".", "cầu vồng", ["mặt trăng", "tuyết", "bão"]], ["Con hổ sống trong", ".", "rừng", ["ao", "biển", "nhà"]], ["Bay trên trời là con", ".", "chim", ["cá", "hổ", "rùa"]]],
    order: [["Hổ", "là", "chúa", "rừng"], ["Cầu", "vồng", "có", "bảy", "màu"], ["Chim", "bay", "trên", "biển"]],
  },
  {
    id: "hk2-7", glyph: "Nắng", name: "Thế giới trong mắt em", lessons: "Chủ đề 7",
    read: [
      ["Sáng sớm, tia nắng chui qua cửa sổ, đánh thức bé dậy.", "Cái gì đánh thức bé?", "tia nắng", ["tiếng mưa", "con mèo", "cái chuông"]],
      ["Mặt trời mọc, chim hót, một ngày mới bắt đầu.", "Khi mặt trời mọc, chim làm gì?", "hót", ["ngủ", "bơi", "khóc"]],
      ["Hè về, hoa phượng nở đỏ cả sân trường.", "Hoa phượng màu gì?", "đỏ", ["vàng", "trắng", "tím"]],
      ["Cánh cò trắng bay trên đồng lúa xanh.", "Cò bay ở đâu?", "trên đồng lúa", ["trong lớp", "dưới ao", "trong rừng sâu"]],
    ],
    fill: [["Hoa phượng nở vào mùa", ".", "hè", ["đông", "xuân", "tết"]], ["Buổi sáng, mặt trời", "ở đằng đông.", "mọc", ["lặn", "ngủ", "tắt"]], ["Trưa hè, ve kêu", ".", "râm ran", ["im lặng", "ầm ầm", "khe khẽ"]]],
    order: [["Mặt", "trời", "mọc", "buổi", "sáng"], ["Hoa", "phượng", "nở", "đỏ"], ["Cò", "bay", "trên", "đồng"]],
  },
  {
    id: "hk2-8", glyph: "Việt Nam", name: "Đất nước và con người", lessons: "Chủ đề 8",
    read: [
      ["Khi có cháy, các chú lính cứu hỏa lao vào dập lửa.", "Ai dập lửa khi có cháy?", "lính cứu hỏa", ["bác sĩ", "thợ may", "cô giáo"]],
      ["Ở Sa Pa có ruộng bậc thang rất đẹp. Mùa lúa chín, ruộng vàng óng.", "Ruộng bậc thang ở đâu?", "Sa Pa", ["Hà Nội", "Huế", "Cà Mau"]],
      ["Bờ biển Việt Nam dài và đẹp. Hè đến, nhiều người đi tắm biển.", "Hè đến, nhiều người đi đâu?", "tắm biển", ["lên rừng", "đi học", "vào hang"]],
      ["Lớn lên, Lan muốn làm bác sĩ để chữa bệnh cho mọi người.", "Lan muốn làm nghề gì?", "bác sĩ", ["công an", "nông dân", "thợ xây"]],
    ],
    fill: [["Bác nông dân trồng", "trên ruộng.", "lúa", ["cá", "nhà", "sách"]], ["Cô giáo dạy học ở", ".", "trường", ["chợ", "biển", "bệnh viện"]], ["Thủ đô của Việt Nam là", ".", "Hà Nội", ["Huế", "Đà Nẵng", "Cà Mau"]]],
    order: [["Em", "yêu", "Việt", "Nam"], ["Chú", "lính", "cứu", "hỏa", "dập", "lửa"], ["Bác", "nông", "dân", "trồng", "lúa"]],
  },
];

function readQuestion([text, ask, answer, wrong]) {
  return { ask, say: `${text} ${ask}`, show: `<div class="story">${text}</div>`, opts: shuffle([answer, ...wrong]), answer, optClass: "small", key: text };
}

function fillQuestion([before, after, answer, wrong]) {
  const sentence = `${before} <span class="blank-word">?</span> ${after}`.replace(/ ([.])/, "$1");
  return {
    ask: "Chọn từ đúng để điền vào câu:",
    say: `Chọn từ đúng. ${before}, gì đó, ${after}`,
    show: `<div class="story verse">${sentence}</div>`,
    opts: shuffle([answer, ...wrong]),
    answer,
    optClass: "small",
    key: before + after,
  };
}

function orderQuestion(parts) {
  return { ask: "Sắp xếp các từ thành câu đúng:", tiles: shuffle(parts), target: parts, joiner: " ", key: parts.join(" ") };
}

// Tập một: từng bài theo sách, số trang tính theo mục lục (mỗi bài 2 trang, Bài 1 ở trang 14).
const LESSON_TITLES = [
  "a", "b", "c", "e ê", "", "o", "ô", "d đ", "ơ", "",
  "i k", "h l", "u ư", "ch kh", "", "m n", "g gi", "gh nh", "ng ngh", "",
  "r s", "t tr", "th ia", "ua ưa", "", "ph qu", "v x", "y", "", "",
  "an ăn ân", "on ôn ơn", "en ên in un", "am ăm âm", "", "om ôm ơm", "em êm im um", "ai ay ây", "oi ôi ơi", "",
  "ui ưi", "ao eo", "au âu êu", "iu ưu", "", "ac ăc âc", "oc ôc uc ưc", "at ăt ât", "ot ôt ơt", "",
  "et êt it", "ut ưt", "ap ăp âp", "op ôp ơp", "", "ep êp ip up", "anh ênh inh", "ach êch ich", "ang ăng âng", "",
  "ong ông ung ưng", "iêc iên iêp", "iêng iêm yên", "iêt iêu yêu", "", "uôi uôm", "uôc uôt", "uôn uông", "ươi ươu", "",
  "ươc ươt", "ươm ươp", "ươn ương", "oa oe", "", "oan oăn oat oăt", "oai uê uy", "uân uât", "uyên uyêt", "",
];
const LESSON_TONES = { 2: "huyền", 3: "sắc", 6: "hỏi", 7: "nặng", 9: "ngã" };
const TONE_CODES = { sắc: "́", huyền: "̀", hỏi: "̉", ngã: "̃", nặng: "̣" };
const VOWEL_WORDS = {
  a: ["ba", "ca", "cà", "bà", "đa"], e: ["bé", "be", "mẹ", "xe", "kẻ"], ê: ["bê", "dê", "lê", "tê", "kê"],
  o: ["bò", "cỏ", "ho", "no", "lọ"], ô: ["cô", "bố", "hổ", "tô", "cổ"], ơ: ["cờ", "bơ", "nơ", "mơ", "vở"],
  i: ["bi", "li", "mì", "thi", "ti"], u: ["thu", "su", "đu", "tu", "cũ"], ư: ["sư", "tư", "thư", "cử", "dữ"],
  y: ["quý", "ý", "mỹ"], ia: ["thìa", "đĩa", "chia", "mía", "tía"], ua: ["cua", "mua", "chua", "rùa", "đùa"], ưa: ["mưa", "dưa", "dừa", "sữa", "ngựa"],
};
const SOUND_BANK = Object.assign({}, VOWEL_WORDS, ...BOOK_HK1.map((g) => g.sounds));
const SINGLE_VOWELS = "a ă â e ê i o ô ơ u ư y".split(" ");
const INITIALS = ["ngh", "ng", "nh", "ch", "gh", "gi", "kh", "ph", "qu", "th", "tr", "b", "c", "d", "đ", "g", "h", "k", "l", "m", "n", "p", "r", "s", "t", "v", "x"];

// Bỏ dấu thanh nhưng giữ các chữ ă, â, ê, ô, ơ, ư, đ.
const noTone = (word) => word.normalize("NFD").replace(/[̣̀́̃̉]/g, "").normalize("NFC");
const initialOf = (word) => INITIALS.find((s) => noTone(word).startsWith(s)) || "";
const rimeOf = (word) => noTone(word).slice(initialOf(word).length);
const isConsonant = (sound) => INITIALS.includes(sound);

function hasSound(word, sound) {
  if (isConsonant(sound)) return initialOf(word) === sound;
  if (SINGLE_VOWELS.includes(sound)) return noTone(word).includes(sound);
  return rimeOf(word) === sound;
}

// Từ trong bài đọc của sách, nghĩa được viết lại cho bé dễ hiểu.
const LESSON_MEANINGS = {
  11: ["kì đà", "một con vật", ["một loại quả", "một đồ dùng", "một trò chơi"]],
  12: ["le le", "một loài chim nước", ["một loài cá", "một loại cây", "một đồ chơi"]],
  16: ["ca nô", "xe đi trên mặt nước", ["xe đi trên đường", "một con vật", "một loại quả"]],
  18: ["ngõ", "lối đi nhỏ vào nhà", ["cái cửa", "mái nhà", "cái sân"]],
  19: ["nghé", "trâu con", ["bò con", "gà con", "chó con"]],
  21: ["su su", "một loại quả", ["một con vật", "một đồ dùng", "một trò chơi"]],
  22: ["cá trê", "một loài cá", ["một loài chim", "một loại cây", "một đồ dùng"]],
  23: ["thìa", "đồ dùng để xúc thức ăn", ["đồ dùng để viết", "đồ dùng để cắt", "đồ dùng để quét"]],
  31: ["che chắn", "bảo vệ khỏi nguy hiểm", ["chạy thật nhanh", "ăn thật no", "hát thật to"]],
  36: ["xóm", "khu nhà ở nhỏ", ["con đường lớn", "cái ao", "ngọn núi"]],
  37: ["cần cù", "chăm chỉ làm việc", ["lười biếng", "hay ngủ", "chạy nhanh"]],
  42: ["trong veo", "rất trong", ["rất đục", "rất nóng", "rất xa"]],
  53: ["tấp nập", "đông người qua lại", ["vắng vẻ", "im lặng", "tối om"]],
  54: ["lộp độp", "tiếng mưa rơi", ["tiếng chó sủa", "tiếng hát", "tiếng trống"]],
  63: ["yên bình", "êm ả, không ồn ào", ["ồn ào", "nóng bức", "chật chội"]],
  67: ["háo hức", "rất mong chờ và vui", ["rất buồn", "rất sợ", "rất mệt"]],
  74: ["khoe sắc", "tỏa màu đẹp", ["rụng lá", "héo úa", "tắt nắng"]],
};

// Bài 29 luyện quy tắc chính tả c/k, g/gh, ng/ngh.
const SPELLING = [
  ["cá", "c", "k"], ["cò", "c", "k"], ["cổ", "c", "k"], ["kẻ", "k", "c"], ["kê", "k", "c"], ["kì", "k", "c"],
  ["gà", "g", "gh"], ["gỗ", "g", "gh"], ["ghế", "gh", "g"], ["ghi", "gh", "g"], ["ngô", "ng", "ngh"], ["ngõ", "ng", "ngh"], ["nghé", "ngh", "ng"], ["nghe", "ngh", "ng"],
];

// Mở đầu sách: làm quen đồ dùng học tập và nề nếp lớp học.
const OPENING = [
  ["Em dùng gì để viết?", "bút chì", ["cái ô", "quả bóng", "đôi dép"]],
  ["Em dùng gì để kẻ đường thẳng?", "thước kẻ", ["cục tẩy", "cái cặp", "quyển vở"]],
  ["Em dùng gì để xóa chữ viết sai?", "cục tẩy", ["thước kẻ", "bút màu", "cái kéo"]],
  ["Em đựng sách vở trong gì?", "cái cặp", ["cái nồi", "cái xô", "cái rổ"]],
  ["Em viết bài vào đâu?", "quyển vở", ["cái bàn", "bức tường", "cái ghế"]],
  ["Em muốn phát biểu thì làm gì?", "giơ tay", ["nói to", "đứng lên chạy", "gõ bàn"]],
  ["Khi cô giảng bài, em cần làm gì?", "lắng nghe", ["nói chuyện", "ngủ gật", "chạy ra ngoài"]],
  ["Khi gặp cô giáo, em nói gì?", "em chào cô ạ", ["tạm biệt", "chúc ngủ ngon", "xin lỗi"]],
  ["Khi ngồi viết, lưng em thế nào?", "thẳng", ["cong", "nằm", "nghiêng hẳn"]],
  ["Ai dạy em học ở trường?", "cô giáo", ["bác sĩ", "chú lái xe", "bác nông dân"]],
].map(([ask, answer, wrong]) => ({ ask, answer, wrong }));

const LESSON_READING = BOOK_HK1.flatMap((g) => {
  const from = Number(g.lessons.match(/\d+/)[0]);
  return [...g.read.map((item) => ({ from, item })), ...g.order.map((parts) => ({ from, parts }))];
});

const soundsOf = (n) => (LESSON_TITLES[n - 1] || "").split(" ").filter(Boolean);
function soundsUpTo(n) {
  return Array.from({ length: n }, (_, i) => soundsOf(i + 1)).flat();
}

// Bài ôn tập gồm các âm, vần của những bài ngay trước đó.
function focusOf(n) {
  if (n > 80) return soundsUpTo(80).filter((s) => !isConsonant(s) && s.length > 1);
  if (soundsOf(n).length) return soundsOf(n);
  return Array.from({ length: 4 }, (_, i) => soundsOf(n - 1 - i)).flat();
}

// Câu đọc chỉ dùng những chữ cái bé đã học tới bài đó.
function readable(text, n) {
  const known = new Set(soundsUpTo(n).join("").split(""));
  return [...noTone(text.toLowerCase()).replace(/[^\p{L}]/gu, "")].every((c) => known.has(c));
}

function lessonSoundQuestion(n, focus) {
  const label = (s) => (isConsonant(s) ? "âm đầu" : s.length > 1 ? "vần" : "âm");
  const sound = pick(focus);
  const word = pick(SOUND_BANK[sound]);
  const learned = soundsUpTo(n).flatMap((s) => SOUND_BANK[s]).filter((w) => !hasSound(w, sound));
  const everyWord = Object.values(SOUND_BANK).flat().filter((w) => !hasSound(w, sound));
  const pool = [...new Set(learned)].length >= 3 ? learned : everyWord;
  const canName = isConsonant(sound) || sound.length > 1;
  if (canName && Math.random() < 0.4) {
    const sameKind = (s) => isConsonant(s) === isConsonant(sound) && (isConsonant(s) || s.length > 1);
    const names = soundsUpTo(n).filter(sameKind);
    const others = names.length >= 4 ? names : Object.keys(SOUND_BANK).filter(sameKind);
    return { ask: `Tiếng "${word}" có ${label(sound)} gì?`, opts: withDistractors(sound, others), answer: sound, key: `which-${word}` };
  }
  return { ask: `Tiếng nào có ${label(sound)} ${sound}?`, opts: withDistractors(word, pool), answer: word, key: `has-${sound}-${word}` };
}

function letterQuestion(letter) {
  const wantUpper = Math.random() < 0.5;
  const answer = wantUpper ? letter.toUpperCase() : letter;
  const others = ALPHABET.filter((x) => x !== letter).map((x) => (wantUpper ? x.toUpperCase() : x));
  return { ask: `Tìm chữ ${letter} ${wantUpper ? "viết hoa" : "viết thường"}`, say: `Tìm chữ ${LETTER_SOUND[ALPHABET.indexOf(letter)]}`, opts: withDistractors(answer, others), answer, key: `letter-${answer}` };
}

function toneQuestion(tone) {
  const code = TONE_CODES[tone];
  const words = Object.values(SOUND_BANK).flat();
  const withTone = words.filter((w) => w.normalize("NFD").includes(code));
  const without = words.filter((w) => !w.normalize("NFD").includes(code));
  const answer = pick(withTone);
  return { ask: `Tiếng nào có dấu ${tone}?`, opts: withDistractors(answer, without), answer, key: `tone-${answer}` };
}

function spellingQuestion() {
  const [word, right, wrong] = pick(SPELLING);
  return {
    ask: "Chọn chữ đúng để điền vào chỗ trống:",
    say: `Chọn chữ đúng để viết tiếng ${word}`,
    show: `<span class="gapped">__${word.slice(right.length)}</span>`,
    opts: shuffle([right, wrong]), answer: right, cols: 2, key: word,
  };
}

function makeLessonQuestion(n) {
  if (n === 29) return spellingQuestion();
  const focus = focusOf(n);
  const reading = LESSON_READING.filter((r) => r.from <= n && readable(r.parts ? r.parts.join(" ") : r.item[0], n));
  const recent = reading.filter((r) => r === reading[reading.length - 1] || r.from === reading[reading.length - 1].from);
  const modes = ["sound", "sound", "sound", "sound"];
  if (recent.length) modes.push("read", "read");
  if (LESSON_TONES[n]) modes.push("tone", "tone");
  if (LESSON_MEANINGS[n]) modes.push("meaning");
  const letters = focus.filter((s) => s.length === 1 && ALPHABET.includes(s));
  if (letters.length) modes.push("letter", "letter");
  const mode = pick(modes);
  if (mode === "read") {
    const r = pick(recent);
    return r.parts ? orderQuestion(r.parts) : readQuestion(r.item);
  }
  if (mode === "tone") return toneQuestion(LESSON_TONES[n]);
  if (mode === "letter") return letterQuestion(pick(letters));
  if (mode === "meaning") {
    const [word, answer, wrong] = LESSON_MEANINGS[n];
    return { ask: `"${word}" là gì?`, opts: shuffle([answer, ...wrong]), answer, optClass: "small", key: word };
  }
  return lessonSoundQuestion(n, focus);
}

function lessonGroup(n) {
  const last = Math.min(Math.ceil(n / 5) * 5, 83);
  const first = n > 80 ? 81 : last - 4;
  return `Tập một · Bài ${first}–${last}`;
}

function lessonCard(n) {
  const title = n === 29 ? "Chính tả" : LESSON_TITLES[n - 1] || "Ôn tập";
  return {
    id: `bai-${n}`,
    group: lessonGroup(n),
    glyph: title,
    name: `Bài ${n}`,
    skill: `Trang ${14 + (n - 1) * 2}`,
    make: () => makeLessonQuestion(n),
  };
}

function examQuestion() {
  const n = rand(31, 83);
  return makeLessonQuestion(n);
}

// Mỗi lần gọi trả về câu kế tiếp trong bộ 10 câu đã xáo trộn.
function deckOf(theme) {
  let deck = [];
  return () => {
    if (!deck.length) {
      deck = shuffle([
        ...theme.read.map((x) => () => readQuestion(x)),
        ...theme.fill.map((x) => () => fillQuestion(x)),
        ...theme.order.map((x) => () => orderQuestion(x)),
      ]);
    }
    return deck.pop()();
  };
}

const makeOpening = () => {
  const { ask, answer, wrong } = pick(OPENING);
  return { ask, opts: shuffle([answer, ...wrong]), answer, optClass: "small" };
};

GAMES.sach.push(
  { id: "chao-em", group: "Tập một · Mở đầu", glyph: "Chào em", name: "Chào em vào lớp 1", skill: "Trang 6", make: makeOpening },
  ...Array.from({ length: 83 }, (_, i) => lessonCard(i + 1)),
  { id: "cuoi-ki", group: "Tập một · Cuối sách", glyph: "Ôn cả kì", name: "Đánh giá cuối học kì", skill: "Trang 180", make: examQuestion },
  ...BOOK_HK2.map((t) => ({ id: t.id, group: "Tập hai: đọc hiểu theo chủ đề", glyph: t.glyph, name: t.name, skill: t.lessons, make: deckOf(t) })),
);
