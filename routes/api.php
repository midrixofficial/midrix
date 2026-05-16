<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/categories/reorder', [CategoryController::class, 'reorder']);
Route::apiResource('categories', CategoryController::class);
Route::apiResource('products', ProductController::class);
