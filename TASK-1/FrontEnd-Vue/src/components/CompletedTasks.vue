<template>
    <div>
      <h1 class="text-2xl font-bold mb-4">To Do List</h1>
      <router-link to="/task-form" class="bg-[#142562]  text-white p-2 rounded mb-4 inline-block">Add New Task</router-link>
      
      <table v-if="activeTasks.length" class="min-w-full bg-white shadow-md rounded-lg mb-8">
        <thead>
          <tr>
            <th class="py-3 px-6 text-left">Task</th>
            <th class="py-3 px-6 text-left">Description</th>
            <th class="py-3 px-6 text-left">Status</th>
            <th class="py-3 px-6 text-left">Priority</th>
            <th class="py-3 px-6 text-left">Due Date</th>
            <th class="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="todo in activeTasks" :key="todo.id">
            <td class="py-3 px-6">{{ todo.task }}</td>
            <td class="py-3 px-6">{{ todo.description }}</td>
            <td class="py-3 px-6">{{ todo.status }}</td>
            <td class="py-3 px-6">{{ todo.priority }}</td>
            <td class="py-3 px-6">{{ new Date(todo.due_date).toLocaleDateString() }}</td>
            <td class="py-3 px-6">
              <button @click="completeTask(todo.id)" v-if="todo.status !== 'completed'" class="bg-green-500 text-white p-2 rounded mx-2">Complete</button>
              <router-link :to="'/edit/' + todo.id" class="bg-yellow-500 text-white p-2 mx-2 rounded">Edit</router-link>
              <button @click="deleteTask(todo.id)" class="bg-red-500 text-white p-2 rounded mx-2">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <p v-if="activeTasks.length === 0" class="text-center text-gray-500">No tasks found</p>
  
      <h1 class="text-2xl font-bold mb-4">Completed Tasks</h1>
  
      <table v-if="completedTasks.length" class="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th class="py-3 px-6 text-left">Task</th>
            <th class="py-3 px-6 text-left">Description</th>
            <th class="py-3 px-6 text-left">Status</th>
            <th class="py-3 px-6 text-left">Priority</th>
            <th class="py-3 px-6 text-left">Due Date</th>
            <th class="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="todo in completedTasks" :key="todo.id">
            <td class="py-3 px-6">{{ todo.task }}</td>
            <td class="py-3 px-6">{{ todo.description }}</td>
            <td class="py-3 px-6">{{ todo.status }}</td>
            <td class="py-3 px-6">{{ todo.priority }}</td>
            <td class="py-3 px-6">{{ new Date(todo.due_date).toLocaleDateString() }}</td>
            <td class="py-3 px-6">
              <router-link :to="'/todo/edit/' + todo.id" class="bg-yellow-600 text-white p-2 mx-2 rounded">Edit</router-link>
              <button @click="deleteTask(todo.id)" class="bg-red-600 text-white p-2 rounded mx-2">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <p v-if="completedTasks.length === 0" class="text-center text-gray-500">No completed tasks found</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeTasks: [], 
        completedTasks: []
      };
    },
    mounted() {
      this.fetchTasks();
    },
    methods: {
      fetchTasks() {
        fetch('http://127.0.0.1:8000/api/tasks?status=pending')  
          .then(response => response.json())
          .then(data => {
            this.activeTasks = data;
          })
          .catch(error => {
            console.error('Error fetching active tasks:', error);
          });
  
        fetch('http://127.0.0.1:8000/api/tasks?status=completed')  
          .then(response => response.json())
          .then(data => {
            this.completedTasks = data;
          })
          .catch(error => {
            console.error('Error fetching completed tasks:', error);
          });
      },
  
      completeTask(taskId) {
        fetch(`http://127.0.0.1:8000/api/tasks/${taskId}/complete`, { method: 'PUT' })
          .then(response => response.json())
          .then(updatedTask => {
            const index = this.activeTasks.findIndex(todo => todo.id === taskId);
            if (index !== -1) {
              this.activeTasks.splice(index, 1); 
              this.completedTasks.push(updatedTask); 
            }
          })
          .catch(error => {
            console.error('Error completing task:', error);
          });
      },
  
      deleteTask(taskId) {
        fetch(`http://127.0.0.1:8000/api/tasks/${taskId}`, { method: 'DELETE' })
          .then(() => {
            this.activeTasks = this.activeTasks.filter(todo => todo.id !== taskId);
            this.completedTasks = this.completedTasks.filter(todo => todo.id !== taskId);
          })
          .catch(error => {
            console.error('Error deleting task:', error);
          });
      }
    }
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 14px;
    text-align: left;
  }
  
  th {
    background-color: rgb(195, 197, 201);
  }
  
  tr:nth-child(even) {
    background-color: #d3d1d1;
  }
  </style>
  