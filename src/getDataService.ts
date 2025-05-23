export function getStoreItems() {
  return getData('/data.json').then((result: any) => result.data);
}

function getData(endpoint: string) {
  const delay = (0.5 + Math.random() * 2) * 1000;
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      fetch(endpoint).then((res) => {
        resolve(res.json());
      });
    }, delay);
  });
}