export function setRem(baseWidth = 750){
  const dpr = window.devicePixelRatio;
  const currentWidth = document.documentElement.clientWidth || document.body.clientWidth;
  let remSize = 0,scale=0;
  scale = currentWidth/baseWidth;
  remSize = baseWidth/15;
  remSize = remSize*scale;
  document.documentElement.style.fontSize = remSize + 'px';
  document.documentElement.setAttribute('data-dpr', `${dpr}`);
}