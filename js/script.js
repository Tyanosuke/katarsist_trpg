/**
 * フェードイン
 */
// window.onload = function () {
//   document.body.classList.add("show");
// };

/**
* ハッシュ変更イベント
*/
function jumpEvent(hash) {
  // ハッシュを取得
  if (hash) {
    // ジャンプ先の見出しを取得
    const target = document.querySelector(hash);
    if (target) {
      // 現在点滅中の要素があった場合
      const flashingItems = document.querySelectorAll('.flash');
      flashingItems.forEach(item => {
        // 点滅クラスを付与
        item.classList.remove('flash');
      })

      // 点滅クラスを付与
      target.classList.add('flash');

      // アニメーション終了後に点滅クラスを除去
      target.addEventListener('animationend', () => {
        target.classList.remove('flash');
      }, {
        once: true
      });
    }
  }

  // // 通常の遷移処理を中断
  // e.preventDefault();
  //
  // // フェードアウト
  // document.body.classList.remove("show");
  //
  // // リンク先ＵＲＬを取得
  // const href = link.getAttribute('href');
  //
  // // フェードアウト完了まで遅延させる
  // setTimeout(() => {
  //   // 遷移処理
  //   window.location.href = href;
  // }, 200);
}

/**
 * ページ遷移
 */
window.addEventListener(
  'DOMContentLoaded',
  () => {
    // 遷移イベント
    jumpEvent(location.hash);
  }
);

/**
 * ページ内ジャンプ
 */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener(
    'click',
    () => {
      // スクロールを待って処理
      requestAnimationFrame(() => {
        // 遷移イベント
        jumpEvent(link.getAttribute('href'));
      });
    }
  );
});

/**
* アコーディオンボタン
*/
const acordionButtons = document.querySelectorAll('.button-acordion');

acordionButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    // アコーディオン要素を取得
    const target = e.currentTarget.parentElement.parentElement.parentElement;

    // 開閉前のスクロール位置
    const targetTopBefore = target.getBoundingClientRect().top;

    // 開閉前のスクロール位置
    const bodyMarginTop = window.getComputedStyle(document.body).marginTop;

    // 閉じたり開いたり
    target.classList.toggle("close");

    // DOMが更新されるのを待つ
    requestAnimationFrame(() => {
      // 開閉後のスクロール位置
      const targetTopAfter = target.getBoundingClientRect().top;

      // スクロール
      window.scrollTo({
        top: targetTopAfter - targetTopBefore + bodyMarginTop
      });
    });
  });
});
