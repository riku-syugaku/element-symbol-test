// 1. 問題データ
const allQuestions = [
    {q:"水素",a:"H",isFirstTry:true},{q:"酸素",a:"O",isFirstTry:true},{q:"窒素",a:"N",isFirstTry:true},
    {q:"炭素",a:"C",isFirstTry:true},{q:"塩素",a:"Cl",isFirstTry:true},{q:"硫黄",a:"S",isFirstTry:true},
    {q:"アルミニウム",a:"Al",isFirstTry:true},{q:"ナトリウム",a:"Na",isFirstTry:true},{q:"マグネシウム",a:"Mg",isFirstTry:true},
    {q:"カルシウム",a:"Ca",isFirstTry:true},{q:"カリウム",a:"K",isFirstTry:true},{q:"バリウム",a:"Ba",isFirstTry:true},
    {q:"ベリリウム",a:"Be",isFirstTry:true},{q:"鉄",a:"Fe",isFirstTry:true},{q:"銅",a:"Cu",isFirstTry:true},
    {q:"銀",a:"Ag",isFirstTry:true},{q:"金",a:"Au",isFirstTry:true},{q:"亜鉛",a:"Zn",isFirstTry:true}
];
const allSymbols = allQuestions.map(item => item.a);

// 2. 変数の初期化
let remainingQuestions = [...allQuestions];
let nextList = [];
let correctCount = 0;

// 3. クイズのメイン処理
function loadQuestion() {
    // 【修正後】もし現在のリストが空なら、まず nextList を補充する
    if (remainingQuestions.length === 0) {
        if (nextList.length === 0) {
            // ここで初めて本当に終了
            showClearScreen();
            return;
        }
        remainingQuestions = [...nextList];
        nextList = [];
    }

    // 問題を表示
    const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
    const q = remainingQuestions[randomIndex];
    document.getElementById('question-box').textContent = q.q;

    createButtons(q, randomIndex);
}

// ボタンを作成する関数
function createButtons(q, randomIndex) {
    let options = [q.a];
    while (options.length < 12) {
        let sym = allSymbols[Math.floor(Math.random() * allSymbols.length)];
        if (!options.includes(sym)) options.push(sym);
    }
    options.sort(() => Math.random() - 0.5);

    const container = document.getElementById('buttons-container');
    container.innerHTML = '';
    options.forEach(sym => {
        const btn = document.createElement('button');
        btn.textContent = sym;
        btn.onclick = () => check(btn, sym, q, randomIndex);
        container.appendChild(btn);
    });
}

// 回答チェック関数
function check(btn, selected, q, index) {
    if (btn.classList.contains('correct-class') || btn.classList.contains('wrong-class')) return;

    if (selected === q.a) {
        btn.classList.add('correct-class');
        if (q.isFirstTry) {
            correctCount++;
            document.getElementById('score-display').textContent = `あと ${allQuestions.length - correctCount} 問`;
        }
        remainingQuestions.splice(index, 1);
        setTimeout(loadQuestion, 500);
    } else {
        btn.classList.add('wrong-class');
        if (q.isFirstTry) {
            q.isFirstTry = false;
            nextList.push({...q});
        }
        setTimeout(() => btn.classList.remove('wrong-class'), 500);
    }
}

// 終了画面
function showClearScreen() {
    document.getElementById('question-box').textContent = "全問正解！";
    const container = document.getElementById('buttons-container');
    container.innerHTML = '';
    const restartBtn = document.createElement('button');
    restartBtn.textContent = "もう一度挑戦する";
    restartBtn.style.gridColumn = "span 3";
    restartBtn.onclick = () => location.reload();
    container.appendChild(restartBtn);
}

// 起動
loadQuestion();
