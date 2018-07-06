<?php

namespace App\Http\Controllers;

use App\CatProcess;
use Illuminate\Http\Request;

class CatProcessController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $process = CatProcess::paginate(20);
        return response()->json($process);
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

        $catProcess = new CatProcess();
        $catProcess->title = $request->get('title');
        $catProcess->description = $request->get('description');
        $catProcess->save();
        return response()->json($catProcess);
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

        $catProcess = CatProcess::findOrFail($id);
        $catProcess->title = $request->get('title');
        $catProcess->description = $request->get('description');
        $catProcess->save();
        return response()->json($catProcess);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $catProcess = CatProcess::findOrFail($id);
        return response()->json($catProcess->delete());
    }
}
