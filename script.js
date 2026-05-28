// 問題データ
const allQuestions = [
    {q:"水素",a:"H"},{q:"酸素",a:"O"},{q:"窒素",a:"N"},{q:"炭素",a:"C"},{q:"塩素",a:"Cl"},{q:"硫黄",a:"S"},
    {q:"アルミニウム",a:"Al"},{q:"ナトリウム",a:"Na"},{q:"マグネシウム",a:"Mg"},{q:"カルシウム",a:"Ca"},
    {q:"カリウム",a:"K"},{q:"バリウム",a:"Ba"},{q:"ベリリウム",a:"Be"},{q:"鉄",a:"Fe"},{q:"銅",a:"Cu"},
    {q:"銀",a:"Ag"},{q:"金",a:"Au"},{q:"亜鉛",a:"Zn"}
];
const allSymbols = allQuestions.map(item => item.a);

// 状態管理
let remainingQuestions = [...allQuestions];
let correctCount = 0;

function loadQuestion() {
    // 終了判定
    if (remainingQuestions.length === 0) {
        document.getElementById('question-box').textContent = "全問正解！";
        document.getElementById('buttons-container').innerHTML = '';
        return;
    }

    // 残りの問題からランダムに1問選ぶ（これが一番安全）
    const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
    const q = remainingQuestions[randomIndex];
    document.getElementById('question-box').textContent = q.q;

    // ボタン12個生成
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

function check(btn, selected, q, index) {
    if (selected === q.a) {
        btn.classList.add('correct-class');
        correctCount++;
        document.getElementById('score-display').textContent = `あと ${allQuestions.length - correctCount} 問でクリア`;
        
        // 正解したらその問題をリストから削除
        remainingQuestions.splice(index, 1);
        
        setTimeout(loadQuestion, 500);
    } else {
        btn.classList.add('wrong-class');
        // 間違えたら少し待ってから赤を消すだけ
        setTimeout(() => btn.classList.remove('wrong-class'), 500);
    }
}

loadQuestion();