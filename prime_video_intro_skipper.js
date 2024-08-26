// ==UserScript==
// @name                Prime Video Intro Skipper
// @name:ja             Prime Video Intro Skipper
// @name:en             Prime Video Intro Skipper
// @name:zh-CN          Prime Video Intro Skipper
// @name:ko             Prime Video Intro Skipper
// @name:ru             Prime Video Intro Skipper
// @name:de             Prime Video Intro Skipper
// @description         Automatically click "Skip Intro" button
// @description:ja      "イントロをスキップ"ボタンを自動でクリックする
// @description:en      Automatically click "Skip Intro" button
// @description:zh-CN   自动点击"Skip Intro"按钮
// @description:ko      "Skip Intro" 버튼을 자동으로 클릭합니다
// @description:ru      Автоматически нажимает кнопку "Skip Intro"
// @description:de      Klickt automatisch auf die Schaltfläche "Skip Intro"
// @version             0.9.0
// @author              Yos_sy
// @match               https://www.amazon.co.jp/*
// @namespace           http://tampermonkey.net/
// @icon                https://www.google.com/s2/favicons?sz=64&domain=amazon.co.jp
// @license             MIT
// @grant               none
// ==/UserScript==

(function () {
  "use strict";

  // クラスIntroSkipperを定義
  class IntroSkipper {
    constructor() {
      this.skipEnabled = true; // スキップ機能が有効かどうかを示すフラグ
    }

    // イントロをスキップするメソッド
    skipIntro() {
      if (!this.skipEnabled) return; // スキップが無効の場合は終了

      // スキップボタンを取得
      const skipButton = document.querySelector(
        "button.fqye4e3.f1ly7q5u.fk9c3ap.fz9ydgy.f1xrlb00.f1hy0e6n.fgbpje3.f1uteees.f1h2a8xb.atvwebplayersdk-skipelement-button.fjgzbz9.fiqc9rt.fg426ew.f1ekwadg"
      );
      if (!skipButton) return; // スキップボタンが見つからなければ終了

      skipButton.click(); // スキップボタンをクリック
      console.log("Intro skipped"); // ログに「イントロをスキップしました」と表示
      this.disableSkipping(); // スキップを一時的に無効にする
    }

    // スキップ機能を一時的に無効にするメソッド
    disableSkipping() {
      this.skipEnabled = false; // スキップを無効に設定
      setTimeout(() => {
        this.skipEnabled = true; // 3秒後にスキップを再度有効にする
        console.log("Skipping is re-enabled"); // ログに「スキップが再度有効になりました」と表示
      }, 3000); // 3秒のタイマー
    }

    // DOMの変化を監視し、変化があったらskipIntroを呼び出すメソッド
    observe() {
      const observer = new MutationObserver(() => this.skipIntro()); // MutationObserverを作成し、DOMの変化を検知
      observer.observe(document.body, { childList: true, subtree: true }); // ドキュメント全体の子リストとサブツリーを監視
    }
  }

  const skipper = new IntroSkipper(); // IntroSkipperクラスのインスタンスを作成
  skipper.observe(); // DOMの監視を開始
})();
