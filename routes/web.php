<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect('/merchant/dashboard');
});

Route::prefix('merchant')->group(function () {
    Route::get('/signin', function () {
        return view('welcome');
    });
    Route::get('/signup', function () {
        return view('welcome');
    });

    Route::get('/dashboard', function () {
        return view('welcome');
    });

    Route::get('/category', function () {
        return view('welcome');
    });
    Route::get('/category/create', function () {
        return view('welcome');
    });
    Route::get('/category/edit/{id}', function () {
        return view('welcome');
    });

    Route::get('/product', function () {
        return view('welcome');
    });
    Route::get('/product/create', function () {
        return view('welcome');
    });
    Route::get('/product/edit/{id}', function () {
        return view('welcome');
    });
});
