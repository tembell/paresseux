# @tembell/paresseux

## 0.5.0

### Minor Changes

- React 19 Support

## 0.4.0

### Minor Changes

- bc50bf5: Fix ModalsProvider to work with server-side rendering

## 0.3.1

### Patch Changes

- 3b181e0: Fixed type for `reject`, enabling to pass nothing

## 0.3.0

### Minor Changes

- 1326eb7: Added the `reject` function to the `openModal` callback
  throwing the promise when awaiting the `openModal()` call
- 9472d72: Removed `closedOnResolve` from options

## 0.2.1

### Patch Changes

- 0175457: Updated exmaples/simple app, and README example

## 0.2.0

### Minor Changes

- 644adb1: New API for the openModal function, gets a callback function giving you the `resolve`

## 0.1.2

### Patch Changes

- Added exports to package.json

## 0.1.1

### Patch Changes

- Fixed exports for core and helpers files

## 0.1.0

### Minor Changes

- Implement the `<ModalsProvider>`.
  Implement the `useOpenModal` main hook.
  Implement the `withClose` HOC Helper.
