import { SkipStorage } from "../storage";

interface ButtonConfig {
  type: "single" | "multi";
  delay: number;
  selector: string;
  offSelector?: string;
}

interface ServiceConfig {
  intro: ButtonConfig;
  ending: ButtonConfig;
  nextEpisode: {
    selector: string;
  };
}

export class IntroEndingSkipper {
  private skipIntroEnabled: boolean;
  private skipEndingEnabled: boolean;
  private skipEnabled: boolean;
  private buttonSelectors: Record<string, ServiceConfig>;

  constructor() {
    this.skipIntroEnabled = SkipStorage.getSkipIntroEnabled();
    this.skipEndingEnabled = SkipStorage.getSkipEndingEnabled();
    this.skipEnabled = SkipStorage.getSkipEnabled();

    this.buttonSelectors = {
      primeVideo: {
        intro: {
          type: "single",
          delay: 5000,
          selector:
            "button.fqye4e3.f1ly7q5u.fk9c3ap.fz9ydgy.f1xrlb00.f1hy0e6n.fgbpje3.f1uteees.f1h2a8xb.atvwebplayersdk-skipelement-button.fjgzbz9.fiqc9rt.fg426ew.f1ekwadg",
        },
        ending: {
          type: "multi",
          delay: 500,
          selector:
            "div.atvwebplayersdk-nextupcard-button.fixbm5z.f1nog967.fobx3y5",
          offSelector:
            "div.fxviu8c > button.atvwebplayersdk-nextupcardhide-button",
        },
        nextEpisode: {
          selector: "button.atvwebplayersdk-nexttitle-button",
        },
      },
      netflix: {
        intro: {
          type: "single",
          delay: 0,
          selector: "button.watch-video--skip-content-button",
        },
        ending: {
          type: "multi",
          delay: 0,
          selector: "button[data-uia='next-episode-seamless-button']",
          offSelector: "button[data-uia='watch-credits-seamless-button']",
        },
        nextEpisode: {
          selector: "button[data-uia='control-next']",
        },
      },
    };
  }

  // イントロをスキップ
  skipIntro(): void {
    if (!this.skipEnabled || !this.skipIntroEnabled) return;

    for (const service in this.buttonSelectors) {
      const { selector, delay } = this.buttonSelectors[service].intro;
      const introButton = document.querySelector(selector);

      if (introButton) {
        setTimeout(() => {
          (introButton as HTMLElement).click();
          console.log(`Intro skipped for ${service}`);
        }, delay);
        break;
      }
    }
  }

  // エンディングをスキップ
  skipEnding(): void {
    for (const service in this.buttonSelectors) {
      const { selector, offSelector, delay } =
        this.buttonSelectors[service].ending;

      if (this.skipEnabled && this.skipEndingEnabled) {
        const endingButton = document.querySelector(selector);
        if (endingButton) {
          setTimeout(() => {
            (endingButton as HTMLElement).click();
            console.log(`Ending skipped for ${service}`);
          }, delay);
        }
      } else if (offSelector) {
        // グローバル OFF または Ending OFF のときは「クレジットを見る」ボタンを優先
        const offButton = document.querySelector(offSelector);
        if (offButton) {
          setTimeout(() => {
            (offButton as HTMLElement).click();
            console.log(`Watch credits for ${service}`);
          }, delay);
        }
      }
    }
  }

  // 次のエピソードボタンをクリック
  clickNextEpisode(): void {
    for (const service in this.buttonSelectors) {
      if (this.buttonSelectors[service].nextEpisode) {
        const { selector } = this.buttonSelectors[service].nextEpisode;
        const nextButton = document.querySelector(selector);
        if (nextButton) {
          (nextButton as HTMLElement).click();
          console.log(`Next episode clicked for ${service}`);
          break;
        }
      }
    }
  }

  // スキップ機能の全体的な切り替え
  toggleSkipping(): void {
    this.skipEnabled = !this.skipEnabled;
    SkipStorage.saveSkipEnabled(this.skipEnabled);
    console.log(`Skipping is ${this.skipEnabled ? "enabled" : "disabled"}`);
  }

  // イントロスキップの切り替え
  toggleSkipIntro(): void {
    this.skipIntroEnabled = !this.skipIntroEnabled;
    SkipStorage.saveSkipIntroEnabled(this.skipIntroEnabled);
    console.log(
      `Intro Skipping is ${this.skipIntroEnabled ? "enabled" : "disabled"}`
    );
  }

  // エンディングスキップの切り替え
  toggleSkipEnding(): void {
    this.skipEndingEnabled = !this.skipEndingEnabled;
    SkipStorage.saveSkipEndingEnabled(this.skipEndingEnabled);
    console.log(
      `Ending Skipping is ${this.skipEndingEnabled ? "enabled" : "disabled"}`
    );
  }

  // DOMの変更を監視
  observe(): void {
    const observer = new MutationObserver(() => {
      if (this.skipEnabled) {
        this.skipIntro();
        this.skipEnding();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // 状態取得
  isSkipEnabled(): boolean {
    return this.skipEnabled;
  }

  isSkipIntroEnabled(): boolean {
    return this.skipIntroEnabled;
  }

  isSkipEndingEnabled(): boolean {
    return this.skipEndingEnabled;
  }
}
