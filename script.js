const canvas = document.getElementById('materialCanvas');
const ctx = canvas.getContext('2d');

let materialWidth, materialHeight;
let partWidth, partHeight, gap;
let currentX = 0;
let currentY = 0;

function setMaterial() {
  materialHeight = parseInt(document.getElementById('materialHeight').value);
  materialWidth = parseInt(document.getElementById('materialWidth').value);

  canvas.width = materialWidth;
  canvas.height = materialHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#f0e68c";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  // 初期位置をリセット
  currentX = 0;
  currentY = 0;
}

function addParts() {
  partHeight = parseInt(document.getElementById('partHeight').value);
  partWidth = parseInt(document.getElementById('partWidth').value);
  gap = parseInt(document.getElementById('gap').value);

  // 初期位置をリセットして全ての部品を配置
  currentX = 0;
  currentY = 0;

  while (currentY + partHeight <= materialHeight) {
    if (currentX + partWidth <= materialWidth) {
      ctx.fillStyle = getRandomColor(); // ランダムな色で部品を描画
      ctx.fillRect(currentX, currentY, partWidth, partHeight);
      currentX += partWidth + gap; // 次の部品位置を設定
    } else {
      currentX = 0;
      currentY += partHeight + gap; // 次の行に移動
    }
  }
}

function addNextPart() {
  partHeight = parseInt(document.getElementById('partHeight').value);
  partWidth = parseInt(document.getElementById('partWidth').value);
  gap = parseInt(document.getElementById('gap').value);

  ctx.fillStyle = getRandomColor(); // ランダムな色で部品を描画

  // 次の部品が収まるかを確認
  if (currentX + partWidth > materialWidth) {
    // 横に収まらなければ、次の行に移動
    currentX = 0;
    currentY += partHeight + gap;
  }

  if (currentY + partHeight <= materialHeight) {
    // 現在位置に部品を描画
    ctx.fillRect(currentX, currentY, partWidth, partHeight);
    currentX += partWidth + gap; // 次の部品位置を設定
  } else {
    alert("材料範囲外のため、これ以上部品を追加できません。");
  }
}

function clearParts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#f0e68c"; // 材料の色
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  // 位置をリセット
  currentX = 0;
  currentY = 0;
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}
