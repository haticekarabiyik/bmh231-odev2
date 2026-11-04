
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
(async () => {
  console.log("4");
  await null;
  console.log("5");
})();
console.log("6");
