// Document-space top of an element in a stack of consecutive in-flow siblings,
// ignoring `position: sticky` (which moves getBoundingClientRect while stuck).
// Cumulative height of the earlier siblings from the parent's top.
export function layoutTop(el: HTMLElement): number {
  const parent = el.parentElement;
  if (!parent) return 0;
  let top = parent.getBoundingClientRect().top + window.scrollY;
  for (let s = parent.firstElementChild; s && s !== el; s = s.nextElementSibling) {
    top += s.getBoundingClientRect().height;
  }
  return top;
}
