<?php

namespace App\Http\Controllers;

use App\CatTurn;
use Illuminate\Http\Request;

class CatTurnController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $turns = CatTurn::paginate(20);
        return response()->json($turns);
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
            'description' => 'required|min:3|'
        ]);

        $turn = new CatTurn();
        $turn->title = $request->get('title');
        $turn->description = $request->get('description');
        $turn->save();
        return response()->json($turn);
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'title' => 'required|min:3|max:50',
            'description' => 'required|min:3|'
        ]);

        $catTurn = CatTurn::findOrFail($id);
        $catTurn->title = $request->get('title');
        $catTurn->description = $request->get('description');
        $catTurn->save();
        return response()->json($catTurn);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $catTurn = CatTurn::findOrFail($id);
        return response()->json($catTurn->delete());
    }
}
