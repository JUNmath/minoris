async function body(){

  block_ary = blockAryPrepare();

  let next_block = block_ary[Math.floor(Math.random() * block_ary.length)];     //next_block:次に落ちてくるブロックの変数。初期値はランダムに
  Total_Blocks = [];                                                            //total_blocksの初期化
  for (let i = 0; i < 21; i++){
    Total_Blocks.push([1,0,0,0,0,0,0,0,0,0,0,1]);
  }
  Total_Blocks.push([1,1,1,1,1,1,1,1,1,1,1,1]);                                 //最下層の設定

  let test_ary = [];                                                            //上判定用test_aryの定義
  for (let i = 0; i < 21; i++){
    test_ary.push([1,0,0,0,0,0,0,0,0,0,0,1]);
  }
  test_ary.push([1,1,1,1,1,1,1,1,1,1,1,1]);
  test_ary[2] = [1,1,1,1,1,1,1,1,1,1,1,1];
  Score = 0;
  let score_plus = 0;

  let gameover = false;
  // 以下ゲームの開始
  while(gameover == false){
    Now_Block = next_block;                                                     //次のブロックを現在のブロックに
    next_block = block_ary[Math.floor(Math.random() * block_ary.length)];       //次のブロックを設定
    if (mode == 'hyper'){
      let start = Math.floor(Math.random() * 9);
      next_block = [start];
      for (let i = 0; i < 8; i++){
        if (Math.random()>0.8-Score/100){
          next_block.push((start+i+1)%9);
        }
      }
    }else{
      next_block = block_ary[Math.floor(Math.random() * block_ary.length)];     //次のブロックを設定
    }
    dispMiddleLayer(next_block);                                                //中間層を表示
    X = 5;
    Y = 1;
    //以下1秒ごとにブロックを落とす
    let next = false;                                                           //next変数。trueのときループを抜けて次のブロックへ移動
    while(next == false){
      dispBlock();
      await sleep(1000-5*Score);                                                //1秒待機
      if(judge(X,Y+1,Total_Blocks)){                                            //下方向当たり判定
        Y = Y+1;
      }else{                                                                    //下にぶつかっていた場合
        addTotalBlocks();                                                       //背景に追加
        score_plus = 0;                                                         //score加算変数の初期化
        for (let i = 3; i < 21; i++){                                           //消去判定
          if(Total_Blocks[i].toString() == [1,1,1,1,1,1,1,1,1,1,1,1].toString()){
            Total_Blocks.splice(i,1);
            Total_Blocks.unshift([1,0,0,0,0,0,0,0,0,0,0,1]);
            score_plus += 1;
          }
        }
        switch (score_plus) {                                                   //Score加算
          case 4:
            Score += 4;
          case 3:
            Score += 3;
          case 2:
            Score += 2;
          case 1:
            Score += 1;
          default:
        }
        if(judge(X,Y,test_ary)==false){                               //GameOver判定
          alert('GameOver');
          next = true;
          gameover = true;
        }
        next = true;
      }
    }
  }
}


// disoBlock関数
//blockの形状配列と中心座標を引数に持ち、表示をする(後で色も変数に入れたい)
//x,yは左上からの座標で、(0,0)から(9,15)までを持つ
function dispBlock(){
  const coord_x = X*30+11;
  const coord_y = Y*30+51;
  const canvas3 = document.getElementById('canvas3');
  canvas3.width = 450;
  canvas3.height = 690;
  const context3 = canvas3.getContext('2d');
  context3.beginPath();
  context3.fillStyle = "blue";

  for(const num of Now_Block){
    switch(num){
      case 0:
        context3.fillRect(coord_x-30,coord_y-30,28,28);
        break;
      case 1:
        context3.fillRect(coord_x,coord_y-30,28,28);
        break;
      case 2:
        context3.fillRect(coord_x+30,coord_y-30,28,28);
        break;
      case 3:
        context3.fillRect(coord_x+30,coord_y,28,28);
        break;
      case 4:
        context3.fillRect(coord_x+30,coord_y+30,28,28);
        break;
      case 5:
        context3.fillRect(coord_x,coord_y+30,28,28);
        break;
      case 6:
        context3.fillRect(coord_x-30,coord_y+30,28,28);
        break;
      case 7:
        context3.fillRect(coord_x-30,coord_y,28,28);
        break;
      case 8:
        context3.fillRect(coord_x,coord_y,28,28);
        break;
      default:
        break;
    context3.stroke();
    }
  }
}

// MiddleLayerの表示関数
// 背景であるtotal_blocksと次表示のnext_blockを引数にもつ
function dispMiddleLayer(next_block){
  //canvas2の用意
  const canvas2 = document.getElementById('canvas2');
  canvas2.width = 450;
  canvas2.height = 690;
  const context2 = canvas2.getContext('2d');
  //total_blocksの表示
  context2.beginPath();
  context2.fillStyle = 'green';
  for(let i = 0; i < 10; i++){
    for(let j = 0; j < 21; j++){
      if(Total_Blocks[j][i+1] == 1){
        context2.fillRect(30*i+11,30*j+51,28,28);
      }
    }
  }
  context2.stroke();
  //next_blockの表示
  context2.beginPath();
  context2.fillStyle = 'red';
  for(const num of next_block){
    switch(num){
      case 0:
        context2.fillRect(351,51,18,18);
        break;
      case 1:
        context2.fillRect(371,51,18,18);
        break;
      case 2:
        context2.fillRect(391,51,18,18);
        break;
      case 3:
        context2.fillRect(391,71,18,18);
        break;
      case 4:
        context2.fillRect(391,91,18,18);
        break;
      case 5:
        context2.fillRect(371,91,18,18);
        break;
      case 6:
        context2.fillRect(351,91,18,18);
        break;
      case 7:
        context2.fillRect(351,71,18,18);
        break;
      case 8:
        context2.fillRect(371,71,18,18);
        break;
      default:
        break;
    }
  }
  context2.stroke();
  context2.beginPath();
  context2.fillStyle = 'black';
  context2.font = "20px 'ＭＳ ゴシック'";
  context2.fillText(String(Score),350,600);
  context2.stroke();

}

// 当たり判定関数
// Now_Blockの中心座標、Now_Block配列、total_blocks配列を引数にもつ
//  Now_Blockとtotal_blocksが被っていたらfalse,それ以外ではtrueを返す
function judge(x,y,total_blocks){
  for (const num of Now_Block){
    switch(num){
      case 0:
        if(total_blocks[y-1][x]==1){
          return false;
        }
        break;
      case 1:
        if(total_blocks[y-1][x+1]==1){
          return false;
        }
        break;
      case 2:
        if(total_blocks[y-1][x+2]==1){
          return false;
        }
        break;
      case 3:
        if(total_blocks[y][x+2]==1){
          return false;
        }
        break;
      case 4:
        if(total_blocks[y+1][x+2]==1){
          return false;
        }
        break;
      case 5:
        if(total_blocks[y+1][x+1]==1){
          return false;
        }
        break;
      case 6:
        if(total_blocks[y+1][x]==1){
          return false;
        }
        break;
      case 7:
        if(total_blocks[y][x]==1){
          return false;
        }
        break;
      case 8:
        if(total_blocks[y][x+1]==1){
          return false;
        }
        break;
      default:
        break;
    }
  }
  return true;
}

//sleep関数
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//Now_BlockをTotal_Blocksに追加
function addTotalBlocks(){
  for (const num of Now_Block){
    switch(num){
      case 0:
        Total_Blocks[Y-1][X]=1
        break;
      case 1:
        Total_Blocks[Y-1][X+1]=1
        break;
      case 2:
        Total_Blocks[Y-1][X+2]=1
        break;
      case 3:
        Total_Blocks[Y][X+2]=1
        break;
      case 4:
        Total_Blocks[Y+1][X+2]=1
        break;
      case 5:
        Total_Blocks[Y+1][X+1]=1
        break;
      case 6:
        Total_Blocks[Y+1][X]=1
        break;
      case 7:
        Total_Blocks[Y][X]=1
        break;
      case 8:
        Total_Blocks[Y][X+1] = 1;
        break;
      default:
        break;
    }
  }
}
