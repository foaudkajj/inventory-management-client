export const translateItems = <T extends { name: string }>(items: T[], t) => {
  return items.map((item) => {
    t(item.name);
    return item;
  });
};
