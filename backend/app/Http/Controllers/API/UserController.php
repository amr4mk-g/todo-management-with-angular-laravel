<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function getAllUsers()
    {
        $users = User::all();
        $users = $users->makeHidden(['email_verified_at', 'created_at', 'updated_at']);
        return response()->json(['users' => $users], 200);
    }

    public function getUser()
    {
        $user = User::find(auth()->id());
        if (!$user) return response()->json(['message' => 'User not found, Unauthorized'], 404);

        $user = $user->makeHidden(['email_verified_at', 'created_at', 'updated_at']);
        return response()->json(['user' => $user], 200);
    }

    public function updateUser(Request $request)
    {
        $data = $request->only(['name']);
        $validator = validator($data, [
            'name' => 'nullable|string|max:255',
        ]);
        if ($validator->fails()) return response()->json(['message' => $validator->errors()], 400);

        $user = User::find(auth()->id());
        if (!$user) return response()->json(['message' => 'User not found'], 404);

        $user->update($data);
        return response()->json(['message' => 'User data updated successfully'], 200);
    }

    public function getUserTodos()
    {
        $user = User::find(auth()->id());
        if (!$user) return response()->json(['message' => 'User not found'], 404);

        $todos = $user->todos;
        return response()->json(['todos' => $todos], 200);
    }
}
