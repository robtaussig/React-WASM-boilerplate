import React from 'react';
import { useWasm, useLoadedWasm, WASM_READY_STATE } from './useWasm';

const TestComponent = () => {
  const { wasm, readyState } = useLoadedWasm();

  return (
    <div>
      <button onClick={wasm.greet}>Click</button>
    </div>
  );
};

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

export default App;
