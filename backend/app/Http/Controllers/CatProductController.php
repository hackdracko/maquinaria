<?php

namespace App\Http\Controllers;

use App\CatProduct;
use Illuminate\Http\Request;

class CatProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = CatProduct::paginate(20);
        return response()->json($products);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => 'required|min:3|max:50',
            'description' => 'required|min:3|',
            'cat_model_id' => 'required|integer|'
        ]);

        $product = new CatProduct();
        $product->title = $request->get('title');
        $product->description = $request->get('description');
        $product->cat_model_id = $request->get('cat_model_id');
        $product->save();
        return response()->json($product);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\CatProduct  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'title' => 'required|min:3|max:50',
            'description' => 'required|min:3|',
            'cat_model_id' => 'required|integer|'
        ]);

        $product = CatProduct::findOrFail($id);
        $product->title = $request->get('title');
        $product->description = $request->get('description');
        $product->cat_model_id = $request->get('cat_model_id');
        $product->save();
        return response()->json($product);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = CatProduct::findOrFail($id);
        return response()->json($product->delete());
    }
}
