<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Schedule a New Meeting</h1>

    <form @submit.prevent="submitForm" class="max-w-lg mx-auto bg-white p-4 rounded shadow-md">
      <div class="mb-4">
        <label for="meeting_with" class="block text-gray-700">Meeting With</label>
        <input
          type="text"
          id="meeting_with"
          v-model="meeting.meeting_with"
          class="w-full px-4 py-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div class="mb-4">
        <label for="meeting_date" class="block text-gray-700">Meeting Date</label>
        <input
          type="datetime-local"
          id="meeting_date"
          v-model="meeting.meeting_date"
          class="w-full px-4 py-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div class="mb-4">
        <label for="description" class="block text-gray-700">Description</label>
        <textarea
          id="description"
          v-model="meeting.description"
          rows="4"
          class="w-full px-4 py-2 border border-gray-300 rounded"
        ></textarea>
      </div>

      <button type="submit" class="bg-blue-500 text-white p-2 rounded">
        Save Meeting
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      meeting: {
        meeting_with: '',
        meeting_date: '',
        description: ''
      }
    };
  },
  methods: {
    submitForm() {
      fetch('http://127.0.0.1:8000/api/meetings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Authentication token
        },
        body: JSON.stringify(this.meeting)
      })
        .then(response => response.json())
        .then(data => {
          if (data.id) {
            // Redirect or show success message
            this.$router.push('/meetings'); // Redirect to meetings page after success
          } else {
            console.error('Failed to create meeting:', data);
          }
        })
        .catch(error => {
          console.error('Error scheduling meeting:', error);
        });
    }
  }
};
</script>

<style scoped>
form {
  max-width: 500px;
}
</style>
