<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/merchant/{any?}', function () {
    return view('welcome');
})->where('any', '.*');

Route::get('/deploy-panel', function () {
    return view('deploy');
});

Route::post('/deploy', function () {
    $output = shell_exec('cd ' . base_path() . ' && git pull 2>&1 && npm i 2>&1 && npm run build 2>&1');
    return response()->json([
        'status' => 'Deployment executed',
        'output' => $output
    ]);
});
