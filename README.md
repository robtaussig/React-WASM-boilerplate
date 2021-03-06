A large portion of this boilerplate was built at the guidance of this article: https://prestonrichey.com/blog/react-rust-wasm/

## Getting Started

#### Clone Repo
```
git clone https://github.com/robtaussig/React-WASM-boilerplate

cd React-WASM-boilerplate
```

#### Install npm dependencies
```
npm install
```

#### Setup Rust
This can take a while and might appear to have hung if none of the dependencies have been installed to your machine before.
```
npm run setup-rust
```

#### Build initial WASM files
```
npm run build-wasm
```

#### Link WASM files
```
npm run link-wasm
```

#### Start app
```
npm start
```

## Writing Rust code
With the code below, wasm.greet will be available in javascript. All changes must be compiled with `npm run build-wasm` before reflecting in the client.

```
//wasm/src/lib

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("👋 from Wasm");
}
```

## Using from Javascript
The wasm object to be used must be fetched and compiled asyncronously, and thus is not immediately available at runtime. With a basic custom hook, and using React's context API, we build the wasm object at the parent component level, and pass it down via context. It is advisable to defer rendering children until it is ready.

```
import React from 'react';
import { useWasm, useLoadedWasm, WASM_READY_STATE } from './useWasm';

const App = () => {
  const [WasmProvider, wasmObject] = useWasm();

  return (
    <WasmProvider value={wasmObject}>
      <div id="App">
        {wasmObject.readyState === WASM_READY_STATE.READY && <TestComponent/>}
      </div>
    </WasmProvider>
  );
};

const TestComponent = () => {
  const { wasm, readyState } = useLoadedWasm();

  return (
    <div>
      <button onClick={wasm.greet}>Click</button>
    </div>
  );
};

```
## Developing
Changes to your javascript code will hot-reload your app if it's running -- otherwise they will be built at the `npm start` command. Changes to your Rust code must be compiled to wasm before they are accessible to the client. This must be done manually with `npm run build-wasm`.