const STORAGE_KEY = "adoption.animals";

const delay = (ms) => new Promise(res => setTimeout(res, ms));

const readStore = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
};

const writeStore = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const seedIfEmpty = () => {
  const existing = readStore();
  if (!existing) {
    const initial = [
      { id: 2, name: "Thor", species: "Cachorro", age: 4, photoUrl: "https://images.dog.ceo/breeds/husky/n02110185_1469.jpg" }
    ];
    writeStore(initial);
  }
};

export const list = async () => {
  seedIfEmpty();
  await delay(350);
  const data = readStore() || [];
  return data;
};

export const create = async ({ name, species, age, photoUrl }) => {
  await delay(300);
  if (!name || !species) {
    const err = new Error("Nome e espécie são obrigatórios");
    err.status = 400;
    throw err;
  }
  const data = readStore() || [];
  const nextId = data.length ? Math.max(...data.map(a => a.id)) + 1 : 1;
  const created = { id: nextId, name, species, age: Number(age) || 0, photoUrl };
  writeStore([...data, created]);
  return created;
};

export const update = async ({ id, name, species, age, photoUrl }) => {
  await delay(300);
  if (!id) {
    const err = new Error("ID é obrigatório para atualizar");
    err.status = 400;
    throw err;
  }
  const data = readStore() || [];
  const exists = data.find(a => a.id === id);
  if (!exists) {
    const err = new Error("Animal não encontrado");
    err.status = 404;
    throw err;
  }
  const updated = { ...exists, name, species, age: Number(age) || 0, photoUrl };
  const next = data.map(a => (a.id === id ? updated : a));
  writeStore(next);
  return updated;
};

export const remove = async (id) => {
  await delay(250);
  const data = readStore() || [];
  const exists = data.some(a => a.id === id);
  if (!exists) {
    const err = new Error("Animal não encontrado");
    err.status = 404;
    throw err;
  }
  writeStore(data.filter(a => a.id !== id));
  return true;
};
