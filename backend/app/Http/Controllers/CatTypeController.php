<?php

namespace App\Http\Controllers;

use App\CatType;
use Illuminate\Http\Request;

class CatTypeController extends Controller
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
        $turns = CatType::where(function($turns) use ($search)
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
            'description' => 'required|min:3|',
            'cicles' => 'required|min:3|',
            'type' => 'required'
        ]);

        $turn = new CatType();
        $turn->title = $request->get('title');
        $turn->description = $request->get('description');
        $turn->cicles = $request->get('cicles');
        $turn->type = $request->get('type');
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
        $turn = CatType::findOrFail($id);
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
            'description' => 'required|min:3|',
            'cicles' => 'required|min:3|',
            'type' => 'required'
        ]);

        $catTurn = CatType::findOrFail($id);
        $catTurn->title = $request->get('title');
        $catTurn->description = $request->get('description');
        $catTurn->cicles = $request->get('cicles');
        $catTurn->type = $request->get('type');
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
        $catTurn = CatType::findOrFail($id);
        return response()->json($catTurn->delete());
    }
    /**
     * Display combo Types.
     *
     * @return \Illuminate\Http\Response
     */
    public function comboTypes()
    {
        $types = CatType::all();
        $response = ['types' => $types];
        return response()->json($response);
    }
}
