import { createSignal } from "solid-js";

export interface Signal<T> {
	v: T;
}
export function signal<T>(): Signal<T | undefined>;
export function signal<T>(value: T): Signal<T>;
export function signal<T>(value?: T): Signal<T | undefined> {
	const [getter, setter] = createSignal<T>(value as T);

	return {
		get v() {
			return getter();
		},
		set v(value: T) {
			setter(() => value);
		},
	};
}
