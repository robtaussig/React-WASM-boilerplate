import React from 'react';
import { useLoadWasm, useWasm, WASM_READY_STATE } from './useWasm';

const TestComponent = () => {
  const { wasm, readyState } = useWasm();

  return (
    <div>
      <button onClick={wasm.greet}>Click</button>
    </div>
  );
};

const App = () => {
  const [WasmProvider, wasmObject] = useLoadWasm();

  return (
    <WasmProvider value={wasmObject}>
      <div id="App">
        {wasmObject.readyState === WASM_READY_STATE.READY && <TestComponent/>}
      </div>
    </WasmProvider>
  );
};

export default App;
