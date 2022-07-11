# Contributing

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## We Develop with Github

We use github to host code, to track issues and feature requests, as well as accept pull requests.

## We Use [Github Flow](https://docs.github.com/en/get-started/quickstart/github-flow), So All Code Changes Happen Through Pull Requests

Pull requests are the best way to propose changes to the codebase (we use [Github Flow](https://docs.github.com/en/get-started/quickstart/github-flow)). We actively welcome your pull requests:

1. Fork the repo and create your branch from `master`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Any contributions you make will be under the MIT Software License

In short, when you submit code changes, your submissions are understood to be under the same [MIT License](https://github.com/poly-state/poly-state/blob/master/LICENSE) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report bugs using Github's [issues](https://github.com/poly-state/poly-state/issues)

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/poly-state/poly-state/issues/new); it's that easy!

## Development with a Consistent Coding Style

Fork, then clone the repo:

```sh
git clone https://github.com/poly-state/poly-state.git
```

### Building

#### Building Redux

Running the `build` task will create a CommonJS module-per-module build, a ES Modules build and a UMD build.

```sh
npm run build
```

### Testing and Linting

To only run linting:

```sh
npm run lint
```

To only run tests:

```sh
npm run test
```

To continuously watch and run tests, run the following:

```sh
npm run test:watch
```

After you have submitted your pull request, we'll try to get back to you as soon as possible. We may suggest some changes or improvements.

## Docs

Improvements to the documentation are always welcome. You can find them in the [`docs`](https://github.com/poly-state/poly-state.github.io) repo. We use [Docusaurus](https://docusaurus.io/) to build our documentation website. The website is published automatically whenever the `master` branch is updated.

Thank you for contributing!
