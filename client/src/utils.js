export function onEnter(func) {
  return (e) => { if (e.key === 'Enter') func(); };
}
