import { computed, signal, untracked } from '@angular/core';
import {
  RowData,
  TableOptions,
  TableOptionsResolved,
  createTable,
} from '@tanstack/table-core';

export * from '@tanstack/table-core';
export * from './flexrender.directive';

export function createAngularTable<TData extends RowData>(
  options: TableOptions<TData>
) {
  // Compose in the generic options to the user options
  const resolvedOptionsSignal = computed<TableOptionsResolved<TData>>(() => {
    return {
      state: {}, //Dummy state
      onStateChange: () => {}, //noop
      renderFallbackValue: null,
      ...options,
    };
  });

  const table = computed(() => createTable(untracked(resolvedOptionsSignal)));
  const state = signal(untracked(table).initialState);

  // Compose the default state above with any user state.
  table().setOptions((prev: any) => {
    return {
      ...prev,
      ...options,
      state: {
        ...state(),
        ...resolvedOptionsSignal().state,
      },
      onStateChange: (updater) => {
        if (updater instanceof Function) {
          state.update(updater);
        } else {
          state.set(updater);
        }
        options.onStateChange?.(updater);
      },
    };
  });

  return table();
}
