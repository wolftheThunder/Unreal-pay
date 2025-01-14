import { defineStore } from 'pinia';
import axios from 'axios';

export const useTaskStore = defineStore({
  id: 'task',
  state: () => ({
    tasks: [],
  }),
  actions: {
    async fetchTasks() {
      try {
        const response = await axios.get('http://localhost:8000/api/tasks');
        this.tasks = response.data;
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },
    async createTask(task) {
      try {
        const response = await axios.post('http://localhost:8000/api/tasks', task);
        this.tasks.push(response.data);
      } catch (error) {
        console.error('Error creating task:', error);
      }
    },
    async updateTask(id, task) {
      try {
        const response = await axios.put(`http://localhost:8000/api/tasks/${id}`, task);
        const index = this.tasks.findIndex((t) => t.id === id);
        if (index !== -1) {
          this.tasks[index] = response.data;
        }
      } catch (error) {
        console.error('Error updating task:', error);
      }
    },
    async deleteTask(id) {
      try {
        await axios.delete(`http://localhost:8000/api/tasks/${id}`);
        this.tasks = this.tasks.filter((task) => task.id !== id);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    },
  },
});
