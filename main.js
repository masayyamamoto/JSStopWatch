'use strict';
{
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');

  let startTime;
  let timeoutId;
  let elapsedTime = 0; //経過時間から再開始するため経過時間を記録する

  function countUp() {
    // console.log(Date.now() - startTime);
    //スタートタイムから今の時間の差が経過時間（ミリ秒でカウントアップ）
    const d = new Date(Date.now() - startTime + elapsedTime);
    const m  = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    const ms = String(d.getMilliseconds()).padStart(3, '0');
    //padStartで桁を揃える（２桁表示,空白は'0'で埋める）
    //padStartは文字列に対応。なのでStringで文字列に変換
    timer.textContent = `${m}:${s}.${ms}`;

    timeoutId = setTimeout(() => {
    //セットタイムアウトの返り値として    
      countUp();
    }, 10); //10ミリ秒ごとにカウントアップ関数が走る
  }

//ボタンの挙動を制御するための関数を定義する-------
  function setButtonStateInitial() {
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.add('inactive');
  }
  function setButtonStateRunning() {
    start.classList.add('inactive');
    stop.classList.remove('inactive');
    reset.classList.add('inactive');
  }
  function setButtonStateStopped() {
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.remove('inactive');
  }
  setButtonStateInitial();
//ボタンの挙動を制御するための関数を定義する-------

  //スタートボタンのクリックイベント
  start.addEventListener('click', () => {
    if (start.classList.contains('inactive') === true ) {
      return;
    }
    setButtonStateRunning();
    startTime = Date.now();
    //現在時刻から
    countUp();
  });
  //ストップボタンのクリックイベント
  stop.addEventListener('click', () => {
    if (stop.classList.contains('inactive') === true ) {
      return;
    }
    setButtonStateStopped();
    clearTimeout(timeoutId);
    //セットタイムアウト・カウントアップをキャンセル
    elapsedTime += Date.now() - startTime;

  });
  //リセットボタンのクリックイベント
  reset.addEventListener('click', () => {
    if (reset.classList.contains('inactive') === true ) {
      return;
    }
    setButtonStateInitial();
    timer.textContent = '00:00.000';
    //startTime = Date.now(); //動いている状態で一旦リセットから始めたいとき
    elapsedTime = 0;
  });

}