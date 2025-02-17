import ScreenSizeHandler from './ScreenSizeHandler';

const ScreenSizes = () => {
  const sm = new ScreenSizeHandler('(max-width:768px)');
  const md = new ScreenSizeHandler('(min-width:768px) and (max-width: 1024px)');
  const lg = new ScreenSizeHandler(
    '(min-width: 1024px) and (max-width: 1280px)'
  );
  const xlg = new ScreenSizeHandler('(min-width: 1280px)');

  return {
    sm: sm.match,
    md: md.match,
    lg: lg.match,
    xlg: xlg.match,
  };
};

export default ScreenSizes;
