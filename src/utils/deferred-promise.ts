export function deferredPromise<T>() {
  let resolve: ((value: T | PromiseLike<T>) => void) | undefined;
  let reject: ((reason?: any) => void) | undefined;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  if (!resolve || !reject) {
    throw new Error('FATAL: createPromise :: resolve/reject are undefined');
  }
  return { promise, resolve, reject };
}
export default deferredPromise;
