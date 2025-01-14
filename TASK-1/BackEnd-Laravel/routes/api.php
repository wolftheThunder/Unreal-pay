<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\MeetingController;
use App\Http\Controllers\Api\LoanController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// tasks routes
Route::get('tasks', [TaskController::class, 'index']);
Route::post('tasks', [TaskController::class, 'store']);
Route::get('tasks/{id}', [TaskController::class, 'show']);
Route::put('tasks/{id}', [TaskController::class, 'update']);
Route::delete('tasks/{id}', [TaskController::class, 'destroy']);
Route::put('tasks/{id}/complete', [TaskController::class, 'complete']);

// meeting routes
Route::get('/meetings', [MeetingController::class, 'index']);
Route::post('/meetings', [MeetingController::class, 'store']);
Route::put('meetings/{id}/complete', [MeetingController::class, 'completeMeeting']);
Route::delete('meetings/{id}', [MeetingController::class, 'destroy']);
Route::put('meetings/{id}', [MeetingController::class, 'update']);


// loan routes 
Route::get('loans', [LoanController::class, 'index']); 
Route::get('loans/{id}', [LoanController::class, 'show']); 
Route::post('loans', [LoanController::class, 'store']); 
Route::put('loans/{id}', [LoanController::class, 'update']); 
Route::delete('loans/{id}', [LoanController::class, 'destroy']);
