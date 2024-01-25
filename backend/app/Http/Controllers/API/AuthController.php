<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
// use Illuminate\Support\Facades\DB; 
// use Illuminate\Support\Facades\Mail;
// use DB;
// use Mail;
use Carbon\Carbon;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function signup(Request $request)
    {
        $rules = [
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ];
        try {
            $this->validate($request, $rules);
        } catch (ValidationException $e) {
            return response()->json(['message' => $e->errors()], 400);
        }
        $user = User::create([
            'name' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $accessToken = $user->createToken('authToken')->plainTextToken;
        return response()->json(['token' => $accessToken], 201);
    }

    public function login(Request $request)
    {
        $rules = [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ];
        try {
            $this->validate($request, $rules);
        } catch (ValidationException $e) {
            return response()->json(['message' => $e->errors()], 400);
        }
        if (!auth()->attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid credentials'], 400);
        }

        $user = User::find(auth()->id());
        $accessToken = $user->createToken('authToken')->plainTextToken;
        return response()->json(['token' => $accessToken], 200);
    }

    // public function reset(Request $request)
    // {
    //     $rules = [
    //         'email' => 'required|string|email|exists:users',
    //         'password' => 'required|string|min:8|confirmed',
    //         'password_confirm' => 'required'
    //     ];
    //     try {
    //         $this->validate($request, $rules);
    //     } catch (ValidationException $e) {
    //         return response()->json(['message' => $e->errors()], 400);
    //     }

    //     $update = DB::table('password_resets')->where([
    //         'email' => $request->email, 'token' => $request->token
    //     ])->first();
    //     if (!$update) return response()->json(['message' => 'Invalid data'], 400);

    //     $user = User::where('email', $request->email)
    //         ->update(['password' => Hash::make($request->password)]);
    //     DB::table('password_resets')->where(['email' => $request->email])->delete();
    //     return redirect('/login')->with('message', 'Your password has been changed!');
    // }

    // public function forget(Request $request)
    // {
    //     $rules = ['email' => 'required|string|email|exists:users'];
    //     try {
    //         $this->validate($request, $rules);
    //     } catch (ValidationException $e) {
    //         return response()->json(['message' => $e->errors()], 400);
    //     }

    //     $token = Str::random(64);
    //     try {
    //         DB::table('password_reset_tokens')->insert([
    //             'email' => $request->email,
    //             'token' => $token, 'created_at' => Carbon::now()
    //         ]);
    //         Mail::send('email.forgetPassword', ['token' => $token], function ($message) use ($request) {
    //             $message->to($request->email);
    //             $message->subject('Reset Password');
    //         });
    //     } catch (ValidationException $e) {
    //         return response()->json(['message' => $e->errors()], 400);
    //     }
    //     return response()->json(['message' => 'We have e-mailed your password reset link!'], 200);
    // }

    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Logged out successfully'], 200);
    }
}
