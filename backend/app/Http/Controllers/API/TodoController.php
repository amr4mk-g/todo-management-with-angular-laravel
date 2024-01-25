<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendMail;
use App\Models\Todo;
use App\Models\User;

class TodoController extends Controller
{
    public function getAll()
    {
        $todos = Todo::all();
        $todos = $todos->makeHidden(['created_at', 'updated_at']);
        return response()->json(['todos' => $todos], 200);
    }

    public function getTodo($id)
    {
        $todo = Todo::find($id);
        if (!$todo) {
            return response()->json(['message' => 'Todo not found'], 404);
        }
        $todo = $todo->makeHidden(['created_at', 'updated_at']);
        return response()->json(['todo' => $todo], 200);
    }

    public function createTodo(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'status' => 'required|in:OPEN,PROGRESS,TESTING,DONE'
        ]);

        $user = User::find(auth()->id());
        if (!$user) return response()->json(['message' => 'User not found'], 404);

        $todo = $user->todos()->create([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'status' => $request->input('status'),
            'user_id' => auth()->id(),
        ]);
        return response()->json(['todo' => $todo], 201);
    }

    public function updateTodo(Request $request, $id)
    {
        $todo = Todo::find($id);
        if (!$todo) {
            return response()->json(['error' => 'Todo not found'], 404);
        }

        $request->validate([
            'title' => 'string',
            'description' => 'string',
            'status' => 'in:OPEN,PROGRESS,TESTING,DONE'
        ]);
        $todo->update($request->all());
        return response()->json(['todo' => $todo], 201);
    }

    public function deleteTodo($id)
    {
        $todo = Todo::find($id);
        if (!$todo) {
            return response()->json(['error' => 'Todo not found'], 404);
        }

        $todo->delete();
        return response()->json(['message' => 'Todo deleted successfully'], 200);
    }

    public function sendEmail()
    {
        $details = [
            'title' => '',
            'body' => ''
        ];
        Mail::to(auth()->email)->send(new SendMail($details));

        return response()->json(['message' => 'Email sent successfully'], 200);
    }
}
