<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Auth routes
Route::namespace('App\Http\Controllers\Api')
    ->group(function () {
        Route::post('/signup', 'AuthController@signup');
        Route::post('/login', 'AuthController@login');
        Route::post('/forget', 'AuthController@forget');
        Route::post('/reset', 'AuthController@reset');
    });

// Todo routes  
Route::middleware(['auth:sanctum', 'verify'])
    ->namespace('App\Http\Controllers\Api')
    ->group(function () {
        Route::get('/logout', 'AuthController@logout');
        Route::get('/user', 'UserController@getUser');
        Route::post('/user', 'UserController@updateUser');
        Route::get('/user/todos', 'UserController@getUserTodos');
        Route::get('/todo', 'TodoController@getTodo');
        Route::post('/todo', 'TodoController@createTodo');
        Route::post('/todoEd/{id}', 'TodoController@updateTodo');
        Route::post('/todoDel/{id}', 'TodoController@deleteTodo');
        Route::get('/email', 'TodoController@sendEmail');
    });
