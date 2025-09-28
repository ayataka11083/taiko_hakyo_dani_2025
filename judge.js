document.addEventListener('DOMContentLoaded', function() {
  const judgeBtn = document.getElementById('judge-btn');
  const resultDiv = document.getElementById('judge-result');
  const resultContent = document.getElementById('result-content');

  judgeBtn.addEventListener('click', function() {
    const goodCount = parseInt(document.getElementById('good-count').value) || 0;
    const okCount = parseInt(document.getElementById('ok-count').value) || 0;
    const badCount = parseInt(document.getElementById('bad-count').value) || 0;
    
    const total = goodCount + okCount + badCount;
    
    if (total === 0) {
      alert('リザルトを入力してください！');
      return;
    }
    
    // 魂ゲージ計算
    const point = okCount + badCount * 6;
    const ratio = point / total;
    const Rate = -(2000 / 31) * ratio + 4040 / 31;
    
    // 達成率を小数点第1位まで表示（第2位を切り捨て）
    const displayRate = Math.floor(Rate * 10) / 10;
    
    // 合否判定と色分け
    let statusClass = 'failed'; // デフォルト：不合格（青）
    let statusText = '不合格';
    
    if (Rate >= 100) {
      statusClass = 'gold-passed'; // 金合格
      statusText = '金合格';
    } else if (Rate >= 80) {
      statusClass = 'red-passed'; // 赤合格
      statusText = '赤合格';
    }
    
    // 結果表示
    resultContent.innerHTML = `
      <div class="result-summary">
        <p><strong>ポイント:</strong> ${point}</p>
        <p><strong>魂ゲージ:</strong> ${displayRate}%</p>
        <p class="result-status ${statusClass}">
          <strong>${statusText}</strong>
        </p>
      </div>
    `;
    
    resultDiv.style.display = 'block';
  });
});