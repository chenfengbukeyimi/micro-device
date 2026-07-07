type Item = { pid: number | null; id: number; name: string };

const list: Item[] = [
  { pid: null, id: 1, name: '1' },
  { pid: 1, id: 2, name: '2' },
  { pid: 1, id: 3, name: '3' },
  { pid: 2, id: 4, name: '4' },
  { pid: 3, id: 5, name: '5' },
  { pid: 3, id: 6, name: '6' },
  { pid: 4, id: 7, name: '7' },
  { pid: 5, id: 8, name: '8' },
  { pid: 6, id: 9, name: '9' },
  { pid: 7, id: 10, name: '10' },
];

const find = (id: number) => list.find((item) => item.id === id) ?? null;

const cc = (c: Item, p: Item) => {
  if (c.id === p.id) return;

  let pp: Item | null = p;

  while (pp) {
    if (c.id === pp.id) throw new Error('循环引用');
    if (pp.pid === null) break;
    pp = find(pp.pid);
    console.log('find: ', pp);
  }
};

// cc({ pid: 1, id: 2, name: '2' }, { pid: 7, id: 10, name: '10' });

cc({ pid: 1, id: 2, name: '2' }, { pid: 1, id: 2, name: '2' });
