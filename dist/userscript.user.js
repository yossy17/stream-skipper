// ==UserScript==
// @name Stream Skipper
// @name:ja Stream Skipper
// @name:zh-CN Stream Skipper
// @name:ko Stream Skipper
// @description Skip intros and endings on Netflix and Prime Video
// @description:ja Netflix, Prime Video でイントロとエンディングをスキップできます
// @description:zh-CN 跳过 Netflix 和 Prime Video 上的片头和片尾
// @description:ko Netflix 및 Prime Video 에서 인트로와 엔딩 건너뛰기
// @version 3.0.0
 // @author Yos_sy
 // @match *://*.amazon.com/*
// @match *://*.amazon.ca/*
// @match *://*.amazon.com.mx/*
// @match *://*.amazon.co.uk/*
// @match *://*.amazon.de/*
// @match *://*.amazon.fr/*
// @match *://*.amazon.it/*
// @match *://*.amazon.es/*
// @match *://*.amazon.nl/*
// @match *://*.amazon.se/*
// @match *://*.amazon.pl/*
// @match *://*.amazon.co.jp/*
// @match *://*.amazon.com.au/*
// @match *://*.amazon.in/*
// @match *://*.amazon.cn/*
// @match *://*.amazon.com.br/*
// @match *://*.amazon.sa/*
// @match *://*.amazon.ae/*
// @match *://*.amazon.sg/*
// @match *://*.amazon.com.tr/*
// @match *://*.netflix.com/*
// @namespace http://tampermonkey.net/
 // @icon https://github.com/yossy17/stream-skipper/raw/master/images/icons/normal/icon-48.webp
 // @grant GM_setValue
// @grant GM_getValue
// @license MIT
 // @updateURL https://github.com/yossy17/stream-skipper/raw/master/dist/userscript.user.js
 // @downloadURL https://github.com/yossy17/stream-skipper/raw/master/dist/userscript.user.js
 // @supportURL https://github.com/yossy17/stream-skipper
 // ==/UserScript==

(function() {
  "use strict";
  const GM_SKIP_INTRO_KEY = "skip_intro_enabled";
  const GM_SKIP_ENDING_KEY = "skip_ending_enabled";
  const GM_SKIP_KEY = "skip_enabled";
  class SkipStorage {
    // イントロスキップ設定の保存・読み込み
    static getSkipIntroEnabled() {
      return GM_getValue(GM_SKIP_INTRO_KEY, true);
    }
    static saveSkipIntroEnabled(enabled) {
      GM_setValue(GM_SKIP_INTRO_KEY, enabled);
    }
    // エンディングスキップ設定の保存・読み込み
    static getSkipEndingEnabled() {
      return GM_getValue(GM_SKIP_ENDING_KEY, true);
    }
    static saveSkipEndingEnabled(enabled) {
      GM_setValue(GM_SKIP_ENDING_KEY, enabled);
    }
    // スキップ有効設定の保存・読み込み
    static getSkipEnabled() {
      return GM_getValue(GM_SKIP_KEY, true);
    }
    static saveSkipEnabled(enabled) {
      GM_setValue(GM_SKIP_KEY, enabled);
    }
  }
  class IntroEndingSkipper {
    constructor() {
      this.skipIntroEnabled = SkipStorage.getSkipIntroEnabled();
      this.skipEndingEnabled = SkipStorage.getSkipEndingEnabled();
      this.skipEnabled = SkipStorage.getSkipEnabled();
      this.buttonSelectors = {
        primeVideo: {
          intro: {
            type: "single",
            delay: 5e3,
            selector: "button.fqye4e3.f1ly7q5u.fk9c3ap.fz9ydgy.f1xrlb00.f1hy0e6n.fgbpje3.f1uteees.f1h2a8xb.atvwebplayersdk-skipelement-button.fjgzbz9.fiqc9rt.fg426ew.f1ekwadg"
          },
          ending: {
            type: "multi",
            delay: 500,
            selector: "div.atvwebplayersdk-nextupcard-button.fixbm5z.f1nog967.fobx3y5",
            offSelector: "div.fxviu8c > button.atvwebplayersdk-nextupcardhide-button"
          },
          nextEpisode: {
            selector: "button.atvwebplayersdk-nexttitle-button"
          }
        },
        netflix: {
          intro: {
            type: "single",
            delay: 0,
            selector: "button.watch-video--skip-content-button"
          },
          ending: {
            type: "multi",
            delay: 0,
            selector: "button[data-uia='next-episode-seamless-button']",
            offSelector: "button[data-uia='watch-credits-seamless-button']"
          },
          nextEpisode: {
            selector: "button[data-uia='control-next']"
          }
        }
      };
    }
    // イントロをスキップ
    skipIntro() {
      if (!this.skipEnabled || !this.skipIntroEnabled) return;
      for (const service in this.buttonSelectors) {
        const { selector, delay } = this.buttonSelectors[service].intro;
        const introButton = document.querySelector(selector);
        if (introButton) {
          setTimeout(() => {
            introButton.click();
            console.log(`Intro skipped for ${service}`);
          }, delay);
          break;
        }
      }
    }
    // エンディングをスキップ
    skipEnding() {
      for (const service in this.buttonSelectors) {
        const { selector, offSelector, delay } = this.buttonSelectors[service].ending;
        if (this.skipEnabled && this.skipEndingEnabled) {
          const endingButton = document.querySelector(selector);
          if (endingButton) {
            setTimeout(() => {
              endingButton.click();
              console.log(`Ending skipped for ${service}`);
            }, delay);
          }
        } else if (offSelector) {
          const offButton = document.querySelector(offSelector);
          if (offButton) {
            setTimeout(() => {
              offButton.click();
              console.log(`Watch credits for ${service}`);
            }, delay);
          }
        }
      }
    }
    // 次のエピソードボタンをクリック
    clickNextEpisode() {
      for (const service in this.buttonSelectors) {
        if (this.buttonSelectors[service].nextEpisode) {
          const { selector } = this.buttonSelectors[service].nextEpisode;
          const nextButton = document.querySelector(selector);
          if (nextButton) {
            nextButton.click();
            console.log(`Next episode clicked for ${service}`);
            break;
          }
        }
      }
    }
    // スキップ機能の全体的な切り替え
    toggleSkipping() {
      this.skipEnabled = !this.skipEnabled;
      SkipStorage.saveSkipEnabled(this.skipEnabled);
      console.log(`Skipping is ${this.skipEnabled ? "enabled" : "disabled"}`);
    }
    // イントロスキップの切り替え
    toggleSkipIntro() {
      this.skipIntroEnabled = !this.skipIntroEnabled;
      SkipStorage.saveSkipIntroEnabled(this.skipIntroEnabled);
      console.log(
        `Intro Skipping is ${this.skipIntroEnabled ? "enabled" : "disabled"}`
      );
    }
    // エンディングスキップの切り替え
    toggleSkipEnding() {
      this.skipEndingEnabled = !this.skipEndingEnabled;
      SkipStorage.saveSkipEndingEnabled(this.skipEndingEnabled);
      console.log(
        `Ending Skipping is ${this.skipEndingEnabled ? "enabled" : "disabled"}`
      );
    }
    // DOMの変更を監視
    observe() {
      const observer = new MutationObserver(() => {
        if (this.skipEnabled) {
          this.skipIntro();
          this.skipEnding();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
    // 状態取得
    isSkipEnabled() {
      return this.skipEnabled;
    }
    isSkipIntroEnabled() {
      return this.skipIntroEnabled;
    }
    isSkipEndingEnabled() {
      return this.skipEndingEnabled;
    }
  }
  const KEY_BINDINGS = {
    z: "toggleSkipping",
    x: "toggleSkipIntro",
    c: "toggleSkipEnding",
    n: "clickNextEpisode"
  };
  class ShortcutManager {
    constructor(actions) {
      this.actions = actions;
    }
    init() {
      document.addEventListener("keydown", (e) => {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLElement && e.target.contentEditable === "true") {
          return;
        }
        if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;
        const action = KEY_BINDINGS[e.key];
        if (!action) return;
        e.preventDefault();
        this.handleAction(action);
      });
    }
    handleAction(action) {
      switch (action) {
        case "toggleSkipping":
          this.actions.toggleSkipping();
          break;
        case "toggleSkipIntro":
          this.actions.toggleSkipIntro();
          break;
        case "toggleSkipEnding":
          this.actions.toggleSkipEnding();
          break;
        case "clickNextEpisode":
          this.actions.clickNextEpisode();
          break;
      }
    }
  }
  const createHud = () => {
    const hud = document.createElement("div");
    hud.style.cssText = `
    position: fixed;
    top: 24px;
    left: 24px;
    transform: scale(0.5);
    background: rgba(10, 10, 15, 0.75);
    backdrop-filter: blur(10px) saturate(180%);
    color: #fff;
    padding: 16px 24px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 16px;
    z-index: calc(infinity);
    opacity: 0;
    transition: opacity 0.3s ease-out, transform 0.3s ease-out;
  `;
    return hud;
  };
  const createTitle = () => {
    const title = document.createElement("p");
    title.textContent = "HUD";
    title.style.cssText = `
    margin: 0 0 8px 0;
    text-align: center;
  `;
    return title;
  };
  const createStatus = (label, enabled) => {
    const status = document.createElement("div");
    status.textContent = label[0];
    status.title = label;
    status.style.cssText = `
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    background: ${"#f87171"};
    cursor: default;
    user-select: none;
    transition: background-color 0.3s ease, transform 0.2s ease;
  `;
    return status;
  };
  const createStatusList = (skipperEnabled, skipIntroEnabled, skipEndingEnabled) => {
    const list = document.createElement("div");
    list.style.cssText = `
    display: flex;
    flex-direction: row;
    gap: 8px;
    justify-content: center;
    align-items: center;
  `;
    const skipperStatus = createStatus("Skip");
    const introStatus = createStatus("Intro");
    const endingStatus = createStatus("Ending");
    list.append(skipperStatus, introStatus, endingStatus);
    return list;
  };
  const createHUD = () => {
    const element = createHud();
    document.body.appendChild(element);
    const title = createTitle();
    const statusList = createStatusList();
    element.append(title, statusList);
    const buttons = Array.from(statusList.children);
    const show = (skipperEnabled, skipIntroEnabled, skipEndingEnabled) => {
      buttons[0].style.backgroundColor = skipperEnabled ? "#4ade80" : "#f87171";
      buttons[1].style.backgroundColor = skipIntroEnabled ? "#4ade80" : "#f87171";
      buttons[2].style.backgroundColor = skipEndingEnabled ? "#4ade80" : "#f87171";
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          element.style.opacity = "1";
          element.style.transform = "scale(1)";
        });
      });
      setTimeout(() => {
        element.style.opacity = "0";
        element.style.transform = "scale(0.5)";
      }, 1e3);
    };
    const getElement = () => element;
    return { show, getElement };
  };
  class FullscreenHandler {
    constructor() {
      this.elements = [];
    }
    register(...elements) {
      this.elements = elements;
    }
    init() {
      document.addEventListener("fullscreenchange", () => {
        if (document.fullscreenElement) {
          this.moveToFullscreen();
        } else {
          this.restore();
        }
      });
    }
    moveToFullscreen() {
      const fullscreenElement = document.fullscreenElement;
      if (fullscreenElement) {
        this.elements.forEach((el) => fullscreenElement.appendChild(el));
      }
    }
    restore() {
      this.elements.forEach((el) => document.body.appendChild(el));
    }
  }
  function init() {
    const skipper = new IntroEndingSkipper();
    const hud = createHUD();
    const fullscreenHandler = new FullscreenHandler();
    fullscreenHandler.register(hud.getElement());
    fullscreenHandler.init();
    const shortcuts = new ShortcutManager({
      toggleSkipping: () => {
        skipper.toggleSkipping();
        hud.show(
          skipper.isSkipEnabled(),
          skipper.isSkipIntroEnabled(),
          skipper.isSkipEndingEnabled()
        );
      },
      toggleSkipIntro: () => {
        skipper.toggleSkipIntro();
        hud.show(
          skipper.isSkipEnabled(),
          skipper.isSkipIntroEnabled(),
          skipper.isSkipEndingEnabled()
        );
      },
      toggleSkipEnding: () => {
        skipper.toggleSkipEnding();
        hud.show(
          skipper.isSkipEnabled(),
          skipper.isSkipIntroEnabled(),
          skipper.isSkipEndingEnabled()
        );
      },
      clickNextEpisode: () => {
        skipper.clickNextEpisode();
      }
    });
    shortcuts.init();
    skipper.observe();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
//# sourceMappingURL=userscript.user.js.map
