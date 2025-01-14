<template>
    <div>
      <h1 class="text-2xl font-bold mb-4">Edit Meeting</h1>
  
      <form @submit.prevent="updateMeeting">
        <div class="mb-4">
          <label for="meeting_with" class="block text-sm font-medium text-gray-700">With</label>
          <input type="text" v-model="meeting.meeting_with" id="meeting_with" class="mt-1 block w-full p-2 border border-gray-300 rounded" required />
        </div>
        <div class="mb-4">
          <label for="meeting_date" class="block text-sm font-medium text-gray-700">Date</label>
          <input type="datetime-local" v-model="meeting.meeting_date" id="meeting_date" class="mt-1 block w-full p-2 border border-gray-300 rounded" required />
        </div>
        <button type="submit" class="bg-[#142562]  text-white p-2 rounded">Update Meeting</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EditMeeting',
    data() {
      return {
        meeting: {
          id: null,
          meeting_with: '',
          meeting_date: ''
        }
      };
    },
    mounted() {
      this.fetchMeeting();
    },
    methods: {
      fetchMeeting() {
        const meetingId = this.$route.params.id;
        fetch(`http://127.0.0.1:8000/api/meetings/${meetingId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
          .then(response => response.json())
          .then(data => {
            this.meeting = data;
          })
          .catch(error => {
            console.error('Error fetching meeting:', error);
          });
      },
  
      updateMeeting() {
        fetch(`http://127.0.0.1:8000/api/meetings/${this.meeting.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            meeting_with: this.meeting.meeting_with,
            meeting_date: this.meeting.meeting_date
          })
        })
          .then(response => response.json())
          .then(() => {
            this.$router.push('/'); 
          })
          .catch(error => {
            console.error('Error updating meeting:', error);
          });
      }
    }
  };
  </script>
  