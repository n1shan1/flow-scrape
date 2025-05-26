export async function waitFor(delay: number) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, delay);
  });
}
