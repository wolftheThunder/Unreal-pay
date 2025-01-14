<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Meetings</h1>

    <router-link to="/meeting-form" class="bg-[#142562]  text-white p-2 rounded mb-4 inline-block">Schedule New Meeting</router-link>

    <h2 class="text-xl font-semibold mb-2">Scheduled Meetings</h2>
    <table v-if="scheduledMeetings.length" class="min-w-full bg-white shadow-md rounded-lg mb-8">
      <thead>
        <tr>
          <th class="py-3 px-6 text-left">With</th>
          <th class="py-3 px-6 text-left">Date</th>
          <th class="py-3 px-6 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="meeting in scheduledMeetings" :key="meeting.id">
          <td class="py-3 px-6">{{ meeting.meeting_with }}</td>
          <td class="py-3 px-6">{{ new Date(meeting.meeting_date).toLocaleString() }}</td>
          <td class="py-3 px-6">
            <button @click="completeMeeting(meeting.id)" v-if="!meeting.completed" class="bg-green-600 text-white p-2 rounded mx-2">Complete</button>
            
            <button @click="deleteMeeting(meeting.id)" class="bg-red-600 text-white p-2 rounded mx-2">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-if="scheduledMeetings.length === 0" class="text-center text-gray-500">No scheduled meetings</p>

   
    <h2 class="text-xl font-semibold mb-2">Completed Meetings</h2>
    <table v-if="completedMeetings.length" class="min-w-full bg-white shadow-md rounded-lg">
      <thead>
        <tr>
          <th class="py-3 px-6 text-left">With</th>
          <th class="py-3 px-6 text-left">Date</th>
          <th class="py-3 px-6 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="meeting in completedMeetings" :key="meeting.id">
          <td class="py-3 px-6">{{ meeting.meeting_with }}</td>
          <td class="py-3 px-6">{{ new Date(meeting.meeting_date).toLocaleString() }}</td>
          <td class="py-3 px-6">
            <button @click="deleteMeeting(meeting.id)" class="bg-red-600 text-white p-2 rounded mx-2">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-if="completedMeetings.length === 0" class="text-center text-gray-500">No completed meetings</p>
  </div>
</template>

<script>
export default {
  name: "TudoMeetings",
  data() {
    return {
      scheduledMeetings: [],
      completedMeetings: []
    };
  },
  mounted() {
    this.fetchMeetings();
  },
  methods: {
    fetchMeetings() {
      fetch('http://127.0.0.1:8000/api/meetings', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`  
        }
      })
        .then(response => response.json())
        .then(data => {
          this.scheduledMeetings = data.filter(meeting => !meeting.completed);
          this.completedMeetings = data.filter(meeting => meeting.completed);
        })
        .catch(error => {
          console.error('Error fetching meetings:', error);
        });
    },

    completeMeeting(id) {
      fetch(`http://127.0.0.1:8000/api/meetings/${id}/complete`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => response.json())
        .then(() => {
          this.fetchMeetings(); 
        })
        .catch(error => {
          console.error('Error completing meeting:', error);
        });
    },

    deleteMeeting(id) {
      fetch(`http://127.0.0.1:8000/api/meetings/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.message === 'Meeting deleted successfully') {
            this.fetchMeetings();
          } else {
            console.error(data.message); 
          }
        })
        .catch(error => {
          console.error('Error deleting meeting:', error);
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

button {
  cursor: pointer;
}

button:hover {
  opacity: 0.9;  
}

td {
  text-align: center; 
}
</style>
