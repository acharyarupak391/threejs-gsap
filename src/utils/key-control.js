const keyMaps = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

window.addEventListener("keydown", (e) => {
  if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key))
    return;

  e.preventDefault();

  keyMaps[e.key] = true;
});

window.addEventListener("keyup", (e) => {
  if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key))
    return;

  e.preventDefault();

  keyMaps[e.key] = false;
});

module.exports = {
  keyMaps,
};
