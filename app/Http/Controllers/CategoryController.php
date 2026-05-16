<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    public function index()
    {
        $query = Category::query();

        if (Schema::hasColumn('categories', 'order_by')) {
            $query->orderBy('order_by');
        }

        return $query->orderBy('id')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'merchant_id' => 'nullable|integer|min:1',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
        ]);

        if (Schema::hasColumn('categories', 'merchant_id')) {
            $validated['merchant_id'] = $request->integer('merchant_id') ?: null;
        } else {
            unset($validated['merchant_id']);
        }

        if (Schema::hasColumn('categories', 'order_by')) {
            $validated['order_by'] = (Category::max('order_by') ?? 0) + 1;
        }

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('categories', 'public');
        }

        return Category::create($validated);
    }

    public function show(Category $category)
    {
        return $category;
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'merchant_id' => 'nullable|integer|min:1',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
        ]);

        if (Schema::hasColumn('categories', 'merchant_id')) {
            $validated['merchant_id'] = $request->integer('merchant_id') ?: $category->merchant_id;
        } else {
            unset($validated['merchant_id']);
        }

        if ($request->hasFile('image')) {
            if ($category->image) {
                Storage::disk('public')->delete($category->image);
            }
            $validated['image'] = $request->file('image')->store('categories', 'public');
        }

        $category->update($validated);

        return $category;
    }

    public function destroy(Category $category)
    {
        if ($category->image) {
            Storage::disk('public')->delete($category->image);
        }
        $category->delete();

        return response()->noContent();
    }

    public function reorder(Request $request)
    {
        if (!Schema::hasColumn('categories', 'order_by')) {
            return response()->json([
                'message' => 'order_by column missing. Please run migrations first.',
            ], 422);
        }

        $validated = $request->validate([
            'categories' => 'required|array|min:1',
            'categories.*.id' => 'required|exists:categories,id',
            'categories.*.order_by' => 'required|integer|min:1',
        ]);

        DB::transaction(function () use ($validated) {
            foreach ($validated['categories'] as $item) {
                Category::where('id', $item['id'])->update(['order_by' => $item['order_by']]);
            }
        });

        return response()->json(['message' => 'Category order updated successfully.']);
    }
}
