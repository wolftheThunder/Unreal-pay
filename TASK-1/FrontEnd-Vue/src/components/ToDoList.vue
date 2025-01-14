<template>
    <div class="mx-[14px] sm:mx-[20px] md:mx-[40px]">
      <h1 class="text-2xl font-bold mb-[14px] sm:mb-[20px] md:mb-[24px]">To Do List</h1>
  
      <router-link to="/task-form" class="bg-[#142562] text-white p-[10px] rounded mb-[14px] inline-block hover:bg-[#0f1f44]">Add New Task</router-link>
  
      <table v-if="todos.length" class="min-w-full bg-white shadow-md rounded-lg mb-[20px]">
        <thead>
          <tr>
            <th class="py-[12px] px-[16px] text-left">Task</th>
            <th class="py-[12px] px-[16px] text-left">Description</th>
            <th class="py-[12px] px-[16px] text-left">Status</th>
            <th class="py-[12px] px-[16px] text-left">Priority</th>
            <th class="py-[12px] px-[16px] text-left">Due Date</th>
            <th class="py-[12px] px-[16px] text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="todo in filteredTodos" :key="todo.id">
            <td class="py-[12px] px-[16px]">{{ todo.task }}</td>
            <td class="py-[12px] px-[16px]">{{ todo.description }}</td>
            <td class="py-[12px] px-[16px]">{{ todo.status }}</td>
            <td class="py-[12px] px-[16px]">{{ todo.priority }}</td>
            <td class="py-[12px] px-[16px]">{{ new Date(todo.due_date).toLocaleDateString() }}</td>
            <td class="py-[12px] px-[16px]">
              <button @click="completeTask(todo.id)" v-if="todo.status !== 'completed'" class="bg-green-600 text-white p-[10px] rounded hover:bg-green-500">Complete</button>
              <router-link :to="'/todo/edit/' + todo.id" class="bg-yellow-500 text-white p-[10px] mx-[10px] rounded hover:bg-yellow-400">Edit</router-link>
              <button @click="deleteTask(todo.id)" class="bg-red-600 text-white p-[10px] rounded hover:bg-red-500">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <p v-if="todos.length === 0" class="text-center text-gray-600">No tasks found</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        todos: [], 
      };
    },
    mounted() {
      this.fetchTodos();
    },
    
    computed: {
      filteredTodos() {
        return this.todos.filter(todo => todo.status !== 'completed');
      }
    },
    methods: {
      fetchTodos() {
        fetch('http://127.0.0.1:8000/api/tasks') 
          .then(response => response.json())
          .then(data => {
            this.todos = data;
          })
          .catch(error => {
            console.error('Error fetching tasks:', error);
          });
      },
  
      completeTask(taskId) {
        fetch(`http://127.0.0.1:8000/api/tasks/${taskId}/complete`, { method: 'PUT' })
          .then(response => response.json())
          .then(updatedTask => {
            const index = this.todos.findIndex(todo => todo.id === taskId);
            if (index !== -1) {
              this.todos[index] = updatedTask; 
            }
          })
          .catch(error => {
            console.error('Error completing task:', error);
          });
      },
  
      deleteTask(taskId) {
        fetch(`http://127.0.0.1:8000/api/tasks/${taskId}`, { method: 'DELETE' })
          .then(() => {
            this.todos = this.todos.filter(todo => todo.id !== taskId); // Remove task from list
          })
          .catch(error => {
            console.error('Error deleting task:', error);
          });
      },
  
      editTask(taskId) {
        this.$router.push({ name: 'task-form', params: { id: taskId } });
      }
    }
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th,
  td {
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
  