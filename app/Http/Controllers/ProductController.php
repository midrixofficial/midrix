<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index()
    {
        return Product::with('category')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
        ]);

        $validated['slug'] = Str::slug($validated['name']) . '-' . time();

        return Product::create($validated);
    }

    public function show(Product $product)
    {
        return $product->load('category');
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
        ]);

        if ($validated['name'] !== $product->name) {
            $validated['slug'] = Str::slug($validated['name']) . '-' . time();
        }

        $product->update($validated);

        return $product;
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return response()->noContent();
    }
}
