# @poly-state/react

## 4.0.0

### Patch Changes

- [#26](https://github.com/poly-state/poly-state/pull/26) [`52d8540`](https://github.com/poly-state/poly-state/commit/52d8540d405b77d4ddb94d1daba396038c2de4c0) Thanks [@shahriar-shojib](https://github.com/shahriar-shojib)! - ## @poly-state/core:

  - Global transactions support

  ```js
  import { transact } from "@poly-state/core";

  transact(() => {
    store1.setState({ count: 1 });
    store2.setState({ name: test });
    store2.setState({ address: "London" });
  });
  ```

  > store 1 and store 2 will be updated only once!

  ## @poly-state/react:

  - fixed a peer dependency issue for react
  - use `useSyncExternalStore`
  - use `shallowCompare`
  - upgrade packages and bundling

- Updated dependencies [[`52d8540`](https://github.com/poly-state/poly-state/commit/52d8540d405b77d4ddb94d1daba396038c2de4c0), [`218ed5d`](https://github.com/poly-state/poly-state/commit/218ed5d0c2942b287bf4e2cf6b63b9bccfeb328c)]:
  - @poly-state/core@1.4.0

## 4.0.0-next.0

### Patch Changes

- [#26](https://github.com/poly-state/poly-state/pull/26) [`52d8540`](https://github.com/poly-state/poly-state/commit/52d8540d405b77d4ddb94d1daba396038c2de4c0) Thanks [@shahriar-shojib](https://github.com/shahriar-shojib)! - ## @poly-state/core:

  - Global transactions support

  ```js
  import { transact } from "@poly-state/core";

  transact(() => {
    store1.setState({ count: 1 });
    store2.setState({ name: test });
    store2.setState({ address: "London" });
  });
  ```

  > store 1 and store 2 will be updated only once!

  ## @poly-state/react:

  - fixed a peer dependency issue for react
  - use `useSyncExternalStore`
  - use `shallowCompare`
  - upgrade packages and bundling

- Updated dependencies [[`52d8540`](https://github.com/poly-state/poly-state/commit/52d8540d405b77d4ddb94d1daba396038c2de4c0)]:
  - @poly-state/core@1.4.0-next.0

## 3.0.0

### Minor Changes

- [#23](https://github.com/poly-state/poly-state/pull/23) [`a2f2dad`](https://github.com/poly-state/poly-state/commit/a2f2dad8dc8ba10e452502f60f5d5d36daaf3f99) Thanks [@shahriar-shojib](https://github.com/shahriar-shojib)! - @poly-state/core

  - updated dependencies
  - added keywords on package.json
  - performance improvements

  @poly-state/react

  - updated dependencies
  - added keywords on package.json
  - [BREAKING] any updater function now must return a new object, not mutate the previous one, mutating the previous one will cause unexpected behavior

  @poly-state/preact

  - updated dependencies
  - added keywords on package.json

### Patch Changes

- Updated dependencies [[`a2f2dad`](https://github.com/poly-state/poly-state/commit/a2f2dad8dc8ba10e452502f60f5d5d36daaf3f99)]:
  - @poly-state/core@1.3.0

## 2.1.0

### Minor Changes

- [#21](https://github.com/poly-state/poly-state/pull/21) [`5979802`](https://github.com/poly-state/poly-state/commit/597980215fffb8018aa251f54f9046f6b40c1d5e) Thanks [@shahriar-shojib](https://github.com/shahriar-shojib)! - added tests for re render tracking
  move to tsup.config.ts instead of passing the arguments to cli

## 2.0.0

### Minor Changes

- [#19](https://github.com/poly-state/poly-state/pull/19) [`e660ebd`](https://github.com/poly-state/poly-state/commit/e660ebd2ba07ed41ffed6b02156180daffcbb336) Thanks [@shahriar-shojib](https://github.com/shahriar-shojib)! - @poly-state/core removed unnecessary depencencies

### Patch Changes

- Updated dependencies [[`e660ebd`](https://github.com/poly-state/poly-state/commit/e660ebd2ba07ed41ffed6b02156180daffcbb336)]:
  - @poly-state/core@1.2.0
