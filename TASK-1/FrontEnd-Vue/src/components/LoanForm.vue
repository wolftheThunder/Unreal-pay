<template>
    <div class="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h1 class="text-3xl font-semibold text-center mb-6">
        {{ isEdit ? 'Edit Loan' : 'Create New Loan' }}
      </h1>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="borrower_name" class="block text-lg font-medium text-gray-700">Borrower Name</label>
          <input 
            type="text" 
            id="borrower_name" 
            v-model="loan.borrower_name" 
            class="mt-2 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
            placeholder="Enter the borrower's name"
            required 
          />
        </div>
        <div class="mb-4">
          <label for="amount" class="block text-lg font-medium text-gray-700">Amount</label>
          <input 
            type="number" 
            id="amount" 
            v-model="loan.amount" 
            class="mt-2 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
            placeholder="Enter the loan amount"
            required
          />
        </div>
        <div class="mb-4">
          <label for="loan_date" class="block text-lg font-medium text-gray-700">Loan Date</label>
          <input 
            type="date" 
            id="loan_date" 
            v-model="loan.loan_date" 
            class="mt-2 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div class="mb-4">
          <label for="due_date" class="block text-lg font-medium text-gray-700">Due Date</label>
          <input 
            type="date" 
            id="due_date" 
            v-model="loan.due_date" 
            class="mt-2 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
  
        <!-- Loan Status -->
        <div class="mb-4">
          <label for="status" class="block text-lg font-medium text-gray-700">Status</label>
          <select 
            id="status" 
            v-model="loan.status" 
            class="mt-2 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </select>
        </div>
  
        <div class="mt-6 text-center">
          <button 
            type="submit" 
            class="px-6 py-3 bg-[#142562]  text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {{ isEdit ? 'Update Loan' : 'Create Loan' }}
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: "LoanForm",
    data() {
      return {
        isEdit: false,
        loan: {
          borrower_name: "",
          amount: null,
          loan_date: "",
          due_date: "",
          status: "pending",
        },
      };
    },
    mounted() {
      const loanId = this.$route.params.id;
      if (loanId) {
        this.isEdit = true;
        this.fetchLoanData(loanId);
      }
    },
    methods: {
      fetchLoanData(id) {
        fetch(`http://127.0.0.1:8000/api/loans/${id}`)
          .then((response) => response.json())
          .then((data) => {
            this.loan = data;
          })
          .catch((error) => {
            console.error("Error fetching loan data:", error);
          });
      },
      submitForm() {
        const method = this.isEdit ? "PUT" : "POST";
        const url = this.isEdit
          ? `http://127.0.0.1:8000/api/loans/${this.$route.params.id}`
          : `http://127.0.0.1:8000/api/loans`;
  
        fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.loan),
        })
          .then((response) => response.json())
          .then(() => {
            this.$router.push("/loans");
          })
          .catch((error) => {
            console.error("Error submitting form:", error);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  