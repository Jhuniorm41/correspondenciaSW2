<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Personal;

class PersonalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $personales = Personal::all();
        return $personales;
        /*return response()->json([
            'personales' => $personales
        ]);*/
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // no usar
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $personal = new Personal();
        $personal->ci = $request->ci;
        $personal->nombre = $request->nombre;
        $personal->telefono = $request->telefono;
        $personal->correo = $request->correo;
        $personal->cargo = $request->cargo;
        $personal->area = $request->area;
        $personal->save();
        return $personal;
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // no usar
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        // no usar
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
        $personal = Personal::find($id);
        $personal->ci = $request->ci;
        $personal->nombre = $request->nombre;
        $personal->telefono = $request->telefono;
        $personal->correo = $request->correo;
        $personal->cargo = $request->cargo;
        $personal->area = $request->area;
        $personal->update();

        return $personal;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Personal::find($id)->delete();
        return 'ok';
    }
}
