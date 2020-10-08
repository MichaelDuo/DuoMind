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
