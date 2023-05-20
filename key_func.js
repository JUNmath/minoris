document.addEventListener('keypress', function(key){
  switch (key.code) {
    case 'KeyA':                                                                //左移動
      move_left();
      break;
    case 'KeyS':                                                                //下移動
      move_down();
      break;
    case 'KeyD':                                                                //右移動
      move_right();
      break;
    case 'KeyJ':                                                                //半時計回転
      turn_right();
      break;
    case 'KeyK':                                                                //時計回転
      turn_left();
      break;
    default:
  }
})

function move_left(){
  if(judge(X-1,Y,Total_Blocks)){
    X = X - 1;
    dispBlock();
  }
}
function move_right(){
  if(judge(X+1,Y,Total_Blocks)){
    X = X + 1;
    dispBlock();
  }
}
function move_down(){
  if(judge(X,Y+1,Total_Blocks)){
    Y = Y + 1;
    dispBlock();
  }
}
function turn_right(){
  let spare_ary = [];
  for (const num of Now_Block){
    if (num < 8){
      spare_ary.push((num+2)%8);
    }else{
      spare_ary.push(8);
    }
  }
  Now_Block = spare_ary.concat();
  if(X<4 && judge(X,Y,Total_Blocks)==false){
    X = X + 1;
  }
  if(X<4 && judge(X,Y,Total_Blocks)==false){
    X = X + 1;
  }
  if(X>6 && judge(X,Y,Total_Blocks)==false){
    X = X - 1;
  }
  if(X>6 && judge(X,Y,Total_Blocks)==false){
    X = X - 1;
  }
  if(judge(X,Y,Total_Blocks)==false){
    Y = Y - 1;
  }
  if(judge(X,Y,Total_Blocks)==false){
    Y = Y - 1;
  }
  Now_Block = spare_ary.concat();
  dispBlock();
}
function turn_left(){
  let spare_ary = [];
  for (const num of Now_Block){
    if (num < 8){
      spare_ary.push((num+6)%8);
    }else{
      spare_ary.push(8);
    }
  }
  Now_Block = spare_ary.concat();
  if(X<4 && judge(X,Y,Total_Blocks)==false){
    X = X + 1;
  }
  if(X<4 && judge(X,Y,Total_Blocks)==false){
    X = X + 1;
  }
  if(X>6 && judge(X,Y,Total_Blocks)==false){
    X = X - 1;
  }
  if(X>6 && judge(X,Y,Total_Blocks)==false){
    X = X - 1;
  }
  if(judge(X,Y,Total_Blocks)==false){
    Y = Y - 1;
  }
  if(judge(X,Y,Total_Blocks)==false){
    Y = Y - 1;
  }
  Now_Block = spare_ary.concat();
  dispBlock();
}
