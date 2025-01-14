import { createRouter, createWebHistory } from 'vue-router';
import ToDoList from './components/ToDoList.vue';
import TudoMeetings from './components/TudoMeetings.vue'; 
import LoanList from './components/LoanList.vue';
import CompletedTasks from './components/CompletedTasks.vue';
import TaskForm from './components/TaskForm.vue';
import MeetingForm from './components/MeetingForm.vue';
import EditMeeting from './components/EditMeeting.vue'; 
import LoanForm from './components/LoanForm.vue'; 

const routes = [
  { path: '/', component: ToDoList, name: 'todos' }, 
  { path: '/todos', component: ToDoList, name: 'todo-list' },
  { path: '/meetings', component: TudoMeetings, name: 'TudoMeetings' },
  { path: '/meeting-form', component: MeetingForm, name: 'meeting-form' }, 
  { path: '/loans', component: LoanList, name: 'loan-list' }, 
  { path: '/loan-form', component: LoanForm, name: 'loan-form' }, 
  { path: '/completed-tasks', component: CompletedTasks, name: 'completed-tasks' },
  { path: '/task-form', component: TaskForm, name: 'create-task' },

  {
    path: '/todo/edit/:id',
    component: TaskForm,
    name: 'edit-task',
  },

  {
    path: '/edit-meeting/:id',
    component: EditMeeting,
    name: 'edit-meeting', 
  },

  {
    path: '/loan-form/:id',
    component: LoanForm,
    name: 'edit-loan', 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
