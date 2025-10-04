export class FullscreenHandler {
  private elements: HTMLElement[] = [];

  register(...elements: HTMLElement[]): void {
    this.elements = elements;
  }

  init(): void {
    document.addEventListener("fullscreenchange", () => {
      if (document.fullscreenElement) {
        this.moveToFullscreen();
      } else {
        this.restore();
      }
    });
  }

  private moveToFullscreen(): void {
    const fullscreenElement = document.fullscreenElement;
    if (fullscreenElement) {
      this.elements.forEach((el) => fullscreenElement.appendChild(el));
    }
  }

  private restore(): void {
    this.elements.forEach((el) => document.body.appendChild(el));
  }
}
