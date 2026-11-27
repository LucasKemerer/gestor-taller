import { useCallback, useSyncExternalStore } from "react";

// funcion para determinar si el media query se cumple o no. Se puede usar en cualquier componente React, 
// incluso en SSR (aunque en ese caso siempre devuelve false)

// Lo usamos para determinar si abrir un modal en pc o un drawer en mobile para el alta de registros nuevos

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches, // valor en el navegador
    () => false, // valor al renderizar en el servidor (no existe window)
  );
}