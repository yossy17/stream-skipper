export const showWithFade = (element: HTMLElement): void => {
  element.style.display = "block";
  element.style.transform = "scale(0.9)";

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      element.style.opacity = "1";
      element.style.transform = "scale(1)";
    });
  });

  setTimeout(() => {
    element.style.opacity = "0";
    element.style.transform = "scale(0.8)";
  }, 1000);
};
