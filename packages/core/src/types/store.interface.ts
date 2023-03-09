export interface GenericStore<State> {
	getState(): State;
	subscribe(callback: (value: State) => void): () => void;
}
