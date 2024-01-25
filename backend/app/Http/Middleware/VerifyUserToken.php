<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifyUserToken
{
    public function handle(Request $request, Closure $next)
    {
        if (!auth()->check()) return response()->json(['message' => 'Unauthenticated'], 401);
        return $next($request);
    }
}
