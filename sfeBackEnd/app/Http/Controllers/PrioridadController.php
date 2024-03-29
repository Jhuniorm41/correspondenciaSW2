<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Prioridad;

class PrioridadController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $prioridades = Prioridad::all();
        return $prioridades;
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
        $prioridad = new Prioridad();
        $prioridad->frecuencia = $request->frecuencia;
        $prioridad->cantdias = $request->cantdias;
        $prioridad->nombre = $request->nombre;
        $prioridad->save();
        return $prioridad;
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
        $prioridad = Prioridad::find($id);
        $prioridad->frecuencia = $request->frecuencia;
        $prioridad->cantdias = $request->cantdias;
        $prioridad->nombre = $request->nombre;
        $prioridad->update();
        return $prioridad;
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
}
