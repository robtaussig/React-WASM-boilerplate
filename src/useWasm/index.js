import { createContext, useState, useContext, useEffect } from 'react';

export const WasmContext = createContext();
export const WASM_READY_STATE = {
  ERROR: -2,
  NOT_READY: 0,
  READY: 1,
};

export const useWasm = () => {
  const [wasmObject, setWasmObject] = useState({ wasm: null, readyState: WASM_READY_STATE.NOT_READY });

  useEffect(() => {
    const loadWasm = async () => {
      try {
        const wasm = await import('wasm');
        setWasmObject({ wasm, readyState: WASM_READY_STATE.READY });
      } catch(e) {
        console.error(e);
        setWasmObject({ wasm: null, readyState: WASM_READY_STATE.ERROR });
      }
    };

    loadWasm();
  }, []);

  return [WasmContext.Provider, wasmObject];
};

export const useLoadedWasm = () => {
  const { wasm, readyState } = useContext(WasmContext);

  return { wasm, readyState };
};
