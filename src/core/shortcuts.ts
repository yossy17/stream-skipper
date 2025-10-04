// キーバインド定義
const KEY_BINDINGS: Record<string, string> = {
  z: "toggleSkipping",
  x: "toggleSkipIntro",
  c: "toggleSkipEnding",
  n: "clickNextEpisode",
};

interface ShortcutActions {
  toggleSkipping: () => void;
  toggleSkipIntro: () => void;
  toggleSkipEnding: () => void;
  clickNextEpisode: () => void;
}

export class ShortcutManager {
  constructor(private actions: ShortcutActions) {}

  init(): void {
    document.addEventListener("keydown", (e) => {
      // 入力フィールドでは無効化
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target instanceof HTMLElement && e.target.contentEditable === "true")
      ) {
        return;
      }

      // 修飾キー使用時は無効化
      if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;

      const action = KEY_BINDINGS[e.key];
      if (!action) return;

      e.preventDefault();
      this.handleAction(action);
    });
  }

  private handleAction(action: string): void {
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
