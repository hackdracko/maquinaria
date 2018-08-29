<?php

namespace App\Http\Controllers;

use App\Stock;
use App\User;
use Illuminate\Http\Request;

class StockController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
            'delivery_person' => 'required|min:3|max:100',
            'lote' => 'required',
            'quantity' => 'required',
            'unit_id' => 'required',
            'type_id' => 'required',
            'observation' => 'required|min:3|max:250',
            'type' => 'required'
        ]);

        $machine = new Stock();
        $machine->user_id = $request->user()->id;
        $machine->delivery_person = $request->get('delivery_person');
        $machine->lote = $request->get('lote');
        $machine->quantity = $request->get('quantity');
        $machine->unit_id = $request->get('unit_id');
        $machine->type_id = $request->get('type_id');
        $machine->observation = $request->get('observation');
        $machine->type = $request->get('type');
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function entries()
    {
        $stocks = Stock::with('user', 'unit', 'type')
            ->where(['type' => 1])->paginate(10);
        return response()->json($stocks);
    }
}
