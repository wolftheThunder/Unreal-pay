<template>
    <div class="mx-[14px] sm:mx-[20px] md:mx-[40px]">
      <h1 class="text-2xl font-bold mb-[14px] sm:mb-[20px] md:mb-[24px]">Loan List</h1>
  
      <router-link to="/loan-form" class="bg-[#142562] text-white p-[10px] rounded mb-[14px] inline-block hover:bg-[#0f1f44]">Create New Loan</router-link>
  
      <table v-if="loans.length" class="min-w-full bg-white shadow-md rounded-lg mb-[20px]">
        <thead>
          <tr class="bg-[#c3c5c9]">
            <th class="py-[12px] px-[16px] text-left">Borrower</th>
            <th class="py-[12px] px-[16px] text-left">Amount</th>
            <th class="py-[12px] px-[16px] text-left">Loan Date</th>
            <th class="py-[12px] px-[16px] text-left">Due Date</th>
            <th class="py-[12px] px-[16px] text-left">Status</th>
            <th class="py-[12px] px-[16px] text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="loan in loans" :key="loan.id" class="even:bg-[#d3d1d1]">
            <td class="py-[12px] px-[16px]">{{ loan.borrower_name }}</td>
            <td class="py-[12px] px-[16px]">{{ loan.amount }}</td>
            <td class="py-[12px] px-[16px]">{{ loan.loan_date }}</td>
            <td class="py-[12px] px-[16px]">{{ loan.due_date }}</td>
            <td class="py-[12px] px-[16px]">{{ loan.status }}</td>
            <td class="py-[12px] px-[16px]">
              <router-link :to="'/loan-form/' + loan.id" class="bg-yellow-600 text-white p-[10px] rounded mx-[10px] hover:bg-yellow-400">Edit</router-link>
              <button @click="deleteLoan(loan.id)" class="bg-red-600 text-white p-[10px] rounded hover:bg-red-500">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <p v-if="loans.length === 0" class="text-center text-gray-600">No loans available</p>
    </div>
  </template>
  
  <script>
  export default {
    name: "LoanList",
    data() {
      return {
        loans: [],
      };
    },
    mounted() {
      this.fetchLoans();
    },
    methods: {
      fetchLoans() {
        fetch("http://127.0.0.1:8000/api/loans")
          .then((response) => response.json())
          .then((data) => {
            this.loans = data;
          })
          .catch((error) => {
            console.error("Error fetching loans:", error);
          });
      },
      deleteLoan(id) {
        fetch(`http://127.0.0.1:8000/api/loans/${id}`, {
          method: "DELETE",
        })
          .then(() => {
            this.fetchLoans(); 
          })
          .catch((error) => {
            console.error("Error deleting loan:", error);
          });
      },
    },
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
  
  tr:nth-child(odd) {
    background-color: white; 
  }
  </style>
  