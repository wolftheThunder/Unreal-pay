<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Loan;
use Illuminate\Http\Request;

class LoanController extends Controller
{
    public function index()
    {
        $loans = Loan::all(); 
        return response()->json($loans, 200); 
    }

    public function store(Request $request)
    {
        
        $request->validate([
            'borrower_name' => 'required|string|max:255',
            'amount' => 'required|numeric',
            'loan_date' => 'required|date',
            'due_date' => 'required|date',
        ]);

        $loan = Loan::create([
            'borrower_name' => $request->borrower_name,
            'amount' => $request->amount,
            'loan_date' => $request->loan_date,
            'due_date' => $request->due_date,
            'status' => 'pending',  
        ]);

        return response()->json($loan, 201); 
    }

 
    public function show($id)
    {
        $loan = Loan::find($id);

        if (!$loan) {
            return response()->json(['message' => 'Loan not found'], 404); 
        }

        return response()->json($loan, 200);
    }
    

    public function update(Request $request, $id)
    {
        $loan = Loan::find($id);

        if (!$loan) {
            return response()->json(['message' => 'Loan not found'], 404); 
        }

        $request->validate([
            'borrower_name' => 'required|string|max:255',
            'amount' => 'required|numeric',
            'loan_date' => 'required|date',
            'due_date' => 'required|date',
        ]);

        $loan->update($request->all()); 

        return response()->json($loan, 200); 
    }

    public function destroy($id)
    {
     
        $loan = Loan::find($id);

        if (!$loan) {
            return response()->json(['message' => 'Loan not found'], 404); 
        }

        $loan->delete(); 

        return response()->json(['message' => 'Loan deleted successfully'], 200);
    }
}
