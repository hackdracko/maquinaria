<?php

namespace App\Http\Controllers;

use App\CatUnit;
use Illuminate\Http\Request;

class CatUnitController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if(isset($_GET['search'])){
            $search = $_GET['search'];
        }else{
            $search = '';
        }
        $turns = CatUnit::where(function($turns) use ($search)
        {
            if (!empty($search)) {
                $turns->Where('title', 'like', '%' . $search . '%');
            }
        })
            ->paginate(20);
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

        $turn = new CatUnit();
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
        $turn = CatUnit::findOrFail($id);
        return response()->json($turn);
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

        $catTurn = CatUnit::findOrFail($id);
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
        $catTurn = CatUnit::findOrFail($id);
        return response()->json($catTurn->delete());
    }
    /**
     * Display combo Units.
     *
     * @return \Illuminate\Http\Response
     */
    public function comboUnits()
    {
        $unit = CatUnit::all();
        $response = ['units' => $unit];
        return response()->json($response);
    }
}
