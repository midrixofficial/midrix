<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('/signup', [AuthController::class, 'signup']);
    Route::post('/signin', [AuthController::class, 'signin']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/signout', [AuthController::class, 'signout']);
        Route::get('/me', [AuthController::class, 'me']);
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/categories/reorder', [CategoryController::class, 'reorder']);
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('products', ProductController::class);
});
