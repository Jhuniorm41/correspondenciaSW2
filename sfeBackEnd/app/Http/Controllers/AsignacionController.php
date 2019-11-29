<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Asignacion;

class AsignacionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $asignaciones = Asignacion::all();
        return $asignaciones;
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
        $asignaciones = new Asignacion();
        $asignaciones->fechaasignacion = $request->fechaasignacion;
        $asignaciones->fechalimite = $request->fechalimite;
        $asignaciones->descripcion = $request->descripcion;
        $asignaciones->estado = $request->estado;
        $asignaciones->idasignador = $request->idasignador;
        $asignaciones->idasignado = $request->idasignado;
        $asignaciones->idcorrespondencia = $request->idcorrespondencia;
        $asignaciones->idetapa = $request->idetapa;
        $asignaciones->save();
        return $asignaciones;
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
        $asignaciones = Asignacion::find($id);
        $asignaciones->fechaasignacion = $request->fechaasignacion;
        $asignaciones->fechalimite = $request->fechalimite;
        $asignaciones->descripcion = $request->descripcion;
        $asignaciones->estado = $request->estado;
        $asignaciones->idasignador = $request->idasignador;
        $asignaciones->idasignado = $request->idasignado;
        $asignaciones->idcorrespondencia = $request->idcorrespondencia;
        $asignaciones->idetapa = $request->idetapa;
        $asignaciones->update();
        return $asignaciones;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Asignacion::find($id)->delete();
        return 'ok';
    }
}
