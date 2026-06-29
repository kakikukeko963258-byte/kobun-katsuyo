const DATA = window.KOBUN_DATA;
const STORE_KEY = "kobun-katsuyo-progress-v1";
const VIEW_IDS = {
  cards: "cardsView",
  quiz: "quizView",
  exam: "examView",
  tables: "tablesView"
};

const EXAM_CATEGORIES = [
  { id: "all", label: "全範囲" },
  { id: "grammar", label: "文法" },
  { id: "rhetoric", label: "修辞" },
  { id: "poems", label: "和歌" },
  { id: "history", label: "文学史" },
  { id: "practical", label: "実戦" },
  { id: "review", label: "復習" }
];

const TABLE_MODES = [
  { id: "forms", label: "活用" },
  { id: "questions", label: "問題" },
  { id: "mistakes", label: "ミス" },
  { id: "encyclopedia", label: "事典" }
];

const FORM_EXAMPLE_PREFIXES = {
  ru: "笑は",
  raru: "ほめ",
  su: "書か",
  sasu: "越え",
  simu: "行か",
  zu: "降ら",
  ji: "忘れ",
  mu: "帰ら",
  muzu: "帰ら",
  masi: "あら",
  mahosi: "見",
  ki: "住み",
  keri: "なり",
  tu: "書き",
  nu: "散り",
  "tari-kan": "開き",
  ri: "咲け",
  ramu: "思ふ",
  kemu: "悲しかり",
  besi: "読む",
  maji: "去る",
  rasi: "降る",
  meri: "集まる",
  "nari-denbun": "鳴る",
  "nari-dantei": "夢",
  "tari-dantei": "学者",
  gotosi: "雪の",
  yodan: "文を",
  "kami-ichidan": "月を",
  "shimo-ichidan": "鞠を",
  "kami-nidan": "朝に",
  "shimo-nidan": "恩を",
  kakuhen: "京より",
  sahen: "祈りを",
  nahen: "人",
  rahen: "庭に",
  ku: "山",
  shiku: "花",
  nari: "庭",
  tari: "姿"
};

const FORM_TRANSLATION_BASES = {
  ru: "笑われる",
  raru: "ほめられる",
  su: "手紙を書かせる",
  sasu: "山を越えさせる",
  simu: "使者を行かせる",
  zu: "雨が降らない",
  ji: "約束を忘れまい",
  mu: "家に帰ろう",
  muzu: "船が出るだろう",
  masi: "翼があれば飛んだだろう",
  mahosi: "花を見たい",
  ki: "この里に住んだ",
  keri: "秋になったのだなあ",
  tu: "手紙を書き終えた",
  nu: "花が散ってしまった",
  "tari-kan": "門が開いている",
  ri: "花が咲いている",
  ramu: "何を思っているのだろう",
  kemu: "どれほど悲しかったのだろう",
  besi: "古文を読むべきだ",
  maji: "ここを去るまい",
  rasi: "雨が降るらしい",
  meri: "人が集まっているようだ",
  "nari-denbun": "鐘が鳴るようだ",
  "nari-dantei": "夢である",
  "tari-dantei": "学者である",
  gotosi: "白い雪のようだ",
  yodan: "手紙を書く",
  "kami-ichidan": "月を見る",
  "shimo-ichidan": "鞠を蹴る",
  "kami-nidan": "朝に起きる",
  "shimo-nidan": "恩を受ける",
  kakuhen: "京から来る",
  sahen: "祈りをする",
  nahen: "人が死ぬ",
  rahen: "花がある",
  ku: "山が高い",
  shiku: "花が美しい",
  nari: "庭が静かだ",
  tari: "姿が堂々としている"
};

const MEANING_FORM_EXAMPLES = {
  ru: {
    "受身": { prefix: "笑は", base: "笑われる" },
    "可能": { prefix: "渡ら", base: "渡ることができる" },
    "自発": { prefix: "思は", base: "自然と思われる" },
    "尊敬": { prefix: "立た", base: "お立ちになる" }
  },
  raru: {
    "受身": { prefix: "ほめ", base: "ほめられる" },
    "可能": { prefix: "越え", base: "越えることができる" },
    "自発": { prefix: "思ひ出で", base: "自然と思い出される" },
    "尊敬": { prefix: "出で", base: "お出ましになる" }
  },
  su: {
    "使役": { prefix: "書か", base: "書かせる" },
    "尊敬": { prefix: "召さ", base: "お呼びになる" }
  },
  sasu: {
    "使役": { prefix: "越え", base: "越えさせる" },
    "尊敬": { prefix: "上げ", base: "お上げになる" }
  },
  simu: {
    "使役": { prefix: "行か", base: "行かせる" },
    "尊敬": { prefix: "参ら", base: "お遣わしになる" }
  },
  zu: {
    "打消": { prefix: "降ら", base: "雨が降らない" }
  },
  ji: {
    "打消推量": { prefix: "やま", base: "やまないだろう" },
    "打消意志": { prefix: "忘れ", base: "忘れまい" }
  },
  mu: {
    "推量": { prefix: "降ら", base: "降るだろう" },
    "意志": { prefix: "帰ら", base: "帰ろう" },
    "適当": { prefix: "助け", base: "助けるのがよい" },
    "勧誘": { prefix: "見", base: "見よう" },
    "仮定": { prefix: "あら", base: "あるなら" },
    "婉曲": { prefix: "言は", base: "言うような" }
  },
  muzu: {
    "推量": { prefix: "出で", base: "出るだろう" },
    "意志": { prefix: "行か", base: "行こう" }
  },
  masi: {
    "反実仮想": { prefix: "飛び", base: "飛んだだろう" },
    "ためらいの意志": { prefix: "せ", base: "どうしようか迷う" },
    "実現不可能な希望": { prefix: "会は", base: "会いたいものだ" }
  },
  mahosi: {
    "願望": { prefix: "見", base: "見たい" }
  },
  ki: {
    "過去": { prefix: "住み", base: "住んだ" }
  },
  keri: {
    "過去": { prefix: "歩み", base: "歩いた" },
    "詠嘆": { prefix: "なり", base: "なったのだなあ" }
  },
  tu: {
    "完了": { prefix: "書き", base: "書き終えた" },
    "強意": { prefix: "勝ち", base: "きっと勝つ" }
  },
  nu: {
    "完了": { prefix: "散り", base: "散ってしまった" },
    "強意": { prefix: "帰り", base: "きっと帰る" }
  },
  "tari-kan": {
    "完了": { prefix: "開き", base: "開いた" },
    "存続": { prefix: "咲き", base: "咲いている" }
  },
  ri: {
    "完了": { prefix: "来", base: "来た" },
    "存続": { prefix: "咲け", base: "咲いている" }
  },
  ramu: {
    "現在推量": { prefix: "思ふ", base: "思っているだろう" },
    "現在原因推量": { prefix: "散る", base: "散るのだろう" },
    "伝聞": { prefix: "ある", base: "あるという" },
    "婉曲": { prefix: "言ふ", base: "言っているような" }
  },
  kemu: {
    "過去推量": { prefix: "住み", base: "住んでいただろう" },
    "過去原因推量": { prefix: "悲しかり", base: "悲しかったのだろう" },
    "伝聞": { prefix: "住み", base: "住んでいたという" },
    "婉曲": { prefix: "見", base: "見たというような" }
  },
  besi: {
    "推量": { prefix: "晴る", base: "晴れるだろう" },
    "意志": { prefix: "進む", base: "進もう" },
    "可能": { prefix: "渡る", base: "渡ることができる" },
    "当然": { prefix: "読む", base: "読むべきだ" },
    "命令": { prefix: "参る", base: "参れ" },
    "適当": { prefix: "休む", base: "休むのがよい" }
  },
  maji: {
    "打消推量": { prefix: "やむ", base: "やまないだろう" },
    "打消意志": { prefix: "去る", base: "去るまい" },
    "不可能": { prefix: "越ゆ", base: "越えられないだろう" },
    "打消当然": { prefix: "欺く", base: "欺いてはならない" },
    "禁止": { prefix: "入る", base: "入ってはならない" },
    "不適当": { prefix: "出づ", base: "出るのはよくないだろう" }
  },
  rasi: {
    "推定": { prefix: "降る", base: "降るらしい" }
  },
  meri: {
    "推定": { prefix: "集まる", base: "集まっているようだ" },
    "婉曲": { prefix: "語る", base: "語っているような" }
  },
  "nari-denbun": {
    "伝聞": { prefix: "来る", base: "来るという" },
    "推定": { prefix: "鳴る", base: "鳴るようだ" }
  },
  "nari-dantei": {
    "断定": { prefix: "夢", base: "夢である" },
    "存在": { prefix: "寺", base: "寺がある" }
  },
  "tari-dantei": {
    "断定": { prefix: "学者", base: "学者である" }
  },
  gotosi: {
    "比況": { prefix: "雪の", base: "雪のようだ" },
    "例示": { prefix: "梅の", base: "梅のようなものだ" }
  }
};

const FORM_EXAMPLE_TAILS = [
  {
    text: "ば、心に残らむ。",
    translation: (base) => `もし${base}なら、心に残るだろう。`
  },
  {
    text: "て、物語は先へ進む。",
    translation: (base) => `${base}ことで、物語は先へ進む。`
  },
  {
    text: "。",
    translation: (base) => `${base}。`
  },
  {
    text: "時、人は心を動かす。",
    translation: (base) => `${base}時、人は心を動かす。`
  },
  {
    text: "ども、なお思ひは残る。",
    translation: (base) => `${base}けれども、なお思いは残る。`
  },
  {
    text: "。",
    translation: (base) => `${base}ように言う。`
  }
];

const MARKER_NUMBERS = {
  "①": "1",
  "②": "2",
  "③": "3",
  "④": "4",
  "⑤": "5",
  "⑥": "6",
  "⑦": "7",
  "⑧": "8",
  "⑨": "9",
  "⑩": "10",
  "⑪": "11",
  "⑫": "12",
  "⑬": "13",
  "⑭": "14",
  "⑮": "15",
  "⑯": "16",
  "⑰": "17",
  "⑱": "18",
  "⑲": "19",
  "⑳": "20"
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function createDefaultState() {
  return {
    view: "cards",
    cardCategory: "aux",
    quizCategory: "aux",
    tableCategory: "aux",
    tableMode: "forms",
    examCategory: "all",
    correct: 0,
    streak: 0,
    scores: {},
    mistakes: {},
    selectedMeanings: {},
    showFormExamples: false,
    currentCardId: null,
    currentQuiz: null,
    currentExamQuestion: null
  };
}

let state = loadState();
let answerVisible = false;

function loadState() {
  const base = createDefaultState();
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY));
    return {
      ...base,
      ...saved,
      scores: saved?.scores || {},
      mistakes: saved?.mistakes || {},
      selectedMeanings: saved?.selectedMeanings || {}
    };
  } catch {
    return base;
  }
}

function saveState() {
  localStorage.setItem(STORE_KEY, JSON.stringify(state));
}

function entries(categoryId) {
  return DATA[categoryId] || [];
}

function allEntries() {
  return DATA.categories.flatMap((category) => entries(category.id));
}

function entryKey(entry) {
  return `${entry.type}:${entry.id}`;
}

function scoreFor(entry) {
  return state.scores[entryKey(entry)] || 0;
}

function changeScore(entry, delta) {
  const key = entryKey(entry);
  const next = Math.max(0, Math.min(5, scoreFor(entry) + delta));
  state.scores[key] = next;
}

function sample(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function shuffle(list) {
  return [...list].sort(() => Math.random() - 0.5);
}

function optionValue(option) {
  return typeof option === "object" && option !== null ? option.value : option;
}

function optionSource(option) {
  return typeof option === "object" && option !== null ? option.sourceName : "";
}

function auxSourceLabel(entry) {
  const sameNameCount = entries("aux").filter((item) => item.name === entry.name).length;
  if (sameNameCount > 1 && entry.meanings?.length) {
    return `${entry.name}（${entry.meanings.slice(0, 2).join("・")}）`;
  }
  return entry.name;
}

function formVariants(form) {
  if (!form || form === "-") return [];
  return form.split("・").map((item) => item.trim()).filter(Boolean);
}

function formExamplePrefix(entry) {
  return FORM_EXAMPLE_PREFIXES[entry.id] || "";
}

function formTranslationBase(entry) {
  return FORM_TRANSLATION_BASES[entry.id]
    || (entry.translation || entry.sentence || entry.name || "").replace(/。$/, "");
}

function formExampleItemFor(entry, index) {
  const variants = formVariants(entry.forms[index]);
  if (!variants.length) {
    return {
      text: "この形はなし。",
      translation: "この活用形はありません。"
    };
  }

  const prefix = formExamplePrefix(entry);
  const tail = FORM_EXAMPLE_TAILS[index] || FORM_EXAMPLE_TAILS[2];
  const base = formTranslationBase(entry);
  return {
    text: variants.map((variant) => `${prefix}${variant}${tail.text}`).join(" / "),
    translation: tail.translation(base)
  };
}

function selectedMeaningFor(entry) {
  if (entry.type !== "助動詞" || !entry.meanings?.length) return "";
  const saved = state.selectedMeanings[entryKey(entry)];
  return entry.meanings.includes(saved) ? saved : entry.meanings[0];
}

function setSelectedMeaning(entry, meaning) {
  state.selectedMeanings[entryKey(entry)] = meaning;
  saveState();
  renderTables();
}

function meaningFormExampleItemFor(entry, meaning, index) {
  const variants = formVariants(entry.forms[index]);
  if (!variants.length) {
    return {
      text: "この形はなし。",
      translation: "この活用形はありません。"
    };
  }

  const meaningBase = MEANING_FORM_EXAMPLES[entry.id]?.[meaning];
  const originalExample = entry.meaningExamples?.find((item) => item.meaning === meaning);
  const prefix = meaningBase?.prefix || formExamplePrefix(entry);
  const base = meaningBase?.base || originalExample?.translation?.replace(/。$/, "") || formTranslationBase(entry);
  const tail = FORM_EXAMPLE_TAILS[index] || FORM_EXAMPLE_TAILS[2];
  return {
    text: variants.map((variant) => `${prefix}${variant}${tail.text}`).join(" / "),
    translation: tail.translation(base)
  };
}

function formExampleFor(entry, index) {
  return formExampleItemFor(entry, index).text;
}

function formExampleTranslationFor(entry, index) {
  return formExampleItemFor(entry, index).translation;
}

function formExamplesFor(entry) {
  return DATA.forms.map((_, index) => formExampleFor(entry, index));
}

function formExampleTranslationsFor(entry) {
  return DATA.forms.map((_, index) => formExampleTranslationFor(entry, index));
}

function appendExampleText(parent, item) {
  const original = document.createElement("span");
  const translation = document.createElement("span");
  original.className = "example-original";
  translation.className = "example-translation";
  original.textContent = item.text;
  translation.textContent = `訳: ${item.translation}`;
  parent.append(original, translation);
}

function renderMarkedText(container, text) {
  container.replaceChildren();
  const parts = text.split(/([①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳])/);
  parts.forEach((part) => {
    if (!part) return;
    const number = MARKER_NUMBERS[part];
    if (!number) {
      container.append(document.createTextNode(part));
      return;
    }

    const marker = document.createElement("span");
    marker.className = "exam-marker";
    marker.textContent = `問${number}`;
    container.append(marker);
  });
}

function syncFormExampleToggles() {
  ["toggleCardExamples", "toggleTableExamples"].forEach((id) => {
    const button = $(`#${id}`);
    if (!button) return;
    button.textContent = state.showFormExamples ? "例文非表示" : "例文表示";
    button.setAttribute("aria-pressed", String(state.showFormExamples));
    button.classList.toggle("is-active", state.showFormExamples);
  });
}

function toggleFormExamples() {
  state.showFormExamples = !state.showFormExamples;
  saveState();
  syncFormExampleToggles();
  renderCard();
  renderTables();
}

function setDailyLine() {
  const today = new Date();
  const dayIndex = Math.floor(today.getTime() / 86400000);
  const item = allEntries()[dayIndex % allEntries().length];
  $("#dailyLine").textContent = `今日: ${item.name} / ${item.type}`;
}

function renderSegments(containerId, activeId, onSelect) {
  const container = $(`#${containerId}`);
  container.replaceChildren();

  DATA.categories.forEach((category) => {
    const button = document.createElement("button");
    button.className = category.id === activeId ? "segment is-active" : "segment";
    button.type = "button";
    button.dataset.category = category.id;
    button.textContent = category.label;
    button.addEventListener("click", () => onSelect(category.id));
    container.append(button);
  });
}

function renderCustomSegments(containerId, items, activeId, onSelect) {
  const container = $(`#${containerId}`);
  container.replaceChildren();

  items.forEach((item) => {
    const button = document.createElement("button");
    button.className = item.id === activeId ? "segment is-active" : "segment";
    button.type = "button";
    button.dataset.mode = item.id;
    button.textContent = item.label;
    button.addEventListener("click", () => onSelect(item.id));
    container.append(button);
  });
}

function renderExamSegments(activeId, onSelect) {
  const container = $("#examCategory");
  container.replaceChildren();

  EXAM_CATEGORIES.forEach((category) => {
    const button = document.createElement("button");
    button.className = category.id === activeId ? "segment is-active" : "segment";
    button.type = "button";
    button.dataset.category = category.id;
    button.textContent = category.label;
    button.addEventListener("click", () => onSelect(category.id));
    container.append(button);
  });
}

function syncSegmentActive(containerId, activeId) {
  $$(`#${containerId} .segment`).forEach((button) => {
    const value = button.dataset.category || button.dataset.mode;
    button.classList.toggle("is-active", value === activeId);
  });
}

function examQuestions() {
  return window.KOBUN_EXAM_QUESTIONS || [];
}

function examPool() {
  const questions = examQuestions();
  if (state.examCategory === "review") return reviewQuestions();
  if (state.examCategory === "all") return questions;
  return questions.filter((question) => question.category === state.examCategory);
}

function mistakeItems() {
  return Object.values(state.mistakes || {})
    .sort((a, b) => (b.lastMissedAt || 0) - (a.lastMissedAt || 0));
}

function recordMistake(record) {
  const existing = state.mistakes[record.key];
  state.mistakes[record.key] = {
    ...existing,
    ...record,
    misses: (existing?.misses || 0) + 1,
    lastMissedAt: Date.now()
  };
}

function clearMistake(key) {
  if (state.mistakes[key]) delete state.mistakes[key];
}

function reviewQuestions() {
  return mistakeItems().map((item) => ({
    id: `review:${item.key}`,
    category: "review",
    sourceKey: item.key,
    passage: item.passage || "",
    question: item.question,
    choices: (item.choices || []).map(optionValue),
    answer: item.answer,
    explanation: `${item.explanation || `正解は「${item.answer}」。`}（ミス${item.misses}回）`
  }));
}

function quizMistakeKey(quiz) {
  return `quiz:${quiz.category}:${quiz.entryId}:${quiz.question}`;
}

function quizExplanation(entry, quiz) {
  const rows = [`正解: ${quiz.correct}`];
  if (!entry) return rows.join(" / ");

  const targetIndex = quizTargetFormIndex(quiz);
  const targetExample = targetIndex >= 0
    ? formExampleItemFor(entry, targetIndex)
    : { text: entry.sentence, translation: entry.translation };
  if (targetExample.text) rows.push(`例文: ${targetExample.text}`);
  if (targetExample.translation) rows.push(`現代語訳: ${targetExample.translation}`);
  if (entry.connection) rows.push(`接続: ${entry.connection}`);
  if (entry.meanings) rows.push(`意味: ${entry.meanings.join("・")}`);
  if (entry.example) rows.push(`例語: ${entry.example}`);
  if (entry.endings) rows.push(`語尾: ${entry.endings}`);
  if (entry.base) rows.push(`語幹: ${entry.base}`);
  if (entry.forms) rows.push(`活用: ${entry.forms.join(" / ")}`);
  if (entry.note) rows.push(`注意: ${entry.note}`);
  return rows.join(" / ");
}

function quizTargetFormIndex(quiz) {
  return DATA.forms.findIndex((form) => quiz.question.includes(`${form}形`));
}

function appendQuizDetail(parent, label, value, className = "") {
  if (!value) return;
  const item = document.createElement("div");
  const key = document.createElement("span");
  const text = document.createElement("strong");
  item.className = `quiz-detail ${className}`.trim();
  key.textContent = label;
  text.textContent = value;
  item.append(key, text);
  parent.append(item);
}

function renderQuizExplanation(entry, quiz) {
  const container = $("#quizExplanation");
  container.replaceChildren();

  if (!entry) {
    appendQuizDetail(container, "正解", quiz.correct, "is-answer");
    return;
  }

  const targetIndex = quizTargetFormIndex(quiz);
  const targetExample = targetIndex >= 0
    ? formExampleItemFor(entry, targetIndex)
    : { text: entry.sentence, translation: entry.translation };
  const summary = document.createElement("div");
  summary.className = "quiz-detail-grid";
  appendQuizDetail(summary, "正解", quiz.correct, "is-answer");
  appendQuizDetail(summary, "例文", targetExample.text, "is-wide");
  appendQuizDetail(summary, "現代語訳", targetExample.translation, "is-wide");
  appendQuizDetail(summary, "接続", entry.connection);
  appendQuizDetail(summary, "意味", entry.meanings?.join("・"));
  appendQuizDetail(summary, "例語", entry.example);
  appendQuizDetail(summary, "語尾", entry.endings);
  appendQuizDetail(summary, "語幹", entry.base);
  container.append(summary);

  if (entry.forms?.length) {
    const formBlock = document.createElement("div");
    const formTitle = document.createElement("div");
    const table = document.createElement("div");

    formBlock.className = "quiz-form-block";
    formTitle.className = "quiz-form-title";
    formTitle.textContent = targetIndex >= 0
      ? `活用表（${DATA.forms[targetIndex]}形を確認）`
      : "活用表";

    table.className = "quiz-form-table";
    table.setAttribute("role", "table");
    DATA.forms.forEach((form, index) => {
      const column = document.createElement("span");
      const head = document.createElement("span");
      const cell = document.createElement("span");
      column.className = index === targetIndex ? "quiz-form-column is-target" : "quiz-form-column";
      head.className = "quiz-form-head";
      cell.className = "quiz-form-cell";
      head.textContent = form;
      cell.textContent = entry.forms[index];
      column.append(head, cell);
      table.append(column);
    });

    formBlock.append(formTitle, table);
    container.append(formBlock);
  }

  if (entry.note) {
    const note = document.createElement("p");
    note.className = "quiz-note";
    note.textContent = entry.note;
    container.append(note);
  }
}

function quizMistakeRecord(quiz) {
  const category = DATA.categories.find((item) => item.id === quiz.category);
  const entry = entries(quiz.category).find((item) => item.id === quiz.entryId);

  return {
    key: quizMistakeKey(quiz),
    source: "小テスト",
    categoryLabel: category?.label || "小テスト",
    question: quiz.question,
    choices: quiz.options.map(optionValue),
    answer: quiz.correct,
    explanation: quizExplanation(entry, quiz)
  };
}

function examMistakeKey(question) {
  return question.sourceKey || `exam:${question.id}`;
}

function examMistakeRecord(question) {
  const category = EXAM_CATEGORIES.find((item) => item.id === question.category);
  return {
    key: examMistakeKey(question),
    source: "期末",
    categoryLabel: category?.label || "期末",
    passage: question.passage || "",
    question: question.question,
    choices: question.choices,
    answer: question.answer,
    explanation: (question.explanation || "").replace(/（ミス\d+回）$/, "")
  };
}

function updateFloatingNext() {
  const button = $("#floatingNext");
  const label = $("span", button);
  const hidden = state.view === "tables";
  button.classList.toggle("is-hidden", hidden);

  if (state.view === "cards") {
    label.textContent = "次カード";
  } else if (state.view === "quiz") {
    label.textContent = "次問題";
  } else if (state.view === "exam") {
    label.textContent = "次問題";
  }
}

function advanceCurrentView() {
  if (state.view === "cards") {
    pickCard();
  } else if (state.view === "quiz") {
    makeQuiz();
  } else if (state.view === "exam") {
    makeExamQuestion();
  }
}

function switchView(view) {
  state.view = view;
  $$(".tab").forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.view === view);
  });
  Object.entries(VIEW_IDS).forEach(([key, id]) => {
    $(`#${id}`).classList.toggle("is-active", key === view);
  });
  saveState();
  updateFloatingNext();
}

function renderStats() {
  const items = allEntries();
  const total = items.length * 5;
  const score = items.reduce((sum, entry) => sum + scoreFor(entry), 0);
  const mastered = total ? Math.round((score / total) * 100) : 0;

  $("#correctStat").textContent = state.correct;
  $("#streakStat").textContent = state.streak;
  $("#masteredStat").textContent = `${mastered}%`;
  $("#mistakeStat").textContent = mistakeItems().length;
}

function pickCard() {
  const pool = entries(state.cardCategory);
  const current = pool.find((entry) => entry.id === state.currentCardId);
  const weakest = pool.filter((entry) => scoreFor(entry) <= 2 && entry.id !== current?.id);
  const candidates = weakest.length ? weakest : pool.filter((entry) => entry.id !== current?.id);
  const entry = sample(candidates.length ? candidates : pool);
  state.currentCardId = entry.id;
  answerVisible = false;
  saveState();
  renderCard();
}

function currentCard() {
  const pool = entries(state.cardCategory);
  return pool.find((entry) => entry.id === state.currentCardId) || pool[0];
}

function cardFacts(entry) {
  if (state.cardCategory === "aux") {
    return [
      ["接続", entry.connection],
      ["意味", entry.meanings.join("・")],
      ["例文", entry.sentence],
      ["現代語訳", entry.translation],
      ["注意", entry.note]
    ];
  }

  if (state.cardCategory === "verbs") {
    return [
      ["例語", entry.example],
      ["語尾", entry.endings],
      ["例文", entry.sentence],
      ["現代語訳", entry.translation],
      ["注意", entry.note]
    ];
  }

  return [
    ["例語", entry.example],
    ["語幹", entry.base],
    ["例文", entry.sentence],
    ["現代語訳", entry.translation],
    ["注意", entry.note]
  ];
}

function renderCardAnswer(entry) {
  const answer = $("#answerText");
  answer.replaceChildren();
  if (!answerVisible) return;

  const facts = document.createElement("span");
  facts.className = "answer-facts";
  cardFacts(entry).forEach(([label, value]) => {
    if (!value) return;
    const key = document.createElement("span");
    const text = document.createElement("span");
    key.className = "answer-fact-key";
    text.className = "answer-fact-value";
    key.textContent = label;
    text.textContent = value;
    facts.append(key, text);
  });

  const title = document.createElement("span");
  title.className = "answer-section-title";
  title.textContent = "活用";

  const table = document.createElement("span");
  table.className = "answer-table";
  table.setAttribute("role", "table");
  DATA.forms.forEach((form, index) => {
    const column = document.createElement("span");
    const head = document.createElement("span");
    const value = document.createElement("span");
    column.className = "form-column";
    head.className = "answer-th";
    value.className = "answer-td";
    head.textContent = form;
    value.textContent = entry.forms[index];
    column.append(head, value);

    if (state.showFormExamples) {
      const example = document.createElement("span");
      example.className = "answer-example";
      appendExampleText(example, formExampleItemFor(entry, index));
      column.append(example);
    }

    table.append(column);
  });

  answer.append(facts, title, table);
}

function renderCard() {
  const entry = currentCard();
  $("#cardKind").textContent = entry.type;
  $("#cardTitle").textContent = entry.name;
  $("#cardLevel").textContent = entry.level;
  $("#cardPrompt").textContent = state.cardCategory === "aux"
    ? "接続・意味・活用"
    : "例語・語尾・活用";
  $("#answerCue").textContent = answerVisible ? "答え" : "タップで表示";
  renderCardAnswer(entry);
  $("#showAnswer").classList.toggle("is-revealed", answerVisible);
}

function markCard(delta) {
  const entry = currentCard();
  changeScore(entry, delta);
  if (delta > 0) {
    state.correct += 1;
    state.streak += 1;
  } else {
    state.streak = 0;
  }
  saveState();
  renderStats();
  pickCard();
}

function makeQuiz() {
  const category = state.quizCategory;
  const pool = entries(category);
  const entry = sample(pool);
  let question;
  let correct;
  let options;

  if (category === "aux") {
    const kind = sample(["meaning", "meaning-single", "connection", "form"]);
    if (kind === "meaning") {
      question = `「${entry.name}」の意味`;
      correct = entry.meanings.join("・");
      options = pool.map((item) => ({
        value: item.meanings.join("・"),
        sourceName: auxSourceLabel(item)
      }));
    } else if (kind === "meaning-single") {
      correct = sample(entry.meanings);
      question = `「${entry.name}」の意味として当てはまるもの`;
      options = [...new Set(pool.flatMap((item) => item.meanings))]
        .filter((meaning) => !entry.meanings.includes(meaning));
    } else if (kind === "connection") {
      question = sample([
        `「${entry.name}」の接続`,
        `「${entry.name}」は何形に接続するか`
      ]);
      correct = entry.connection;
      options = pool.map((item) => ({
        value: item.connection,
        sourceName: auxSourceLabel(item)
      }));
    } else {
      const index = Math.floor(Math.random() * DATA.forms.length);
      question = `「${entry.name}」の${DATA.forms[index]}形`;
      correct = entry.forms[index];
      options = pool.map((item) => ({
        value: item.forms[index],
        sourceName: auxSourceLabel(item)
      }));
    }
  } else {
    const index = Math.floor(Math.random() * DATA.forms.length);
    question = `「${entry.name}」の${DATA.forms[index]}形`;
    correct = entry.forms[index];
    options = pool.map((item) => item.forms[index]);
  }

  options = buildOptions(correct, options);
  state.currentQuiz = { category, entryId: entry.id, question, correct, options };
  saveState();
  renderQuiz();
}

function buildOptions(correct, sourceOptions) {
  const fallback = [
    "未然形", "連用形", "終止形", "連体形", "已然形", "命令形",
    "推量", "過去", "完了", "断定", "未然形に接続", "連用形に接続"
  ];
  const picked = [correct];
  const seen = new Set([correct]);
  const candidates = [
    ...shuffle(sourceOptions),
    ...shuffle(fallback)
  ];

  for (const option of candidates) {
    if (picked.length >= 4) break;
    const value = optionValue(option);
    if (!value || seen.has(value)) continue;
    seen.add(value);
    picked.push(optionSource(option) ? option : value);
  }
  return shuffle(picked);
}

function hasAuxOptionSources(quiz) {
  return quiz.category !== "aux"
    || quiz.question.includes("当てはまるもの")
    || quiz.options?.some((option) => optionSource(option));
}

function choiceSourceText(option, quiz) {
  if (quiz.category !== "aux") return "";
  if (optionValue(option) === quiz.correct) return "";
  const source = optionSource(option);
  return source ? `助動詞: ${source}` : "";
}

function renderQuiz() {
  if (
    !state.currentQuiz ||
    state.currentQuiz.category !== state.quizCategory ||
    !hasAuxOptionSources(state.currentQuiz)
  ) {
    makeQuiz();
    return;
  }

  const quiz = state.currentQuiz;
  const category = DATA.categories.find((item) => item.id === state.quizCategory);
  $("#quizKind").textContent = category.label;
  $("#quizQuestion").textContent = quiz.question;
  $("#feedback").textContent = "";
  $("#feedback").className = "feedback";
  $("#quizExplanation").replaceChildren();
  $("#unknownQuiz").disabled = false;

  const choices = $("#choices");
  choices.classList.remove("is-answered");
  choices.replaceChildren();
  quiz.options.forEach((option) => {
    const value = optionValue(option);
    const button = document.createElement("button");
    const label = document.createElement("span");
    const source = choiceSourceText(option, quiz);

    button.className = "choice";
    button.type = "button";
    button.dataset.value = value;
    label.className = "choice-main";
    label.textContent = value;
    button.append(label);

    if (source) {
      const sourceBadge = document.createElement("span");
      sourceBadge.className = "choice-source";
      sourceBadge.textContent = source;
      button.append(sourceBadge);
    }

    button.addEventListener("click", () => answerQuiz(button, value));
    choices.append(button);
  });
}

function answerQuiz(button, option) {
  finishQuiz(option, button, false);
}

function giveUpQuiz() {
  finishQuiz(null, null, true);
}

function finishQuiz(option, button, isUnknown) {
  if ($("#unknownQuiz").disabled) return;
  const quiz = state.currentQuiz;
  const entry = entries(quiz.category).find((item) => item.id === quiz.entryId);
  const isCorrect = !isUnknown && option === quiz.correct;

  $("#choices").classList.add("is-answered");
  $$(".choice", $("#choices")).forEach((choice) => {
    choice.disabled = true;
    choice.classList.toggle("is-correct", choice.dataset.value === quiz.correct);
  });
  $("#unknownQuiz").disabled = true;
  if (button) button.classList.toggle("is-wrong", !isCorrect);

  if (isCorrect) {
    state.correct += 1;
    state.streak += 1;
    changeScore(entry, 1);
    clearMistake(quizMistakeKey(quiz));
    $("#feedback").textContent = "正解";
    $("#feedback").classList.add("is-correct");
  } else {
    state.streak = 0;
    changeScore(entry, -1);
    recordMistake(quizMistakeRecord(quiz));
    $("#feedback").textContent = `正解: ${quiz.correct}`;
    $("#feedback").classList.add("is-wrong");
  }

  renderQuizExplanation(entry, quiz);
  saveState();
  renderStats();
}

function makeExamQuestion() {
  const pool = examPool();
  if (!pool.length) {
    state.currentExamQuestion = null;
    saveState();
    renderEmptyExam();
    return;
  }
  const currentId = state.currentExamQuestion?.id;
  const candidates = pool.filter((question) => question.id !== currentId);
  const question = sample(candidates.length ? candidates : pool);
  state.currentExamQuestion = {
    category: state.examCategory,
    id: question.id,
    options: shuffle(question.choices)
  };
  saveState();
  renderExamQuiz();
}

function currentExamQuestion() {
  const pool = examPool();
  const current = pool.find((question) => question.id === state.currentExamQuestion?.id);
  return current || pool[0];
}

function renderEmptyExam() {
  const category = EXAM_CATEGORIES.find((item) => item.id === state.examCategory);
  $("#examKind").textContent = category ? category.label : "期末対策";
  $("#examPassage").replaceChildren();
  $("#examPassage").classList.add("is-hidden");
  $("#examQuestion").textContent = state.examCategory === "review"
    ? "復習する問題はまだありません"
    : "問題がありません";
  $("#examChoices").replaceChildren();
  $("#unknownExam").disabled = true;
  $("#examFeedback").textContent = "";
  $("#examFeedback").className = "feedback";
  $("#examExplanation").textContent = state.examCategory === "review"
    ? "間違えた問題や「わからない」を押した問題がここに記録されます。"
    : "";
}

function renderExamQuiz() {
  const pool = examPool();
  if (!pool.length) {
    renderEmptyExam();
    return;
  }

  if (!state.currentExamQuestion || state.currentExamQuestion.category !== state.examCategory) {
    makeExamQuestion();
    return;
  }

  const question = currentExamQuestion();
  if (!question) return;
  const category = EXAM_CATEGORIES.find((item) => item.id === question.category);
  const options = state.currentExamQuestion.options?.length
    ? state.currentExamQuestion.options
    : shuffle(question.choices);

  $("#examKind").textContent = category ? category.label : "期末対策";
  renderMarkedText($("#examPassage"), question.passage || "");
  $("#examPassage").classList.toggle("is-hidden", !question.passage);
  $("#examQuestion").textContent = question.question;
  $("#examFeedback").textContent = "";
  $("#examFeedback").className = "feedback";
  $("#examExplanation").textContent = "";
  $("#unknownExam").disabled = false;

  const choices = $("#examChoices");
  choices.replaceChildren();
  options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "choice";
    button.type = "button";
    button.textContent = option;
    button.addEventListener("click", () => answerExamQuestion(button, option));
    choices.append(button);
  });
}

function answerExamQuestion(button, option) {
  finishExamQuestion(option, button, false);
}

function giveUpExamQuestion() {
  finishExamQuestion(null, null, true);
}

function finishExamQuestion(option, button, isUnknown) {
  if ($("#unknownExam").disabled) return;
  const question = currentExamQuestion();
  const isCorrect = !isUnknown && option === question.answer;

  $$(".choice", $("#examChoices")).forEach((choice) => {
    choice.disabled = true;
    choice.classList.toggle("is-correct", choice.textContent === question.answer);
  });
  $("#unknownExam").disabled = true;
  if (button) button.classList.toggle("is-wrong", !isCorrect);

  if (isCorrect) {
    state.correct += 1;
    state.streak += 1;
    clearMistake(examMistakeKey(question));
    $("#examFeedback").textContent = "正解";
    $("#examFeedback").classList.add("is-correct");
  } else {
    state.streak = 0;
    recordMistake(examMistakeRecord(question));
    $("#examFeedback").textContent = `正解: ${question.answer}`;
    $("#examFeedback").classList.add("is-wrong");
  }

  $("#examExplanation").textContent = question.explanation;
  saveState();
  renderStats();
}

function tableQuery() {
  return $("#tableSearch").value.trim().toLowerCase();
}

function includesQuery(parts, query) {
  if (!query) return true;
  return parts.filter(Boolean).join(" ").toLowerCase().includes(query);
}

function quizQuestionTemplates() {
  const templates = [];
  DATA.categories.forEach((category) => {
    entries(category.id).forEach((entry) => {
      if (category.id === "aux") {
        templates.push({
          id: `quiz:${entry.id}:meaning`,
          source: "小テスト",
          categoryLabel: category.label,
          question: `「${entry.name}」の意味`,
          answer: entry.meanings.join("・"),
          explanation: entry.note
        });
        templates.push({
          id: `quiz:${entry.id}:connection`,
          source: "小テスト",
          categoryLabel: category.label,
          question: `「${entry.name}」の接続`,
          answer: entry.connection,
          explanation: entry.note
        });
        entry.meanings.forEach((meaning) => {
          templates.push({
            id: `quiz:${entry.id}:meaning:${meaning}`,
            source: "小テスト",
            categoryLabel: category.label,
            question: `「${entry.name}」の意味として「${meaning}」を識別する`,
            answer: meaning,
            explanation: entry.meaningExamples?.find((item) => item.meaning === meaning)?.sentence || entry.sentence
          });
        });
      }

      if (entry.forms?.length) {
        DATA.forms.forEach((form, index) => {
          templates.push({
            id: `quiz:${entry.id}:form:${form}`,
            source: "小テスト",
            categoryLabel: category.label,
            question: `「${entry.name}」の${form}形`,
            answer: entry.forms[index],
            explanation: formExampleFor(entry, index)
          });
        });
      }
    });
  });
  return templates;
}

function questionBankItems() {
  const examItems = examQuestions().map((question) => {
    const category = EXAM_CATEGORIES.find((item) => item.id === question.category);
    return {
      id: question.id,
      source: "期末",
      categoryLabel: category?.label || "期末",
      passage: question.passage || "",
      question: question.question,
      choices: question.choices || [],
      answer: question.answer,
      explanation: question.explanation || ""
    };
  });
  return [...quizQuestionTemplates(), ...examItems];
}

function renderQuestionList() {
  const query = tableQuery();
  const list = $("#questionList");
  list.replaceChildren();

  const filtered = questionBankItems().filter((item) => includesQuery([
    item.source,
    item.categoryLabel,
    item.passage,
    item.question,
    item.answer,
    item.explanation,
    ...(item.choices || [])
  ], query));

  filtered.forEach((item) => list.append(renderQuestionBankItem(item)));

  if (!filtered.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "該当する問題なし";
    list.append(empty);
  }
}

function renderQuestionBankItem(item) {
  const article = document.createElement("article");
  const head = document.createElement("div");
  const titleWrap = document.createElement("div");
  const source = document.createElement("p");
  const title = document.createElement("h3");
  const tag = document.createElement("span");
  article.className = "entry question-entry";
  head.className = "entry-summary";
  source.className = "eyebrow entry-type";
  tag.className = "tag entry-level";
  source.textContent = `${item.source} / ${item.categoryLabel}`;
  title.textContent = item.question;
  tag.textContent = item.id.includes("-v") ? "別問" : "基本";
  titleWrap.append(source, title);
  head.append(titleWrap, tag);
  article.append(head);

  if (item.passage) {
    const passage = document.createElement("p");
    passage.className = "exam-passage question-passage";
    renderMarkedText(passage, item.passage);
    article.append(passage);
  }

  if (item.choices?.length) {
    const choices = document.createElement("div");
    choices.className = "choice-list";
    item.choices.forEach((choice) => {
      const chip = document.createElement("span");
      chip.className = choice === item.answer ? "choice-chip is-answer" : "choice-chip";
      chip.textContent = choice;
      choices.append(chip);
    });
    article.append(choices);
  }

  const facts = document.createElement("dl");
  facts.className = "facts";
  [
    ["答え", item.answer],
    ["解説", item.explanation]
  ].forEach(([label, value]) => {
    if (!value) return;
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = label;
    dd.textContent = value;
    facts.append(dt, dd);
  });
  article.append(facts);
  return article;
}

function renderMistakeList() {
  const query = tableQuery();
  const list = $("#mistakeList");
  list.replaceChildren();

  const filtered = mistakeItems().filter((item) => includesQuery([
    item.source,
    item.categoryLabel,
    item.passage,
    item.question,
    item.answer,
    item.explanation,
    ...(item.choices || [])
  ], query));

  filtered.forEach((item) => list.append(renderMistakeItem(item)));

  if (!filtered.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = mistakeItems().length ? "検索に合うミスなし" : "まだミスは記録されていません";
    list.append(empty);
  }
}

function renderMistakeItem(item) {
  const article = renderQuestionBankItem({
    ...item,
    id: item.key,
    source: item.source || "ミス",
    categoryLabel: `${item.categoryLabel || ""} / ${item.misses || 1}回`
  });
  const actions = document.createElement("div");
  const button = document.createElement("button");
  actions.className = "entry-actions";
  button.className = "primary-button";
  button.type = "button";
  button.textContent = "復習で解く";
  button.addEventListener("click", () => {
    state.examCategory = "review";
    state.currentExamQuestion = null;
    syncSegmentActive("examCategory", "review");
    makeExamQuestion();
    switchView("exam");
  });
  actions.append(button);
  article.append(actions);
  return article;
}

function renderEncyclopediaList() {
  const query = tableQuery();
  const list = $("#encyclopediaList");
  list.replaceChildren();

  const items = window.KOBUN_ENCYCLOPEDIA || [];
  const filtered = items.filter((item) => includesQuery([
    item.name,
    item.kind,
    item.summary,
    ...(item.details || []),
    ...(item.related || [])
  ], query));

  filtered.forEach((item) => list.append(renderEncyclopediaItem(item)));

  if (!filtered.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "該当する人物・作品・用語なし";
    list.append(empty);
  }
}

function renderEncyclopediaItem(item) {
  const article = document.createElement("article");
  const head = document.createElement("div");
  const titleWrap = document.createElement("div");
  const type = document.createElement("p");
  const title = document.createElement("h3");
  const tag = document.createElement("span");
  const summary = document.createElement("p");
  article.className = "entry encyclopedia-entry";
  head.className = "entry-summary";
  type.className = "eyebrow entry-type";
  tag.className = "tag entry-level";
  summary.className = "encyclopedia-summary";
  type.textContent = "事典";
  title.textContent = item.name;
  tag.textContent = item.kind;
  summary.textContent = item.summary;
  titleWrap.append(type, title);
  head.append(titleWrap, tag);
  article.append(head, summary);

  if (item.details?.length) {
    const list = document.createElement("ul");
    list.className = "encyclopedia-details";
    item.details.forEach((detail) => {
      const row = document.createElement("li");
      row.textContent = detail;
      list.append(row);
    });
    article.append(list);
  }

  if (item.related?.length) {
    const related = document.createElement("div");
    related.className = "choice-list";
    item.related.forEach((word) => {
      const chip = document.createElement("span");
      chip.className = "choice-chip";
      chip.textContent = word;
      related.append(chip);
    });
    article.append(related);
  }

  return article;
}

function renderTables() {
  const query = tableQuery();
  const list = $("#tableList");
  const isForms = state.tableMode === "forms";
  const placeholders = {
    forms: "活用・例文を検索",
    questions: "問題を検索",
    mistakes: "ミスを検索",
    encyclopedia: "人物・作品・用語を検索"
  };

  $("#tableCategory").classList.toggle("is-hidden", !isForms);
  $("#toggleTableExamples").classList.toggle("is-hidden", !isForms);
  $("#tableList").classList.toggle("is-hidden", !isForms);
  $("#questionList").classList.toggle("is-hidden", state.tableMode !== "questions");
  $("#mistakeList").classList.toggle("is-hidden", state.tableMode !== "mistakes");
  $("#encyclopediaList").classList.toggle("is-hidden", state.tableMode !== "encyclopedia");
  $("#tableSearch").placeholder = placeholders[state.tableMode] || "検索";

  if (state.tableMode === "questions") {
    renderQuestionList();
    return;
  }

  if (state.tableMode === "mistakes") {
    renderMistakeList();
    return;
  }

  if (state.tableMode === "encyclopedia") {
    renderEncyclopediaList();
    return;
  }

  list.replaceChildren();

  const filtered = entries(state.tableCategory).filter((entry) => {
    const text = [
      entry.name,
      entry.type,
      entry.level,
      entry.connection,
      entry.example,
      entry.endings,
      entry.base,
      entry.sentence,
      entry.translation,
      entry.note,
      ...(entry.meanings || []),
      ...entry.forms,
      ...formExamplesFor(entry),
      ...formExampleTranslationsFor(entry),
      ...(entry.meaningExamples || []).flatMap((item) => [item.meaning, item.sentence, item.translation])
    ];
    return includesQuery(text, query);
  });

  filtered.forEach((entry) => list.append(renderEntry(entry)));

  if (!filtered.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "該当なし";
    list.append(empty);
  }
}

function renderEntry(entry) {
  const template = $("#entryTemplate");
  const node = template.content.firstElementChild.cloneNode(true);
  $(".entry-type", node).textContent = entry.type;
  $("h3", node).textContent = entry.name;
  $(".entry-level", node).textContent = entry.level;

  const facts = $(".facts", node);
  const factRows = factsFor(entry);
  factRows.forEach(([label, value]) => {
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = label;
    if (label === "意味" && entry.type === "助動詞" && entry.meanings?.length > 1) {
      dd.append(renderMeaningButtons(entry));
    } else {
      dd.textContent = value;
    }
    facts.append(dt, dd);
  });

  $(".conjugation-wrap", node).append(renderConjugationTable(entry));
  return node;
}

function renderMeaningButtons(entry) {
  const group = document.createElement("span");
  const selected = selectedMeaningFor(entry);
  group.className = "meaning-buttons";

  entry.meanings.forEach((meaning) => {
    const button = document.createElement("button");
    button.className = meaning === selected ? "meaning-button is-active" : "meaning-button";
    button.type = "button";
    button.textContent = meaning;
    button.setAttribute("aria-pressed", String(meaning === selected));
    button.addEventListener("click", () => setSelectedMeaning(entry, meaning));
    group.append(button);
  });

  return group;
}

function factsFor(entry) {
  if (entry.type === "助動詞") {
    return [
      ["接続", entry.connection],
      ["意味", entry.meanings.join("・")],
      ["例文", entry.sentence],
      ["現代語訳", entry.translation],
      ["注意", entry.note]
    ];
  }

  if (entry.type === "動詞") {
    return [
      ["例語", entry.example],
      ["語尾", entry.endings],
      ["例文", entry.sentence],
      ["現代語訳", entry.translation],
      ["注意", entry.note]
    ];
  }

  return [
    ["例語", entry.example],
    ["語幹", entry.base],
    ["例文", entry.sentence],
    ["現代語訳", entry.translation],
    ["注意", entry.note]
  ];
}

function renderConjugationTable(entry) {
  const grid = document.createElement("div");
  const selectedMeaning = selectedMeaningFor(entry);
  const showMeaningExamples = entry.type === "助動詞" && entry.meanings?.length > 1 && selectedMeaning;
  const showExamples = state.showFormExamples || showMeaningExamples;
  grid.className = "conjugation-grid";
  grid.setAttribute("role", "table");

  DATA.forms.forEach((form, index) => {
    const column = document.createElement("div");
    const head = document.createElement("span");
    const value = document.createElement("span");
    column.className = "conjugation-column";
    head.className = "conjugation-head";
    value.className = "conjugation-value";
    head.textContent = form;
    value.textContent = entry.forms[index];
    column.append(head, value);

    if (showExamples) {
      const example = document.createElement("span");
      example.className = "conjugation-example";
      appendExampleText(
        example,
        showMeaningExamples
          ? meaningFormExampleItemFor(entry, selectedMeaning, index)
          : formExampleItemFor(entry, index)
      );
      column.append(example);
    }

    grid.append(column);
  });

  return grid;
}

function wireEvents() {
  $$(".tab").forEach((tab) => {
    tab.addEventListener("click", () => switchView(tab.dataset.view));
  });

  $("#showAnswer").addEventListener("click", () => {
    answerVisible = !answerVisible;
    renderCard();
  });
  $("#shuffleCard").addEventListener("click", pickCard);
  $("#knownCard").addEventListener("click", () => markCard(1));
  $("#againCard").addEventListener("click", () => markCard(-1));
  $("#nextQuiz").addEventListener("click", makeQuiz);
  $("#unknownQuiz").addEventListener("click", giveUpQuiz);
  $("#nextExam").addEventListener("click", makeExamQuestion);
  $("#unknownExam").addEventListener("click", giveUpExamQuestion);
  $("#toggleCardExamples").addEventListener("click", toggleFormExamples);
  $("#toggleTableExamples").addEventListener("click", toggleFormExamples);
  $("#tableSearch").addEventListener("input", renderTables);
  $("#floatingNext").addEventListener("click", advanceCurrentView);
  $("#resetProgress").addEventListener("click", () => {
    if (!confirm("進捗を初期化しますか。")) return;
    state = { ...createDefaultState(), view: state.view };
    answerVisible = false;
    saveState();
    init();
  });
}

function renderAll() {
  renderSegments("cardCategory", state.cardCategory, (categoryId) => {
    state.cardCategory = categoryId;
    state.currentCardId = null;
    syncSegmentActive("cardCategory", categoryId);
    pickCard();
    renderStats();
  });

  renderSegments("quizCategory", state.quizCategory, (categoryId) => {
    state.quizCategory = categoryId;
    syncSegmentActive("quizCategory", categoryId);
    makeQuiz();
  });

  renderSegments("tableCategory", state.tableCategory, (categoryId) => {
    state.tableCategory = categoryId;
    syncSegmentActive("tableCategory", categoryId);
    renderTables();
    saveState();
  });

  renderCustomSegments("tableMode", TABLE_MODES, state.tableMode, (modeId) => {
    state.tableMode = modeId;
    syncSegmentActive("tableMode", modeId);
    renderTables();
    saveState();
  });

  renderExamSegments(state.examCategory, (categoryId) => {
    state.examCategory = categoryId;
    state.currentExamQuestion = null;
    syncSegmentActive("examCategory", categoryId);
    makeExamQuestion();
  });

  if (!state.currentCardId) {
    state.currentCardId = entries(state.cardCategory)[0]?.id || null;
  }
  if (!state.currentQuiz) {
    makeQuiz();
  }
  if (!state.currentExamQuestion) {
    makeExamQuestion();
  }

  setDailyLine();
  switchView(state.view);
  renderCard();
  renderQuiz();
  renderExamQuiz();
  renderTables();
  renderStats();
  syncFormExampleToggles();
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}

function init() {
  renderAll();
}

wireEvents();
init();
registerServiceWorker();
