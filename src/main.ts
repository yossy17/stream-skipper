import { IntroEndingSkipper } from "./core/skipper";
import { ShortcutManager } from "./core/shortcuts";
import { createHUD } from "./ui/hud";
import { FullscreenHandler } from "./core/fullscreenHandler";

function init() {
  const skipper = new IntroEndingSkipper();
  const hud = createHUD();
  const fullscreenHandler = new FullscreenHandler();

  // UI要素をフルスクリーンハンドラに登録
  fullscreenHandler.register(hud.getElement());
  fullscreenHandler.init();

  // ショートカット設定
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
    },
  });
  shortcuts.init();

  // 監視開始
  skipper.observe();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
