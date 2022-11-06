export function setActiveTodosLocal(item: string) {
  localStorage.setItem("activeTask", item);
};
export function getActiveTodosLocal() {
  return localStorage.getItem("activeTask");
};

export function setCompleteTodosLocal(item: string) {
  localStorage.setItem("compliteTask", item);
};
export function getCompliteTodosLocal() {
  return localStorage.getItem("compliteTask");
};