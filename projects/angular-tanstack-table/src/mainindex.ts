// import {
//   Injector,
//   computed,
//   effect,
//   inject,
//   runInInjectionContext,
//   signal,
//   untracked,
// } from '@angular/core';
// import { RowData, TableOptions, TableOptionsResolved, createTable } from '.';
// import { lazySignalInitializer } from './signal-proxy';

// export function createAngularTable<TData extends RowData>(
//   options: () => TableOptions<TData>
// ) {
//   const injector = inject(Injector);
//   // Supports required signal input (https://angular.io/errors/NG0950)
//   return lazySignalInitializer(() => {
//     return runInInjectionContext(injector, () => {
//       const resolvedOptionsSignal = computed<TableOptionsResolved<TData>>(
//         () => {
//           return {
//             state: {},
//             onStateChange: () => {},
//             renderFallbackValue: null,
//             ...options(),
//           };
//         }
//       );

//       const table = createTable(resolvedOptionsSignal());
//       const tableSignal = signal(table);
//       const state = signal(table.initialState);

//       function updateOptions() {
//         const tableState = state();
//         const resolvedOptions = resolvedOptionsSignal();
//         table.setOptions((prev) => ({
//           ...prev,
//           ...resolvedOptions,
//           state: { ...tableState, ...resolvedOptions.state },
//           onStateChange: (updater) => {
//             if (updater instanceof Function) {
//               state.update(updater);
//             } else {
//               state.set(updater);
//             }
//           },
//         }));

//         // Spreading this otherwise signal with default `equals` will not trigger on state change
//         // Another solution could be using `equal: () => false` on `lazySignalInitializer` and `tableSignal`
//         untracked(() => tableSignal.set({ ...table }));
//       }

//       updateOptions();

//       // Currently I'm using this to avoid updating options twice the first time.
//       let skipUpdate = true;
//       effect(() => {
//         void [state(), resolvedOptionsSignal()];
//         if (skipUpdate) {
//           skipUpdate = false;
//           return;
//         }
//         untracked(() => updateOptions());
//       });

//       return table;
//     });
//   });
// }
