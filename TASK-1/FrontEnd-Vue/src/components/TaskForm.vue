<template>
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold text-center mb-6">{{ task.id ? 'Edit Task' : 'Create New Task' }}</h1>
      <form @submit.prevent="saveTask">
        
        <div class="mb-4">
          <label for="task" class="block text-sm font-semibold">Task</label>
          <input v-model="task.task" id="task" type="text" class="w-full p-2 border rounded mt-1" required />
        </div>
  
        <div class="mb-4">
          <label for="description" class="block text-sm font-semibold">Description</label>
          <textarea v-model="task.description" id="description" class="w-full p-2 border rounded mt-1" required></textarea>
        </div>
  
        <div class="mb-4">
          <label for="status" class="block text-sm font-semibold">Status</label>
          <select v-model="task.status" id="status" class="w-full p-2 border rounded mt-1">
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
  
        <div class="mb-4">
          <label for="priority" class="block text-sm font-semibold">Priority</label>
          <select v-model="task.priority" id="priority" class="w-full p-2 border rounded mt-1">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
  
       
        <div class="mb-4">
          <label for="due_date" class="block text-sm font-semibold">Due Date</label>
          <input v-model="task.due_date" type="date" id="due_date" class="w-full p-2 border rounded mt-1" />
        </div>
  
      
        <button type="submit" class="bg-[#142562] text-white py-2 px-4 rounded mt-4">
          {{ task.id ? 'Save Changes' : 'Create Task' }}
        </button>
      </form>
    </div>
  </template>
  
  <script>
  import { useRoute, useRouter } from 'vue-router';
  import { reactive, onMounted } from 'vue';
  
  export default {
    setup() {
      const route = useRoute();
      const router = useRouter();
  
      const task = reactive({
        id: null,
        task: '',
        description: '',
        status: 'pending',
        priority: 'low',
        due_date: '',
      });
//   alert("asdf")
     
      onMounted(() => {
        if (route.params.id) {
          fetchTask(route.params.id);
        }
      });
  
      async function fetchTask(id) {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/tasks/${id}`);
          const fetchedTask = await response.json();
          Object.assign(task, fetchedTask); 
        } catch (error) {
          console.error('Error fetching task:', error);
        }
      }
  
      async function saveTask() {
        const method = task.id ? 'PUT' : 'POST';
        const url = task.id
          ? `http://127.0.0.1:8000/api/tasks/${task.id}` 
          : 'http://127.0.0.1:8000/api/tasks'; 
  
        try {
          const response = await fetch(url, {
            method,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
          });
  
          await response.json(); 
          router.push('/'); 
        } catch (error) {
          console.error('Error saving task:', error);
        }
      }
  
      return {
        task,
        saveTask,
      };
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: 0 auto;
  }
  
  form {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  
  input, textarea, select {
    width: 100%;
    padding: 8px;
    margin-top: 6px;
  }
  </style>
  