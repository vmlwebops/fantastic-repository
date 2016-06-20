interface res {
  left: number,
  top: number,
}
// returns this element's overall offset on the page
export function GetOffsetFromPage (el: HTMLElement): res  {
  let left = 0
  let top = 0
  let parent = el
  while (parent.offsetParent != null) {
    left += parent.offsetLeft || 0
    top += parent.offsetTop || 0
    parent = parent.offsetParent as HTMLElement
  }

  return { left, top }
}
