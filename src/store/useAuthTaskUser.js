import { create } from "zustand";

const useTaskUserAuth = create((set) => ({
  task: [],
  addingTask: (task) => set((state) => ({ task: [...state.task, task] })),
  getTask: (task) => set({ task }),
  deleteTask: (id) =>
    set((state) => ({ task: state.task.filter((x) => x.id !== id) })),
  editTask: (id, task) =>
    set((state) => ({
      task: state.task.map((x) => (x.id === id ? { ...x, task: task } : x)),
    })),
  changeIsClearTask: (id) =>
    set((state) => ({
      task: state.task.map((x) => (x.id === id ? { ...x, isClear: true } : x)),
    })),
  clearTaskIfTrue: () =>
    set((state) => ({
      task: state.task.filter((x) => x.isClear === false),
    })),
}));

export default useTaskUserAuth;
