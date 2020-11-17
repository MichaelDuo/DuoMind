export interface LayoutAble {
	getId(): string;
	getContainer(): HTMLElement;
	getNode(): HTMLElement;
	getChildrenContainer(): HTMLElement;
	getCanvas(): HTMLCanvasElement;
	getChildren(): LayoutAble[];
	setDirection?(direction: string): void;
}
