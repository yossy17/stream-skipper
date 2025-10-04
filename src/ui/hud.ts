const createHud = (): HTMLDivElement => {
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

const createTitle = (): HTMLElement => {
  const title = document.createElement("p");
  title.textContent = "HUD";
  title.style.cssText = `
    margin: 0 0 8px 0;
    text-align: center;
  `;
  return title;
};

// スタータス表示ボタン
const createStatus = (label: string, enabled: boolean): HTMLElement => {
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
    background: ${enabled ? "#4ade80" : "#f87171"};
    cursor: default;
    user-select: none;
    transition: background-color 0.3s ease, transform 0.2s ease;
  `;
  return status;
};

const createStatusList = (
  skipperEnabled: boolean,
  skipIntroEnabled: boolean,
  skipEndingEnabled: boolean
): HTMLElement => {
  const list = document.createElement("div");
  list.style.cssText = `
    display: flex;
    flex-direction: row;
    gap: 8px;
    justify-content: center;
    align-items: center;
  `;

  const skipperStatus = createStatus("Skip", skipperEnabled);
  const introStatus = createStatus("Intro", skipIntroEnabled);
  const endingStatus = createStatus("Ending", skipEndingEnabled);

  list.append(skipperStatus, introStatus, endingStatus);
  return list;
};

export const createHUD = () => {
  const element = createHud();
  document.body.appendChild(element);

  const title = createTitle();
  const statusList = createStatusList(false, false, false); // 初期値 OFF
  element.append(title, statusList);

  const buttons = Array.from(statusList.children) as HTMLDivElement[];

  const show = (
    skipperEnabled: boolean,
    skipIntroEnabled: boolean,
    skipEndingEnabled: boolean
  ): void => {
    buttons[0].style.backgroundColor = skipperEnabled ? "#4ade80" : "#f87171";
    buttons[1].style.backgroundColor = skipIntroEnabled ? "#4ade80" : "#f87171";
    buttons[2].style.backgroundColor = skipEndingEnabled
      ? "#4ade80"
      : "#f87171";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        element.style.opacity = "1";
        element.style.transform = "scale(1)";
      });
    });

    setTimeout(() => {
      element.style.opacity = "0";
      element.style.transform = "scale(0.5)";
    }, 1000);
  };

  const getElement = (): HTMLElement => element;

  return { show, getElement };
};
