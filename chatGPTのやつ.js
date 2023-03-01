let pairs = []; // ペアになったピクセルの位置を記録する配列

function setup() {
  createCanvas(400, 400);
  background(220);
  noStroke();
  fill(0);
  textSize(20);
  textAlign(CENTER, CENTER);
  
  // ピクセルをランダムに配置し、ペアを作る
  let pixels = createPixelsArray(width, height);
  pairs = createPairs(pixels);
  
  // ピクセルとペアを表示する
  displayPixels(pixels);
  displayPairs(pairs);
}

function createPixelsArray(w, h) {
  let pixels = [];
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      pixels.push(createVector(x, y));
    }
  }
  return pixels;
}

function createPairs(pixels) {
  let pairs = [];
  let remaining = pixels.slice(); // 残りのピクセル
  while (remaining.length > 1) {
    let index1 = floor(random(remaining.length)); // ランダムに一つ目のピクセルを選ぶ
    let pixel1 = remaining[index1];
    remaining.splice(index1, 1); // 選ばれたピクセルを残りのピクセルから取り除く
    let index2 = floor(random(remaining.length)); // ランダムに二つ目のピクセルを選ぶ
    let pixel2 = remaining[index2];
    remaining.splice(index2, 1); // 選ばれたピクセルを残りのピクセルから取り除く
    pairs.push([pixel1, pixel2]); // ペアを追加する
  }
  if (remaining.length == 1) { // 残りが一つの場合、最後のペアを作る
    pairs.push([remaining[0], remaining[0]]);
  }
  return pairs;
}

function displayPixels(pixels) {
  for (let i = 0; i < pixels.length; i++) {
    let pixel = pixels[i];
    rect(pixel.x, pixel.y, 1, 1);
  }
}

function displayPairs(pairs) {
  for (let i = 0; i < pairs.length; i++) {
    let pair = pairs[i];
    let midpoint = p5.Vector.add(pair[0], pair[1]).mult(0.5); // ペアの中点を計算する
    text(i + 1, midpoint.x, midpoint.y); // ペア番号を中点に表示する
  }
}
