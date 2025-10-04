// ストレージキー定義
export const GM_SKIP_INTRO_KEY = "skip_intro_enabled";
export const GM_SKIP_ENDING_KEY = "skip_ending_enabled";
export const GM_SKIP_KEY = "skip_enabled";

export interface SkipSettings {
  skipIntroEnabled: boolean;
  skipEndingEnabled: boolean;
  skipEnabled: boolean;
}

export const defaultSkipSettings: SkipSettings = {
  skipIntroEnabled: true,
  skipEndingEnabled: true,
  skipEnabled: true,
};

export class SkipStorage {
  // イントロスキップ設定の保存・読み込み
  static getSkipIntroEnabled(): boolean {
    return GM_getValue(GM_SKIP_INTRO_KEY, true);
  }

  static saveSkipIntroEnabled(enabled: boolean): void {
    GM_setValue(GM_SKIP_INTRO_KEY, enabled);
  }

  // エンディングスキップ設定の保存・読み込み
  static getSkipEndingEnabled(): boolean {
    return GM_getValue(GM_SKIP_ENDING_KEY, true);
  }

  static saveSkipEndingEnabled(enabled: boolean): void {
    GM_setValue(GM_SKIP_ENDING_KEY, enabled);
  }

  // スキップ有効設定の保存・読み込み
  static getSkipEnabled(): boolean {
    return GM_getValue(GM_SKIP_KEY, true);
  }

  static saveSkipEnabled(enabled: boolean): void {
    GM_setValue(GM_SKIP_KEY, enabled);
  }
}
