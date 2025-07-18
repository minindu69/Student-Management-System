//create custom delay
export const delay = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
