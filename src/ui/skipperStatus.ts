import { showWithFade } from "./utils";

const createSkipperStatus = (): HTMLDivElement => {
  const container = document.createElement("div");
  container.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    transform: scale(0.5);
    background: rgba(0, 128, 0, 0.75);
    backdrop-filter: blur(10px) saturate(180%);
    color: #fff;
    padding: 12px 24px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 25px;
    z-index: calc(infinity);
    opacity: 0;
    transition: opacity 0.3s ease-out, transform 0.3s ease-out;
    border: 2px solid #fff;
    `;
  return container;
};

const updateContent = (element: HTMLElement, enabled: boolean): void => {
  element.textContent = enabled ? "Skip: ON" : "Skip: OFF";
  element.style.background = enabled
    ? "rgba(0, 128, 0, 0.75)"
    : "rgba(255, 0, 0, 0.75)";
};

export const createSkipperHud = () => {
  const element = createSkipperStatus();
  document.body.appendChild(element);

  const update = (enabled: boolean): void => {
    updateContent(element, enabled);
  };

  const show = (enabled: boolean): void => {
    updateContent(element, enabled);
    showWithFade(element);
  };

  const getElement = (): HTMLElement => element;

  return { update, show, getElement };
};
