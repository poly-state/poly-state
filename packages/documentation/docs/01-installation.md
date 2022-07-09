---
id: installation
title: Installation
slug: /installation
sidebar_label: Installation
---

# Installation

To install the stable version:

#### npm

```shell
npm install @poly-state/poly-state
```

#### yarn

```shell
yarn add @poly-state/poly-state
```

## Requirements

- You'll need to have Node >= 14 and npm >= 6 on your machine
- Familiarity with ReactJS ecosystem

## How does it work?

The createStore function takes your initial state and returns an instance of Internal Store class and creating setter methods for each of your properties.

By using the setter methods you can change your state's values.

Using the useStore hook subscribes to the updates of your state and every time the internal state is changed, the value returned by the useStore hook is also updated, which in turn updates the UI.

There is no need to wrap your components with a provider like other state management libraries since the useStore hooks relies on Effect caused by the state updates and cleans up itself on unmount.

> This library is at beta stage and API's are subject to change, use at your own risk
