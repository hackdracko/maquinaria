<?php

namespace App\Http\Controllers;

use App\CatMachine;
use Illuminate\Http\Request;

class CatMachineController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $machines = CatMachine::paginate(20);
        return response()->json($machines);
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

        $machine = new CatMachine();
        $machine->title = $request->get('title');
        $machine->description = $request->get('description');
        $machine->save();
        return response()->json($machine);
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

        $catMachine = CatMachine::findOrFail($id);
        $catMachine->title = $request->get('title');
        $catMachine->description = $request->get('description');
        $catMachine->save();
        return response()->json($catMachine);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $catMachine = CatMachine::findOrFail($id);
        return response()->json($catMachine->delete());
    }
}
