<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Meeting;
use Illuminate\Http\Request;

class MeetingController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'meeting_with' => 'required|string|max:255',
            'meeting_date' => 'required|date',
            'description' => 'nullable|string',
        ]);

        $meeting = Meeting::create($validated);

        return response()->json($meeting, 201); 
    }

    public function index()
    {
        $meetings = Meeting::all();
        return response()->json($meetings);
    }
    public function completeMeeting($id)
{
    $meeting = Meeting::findOrFail($id);

    if ($meeting->completed) {
        return response()->json(['message' => 'Meeting already completed'], 400);
    }

    $meeting->completed = true;
    $meeting->save();

    return response()->json($meeting);
}
public function destroy($id)
{
    $meeting = Meeting::find($id);

    if (!$meeting) {
        return response()->json(['message' => 'Meeting not found'], 404);
    }

    $meeting->delete();

    return response()->json(['message' => 'Meeting deleted successfully']);
}
public function update(Request $request, $id)
{
    $meeting = Meeting::find($id);

    if (!$meeting) {
        return response()->json(['message' => 'Meeting not found'], 404);
    }

    $meeting->meeting_with = $request->input('meeting_with');
    $meeting->meeting_date = $request->input('meeting_date');
    $meeting->save();

    return response()->json(['message' => 'Meeting updated successfully']);
}

}
