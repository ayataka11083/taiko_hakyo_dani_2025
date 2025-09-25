const params = new URLSearchParams(window.location.search);
const danId = params.get("id") || "dan1";

fetch(`data/${danId}.json`)
  .then(response => response.json())
  .then(data => {
    // タイトル反映
    document.title = `段位認定 - ${data.title}`;
    document.getElementById("dan-name").textContent = data.title;

    // 曲リスト
    const container = document.getElementById("songs-container");
    data.songs.forEach((song, index) => {
    const card = document.createElement("div");
    card.className = "song-card";
    card.innerHTML = `
        <h2 class="song-title">${index + 1}曲目：${song.title}</h2>
        <p class="song-artist">　　${song.artist}</p>
    `;
    container.appendChild(card);
    });

    // 合格条件
    const condList = document.getElementById("conditions-list");
    data.conditions.forEach(cond => {
      const li = document.createElement("li");
      li.textContent = cond;
      condList.appendChild(li);
    });

    // ダウンロードリンク
    document.getElementById("download-link").href = data.download;
  })
  .catch(err => {
    console.error("データ読み込みエラー:", err);
  });

// ページ読み込み時にアニメーションを開始
document.addEventListener('DOMContentLoaded', function() {
  // 段位一覧ページの場合のみアニメーションを実行
  if (document.querySelector('.dan-grid')) {
    const cards = document.querySelectorAll('.dan-card');
    
    // 少し遅延させてからアニメーションを開始
    setTimeout(() => {
      cards.forEach((card, index) => {
        // 各カードに動的にアニメーション遅延を設定
        const delay = (index + 1) * 0.05; // 0.05秒ずつ遅延
        card.style.animationDelay = `${delay}s`;
        card.classList.add('animate');
      });
    }, 100);
  }
});