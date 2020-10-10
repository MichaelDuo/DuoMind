export function findTopicId(el: HTMLElement | null) {
	let curr: HTMLElement | null = el;
	while (curr) {
		if (curr.classList.contains('topic')) {
			return curr.id;
		}
		curr = curr.parentElement;
	}
	return null;
}

export function getOffset(el: HTMLElement, ref?: HTMLElement) {
	let offsetTop = 0;
	let offsetLeft = 0;
	while (el != ref) {
		if (!isNaN(el.offsetLeft)) {
			offsetLeft += el.offsetLeft;
			offsetTop += el.offsetTop;
		}
		el = el.offsetParent as HTMLElement;
	}
	return {top: offsetTop, left: offsetLeft};
}
