const createContext = [
  () => {
    (this as unknown as any).context = {};
  },
];

export default createContext;
