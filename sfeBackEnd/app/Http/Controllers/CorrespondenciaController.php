<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Correspondencia;
use Response;

class CorrespondenciaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $correspondencias = Correspondencia::all();
        return $correspondencias;
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
        $correspondencia = new Correspondencia();
        $correspondencia->cite = $request->cite;
        $correspondencia->fecharegistro = $request->fecharegistro;
        $correspondencia->tipo = $request->tipo;
        $correspondencia->estado = $request->estado;
        $correspondencia->asunto = $request->asunto;
        $correspondencia->idprioridad = $request->idprioridad;
        $correspondencia->idempresa = $request->idempresa;
        $correspondencia->url_anexo = $request->url_anexo;
        $correspondencia->save();
        return $correspondencia;
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
        $correspondencia = Correspondencia::find($id);
        $correspondencia->cite = $request->cite;
        $correspondencia->fecharegistro = $request->fecharegistro;
        $correspondencia->tipo = $request->tipo;
        $correspondencia->estado = $request->estado;
        $correspondencia->asunto = $request->asunto;
        $correspondencia->idprioridad = $request->idprioridad;
        $correspondencia->idempresa = $request->idempresa;
        $correspondencia->update();
        return $correspondencia;

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Correspondencia::find($id)->delete();
        return Response::json('{status: 200}');
    }
}
