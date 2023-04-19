//Infinity Scroll
const menuItems = useRef(null);
const [renderItems, setRenderItems] = useState(sampleData);
const cloneItems = () => {
  const itemHeight = menuItems.current.childNodes[0].offsetHeight;
  const fit = Math.ceil(window.innerHeight / itemHeight);

  const cloned = [...renderItems]
    .filter((_, index) => index < fit)
    .map((target) => target);

  setRenderItems([...renderItems, ...cloned]);
  return cloned.length * itemHeight;
};

const getScrollPosition = () => {
  return (
    (menuItems.current.pageYoffset || menuItems.current.scrollTop) -
    (menuItems.current.clientTop || 0)
  );
};

const setScrollPosition = (pos) => {
  menuItems.current.scrollTop = pos;
};
const initialScroll = () => {
  const scrollPosition = getScrollPosition();
  if (scrollPosition <= 0) {
    setScrollPosition(1);
  }
};

const clonedHeight = cloneItems();
initialScroll();

const scrollUpdate = () => {
  const scrollPosition = getScrollPosition();
  if (clonedHeight + scrollPosition >= menuItems.current.scrollHeight) {
    setScrollPosition(1);
  } else if (scrollPosition <= 0) {
    setScrollPosition(menuItems.current.scrollHeight - clonedHeight);
  }
};
menuItems.current.addEventListener("scroll", scrollUpdate);

return () => {
  menuItems.current.removeEventListener("scroll", scrollUpdate);
};
