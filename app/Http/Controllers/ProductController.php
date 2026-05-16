<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        return Product::with('category')->orderByDesc('id')->get();
    }

    public function store(Request $request)
    {
        $validated = $this->validatePayload($request);
        $prepared = $this->preparePayload($request, $validated);

        return Product::create($prepared);
    }

    public function show(Product $product)
    {
        return $product->load('category');
    }

    public function update(Request $request, Product $product)
    {
        $validated = $this->validatePayload($request);
        $prepared = $this->preparePayload($request, $validated, $product);

        $product->update($prepared);

        return $product->fresh()->load('category');
    }

    public function destroy(Product $product)
    {
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        if (is_array($product->gallery)) {
            foreach ($product->gallery as $file) {
                Storage::disk('public')->delete($file);
            }
        }

        $product->delete();

        return response()->noContent();
    }

    private function validatePayload(Request $request): array
    {
        return $request->validate([
            'merchant_id' => 'nullable|integer|min:1',
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'short_description' => 'nullable|string|max:500',
            'sku' => 'nullable|string|max:120',
            'type' => 'required|string|max:120',
            'unit' => 'required|string|max:120',
            'weight' => 'nullable|numeric|min:0',
            'quantity_value' => 'nullable|numeric|min:0',
            'quantity_unit' => 'nullable|string|max:50',
            'price' => 'required|numeric|min:0',
            'discount_price' => 'nullable|numeric|min:0',
            'cost_price' => 'nullable|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
            'min_stock_alert' => 'nullable|integer|min:0',
            'track_stock' => 'nullable|boolean',
            'is_available' => 'nullable|boolean',
            'is_featured' => 'nullable|boolean',
            'image' => 'nullable|image|max:2048',
            'gallery' => 'nullable|array',
            'gallery.*' => 'image|max:2048',
            'tags' => 'nullable|string',
        ]);
    }

    private function preparePayload(Request $request, array $validated, ?Product $product = null): array
    {
        $columns = Schema::getColumnListing('products');
        $prepared = [];

        foreach ($validated as $key => $value) {
            if (in_array($key, $columns, true)) {
                $prepared[$key] = $value;
            }
        }

        $prepared['track_stock'] = $request->boolean('track_stock', true);
        $prepared['is_available'] = $request->boolean('is_available', true);
        $prepared['is_featured'] = $request->boolean('is_featured', false);

        if (!in_array('merchant_id', $columns, true)) {
            unset($prepared['merchant_id']);
        }

        if ($request->hasFile('image') && in_array('image', $columns, true)) {
            if ($product?->image) {
                Storage::disk('public')->delete($product->image);
            }
            $prepared['image'] = $request->file('image')->store('products', 'public');
        }

        if ($request->hasFile('gallery') && in_array('gallery', $columns, true)) {
            if (is_array($product?->gallery)) {
                foreach ($product->gallery as $oldGallery) {
                    Storage::disk('public')->delete($oldGallery);
                }
            }

            $galleryPaths = [];
            foreach ((array) $request->file('gallery') as $file) {
                $galleryPaths[] = $file->store('products/gallery', 'public');
            }
            $prepared['gallery'] = $galleryPaths;
        }

        if (in_array('stock', $columns, true) && isset($prepared['stock_quantity'])) {
            $prepared['stock'] = $prepared['stock_quantity'];
        }

        return $prepared;
    }
}
