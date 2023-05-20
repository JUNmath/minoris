function prepare(){

  // mode選択画面の書き換えと消去
  //文章の書き換え
  let modechoice = document.getElementById('modechoicesentence');
  modechoice.style = 'color: red';
  modechoice.textContent = 'Press Start Button';
  //ボタンの変更(normalボタンをstartボタンへ)
  modechoice = document.getElementById('modenormal');
  modechoice.style = 'color: blue'
  modechoice.style = 'font-size: 20px'
  modechoice.textContent = 'Start';
  modechoice.onclick = function onclick(event) {body()};                        //onclick時の行き先を変更
  //不要なボタンの削除
  modechoice = document.getElementById('modehard');
  modechoice.remove();
  modechoice = document.getElementById('modeexpert');
  modechoice.remove();
  modechoice = document.getElementById('modeextreme');
  modechoice.remove();
  modechoice = document.getElementById('modehyper');
  modechoice.remove();
  // 操作説明の移動
  const rule = document.getElementById('rule');
  rule.style.margin = '25em 0 0 30em';

  //game画面(下層)の描画
  const canvas1 = document.getElementById('canvas1');
  canvas1.width = 450;
  canvas1.height = 690;
  const context1 = canvas1.getContext('2d');
  context1.beginPath();
  context1.fillStyle = "#eae8e1";
  context1.fillRect(0,0,450,690);                                               //背景塗りつぶし
  context1.rect(10,50,300,630);                                                 //枠線の追加
  // 格子の描画
  context1.strokeStyle = "black";
  for (let v = 0; v<10; v++){                                                   //縦罫線の追加
    context1.moveTo(30*v+10,50);
    context1.lineTo(30*v+10,680);
  }
  for (let h = 0; h<21; h++){                                                   //横罫線の追加
    if (h == 3){                                                                //3行目のみ赤線で描画するため、ここでは飛ばす
      continue;
    }
    context1.moveTo(10,30*h+50);
    context1.lineTo(310,30*h+50);
  }
  // next blockの表示枠
  context1.rect(350,50,60,60);
  context1.stroke();
  //上で飛ばした3行目横罫線の描画
  context1.beginPath();
  context1.strokeStyle = "red";
  context1.moveTo(10,140);
  context1.lineTo(310,140);
  context1.stroke();
}



function blockAryPrepare(){
  let block_ary = [];//gameに用いるブロックの決定
  let block_ary_sub = [];
  switch (mode) {
    case 'extreme':
      block_ary.push([0,1,2,4,5,6],[0,1,2,4,5,8],[0,1,2,5,6,8],[0,1,2,4,5,6,8],[0,1,2,3,4,5,6,7],[0,1,2,3,4,6,7],[0,1,3,5,6,8]);
    case 'expert':
      block_ary.push([0,1,4,5,8],[1,2,5,6,8],[0,1,5,6,8],[0,3,5,7,8],[2,3,5,7,8],[0,1,3,7,8],[1,2,3,7,8],[1,3,5,7,8],[0,1,2,5,8],[0,1,3,4,8]);
    case 'hard':
      block_ary.push([1,3,8],[1,5,8],[0,2,8],[0,4,8],[0,3,8],[0,5,8]);
    default:
      block_ary.push([1,2,5,8],[0,1,5,8],[0,1,7,8],[2,3,5,8],[0,5,7,8],[1,3,5,8]);
  }
  return block_ary;
}
