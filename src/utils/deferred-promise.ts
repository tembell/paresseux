export function deferredPromise<TResolve, TReject>() {
  let resolve: ((value: TResolve | PromiseLike<TResolve>) => void) | undefined;
  let reject: ((value?: TReject) => void) | undefined;
  const promise = new Promise<TResolve>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  if (!resolve || !reject) {
    throw new Error('FATAL: createPromise :: resolve/reject are undefined');
  }
  return { promise, resolve, reject };
}
export default deferredPromise;
