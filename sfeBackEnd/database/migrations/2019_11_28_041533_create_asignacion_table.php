<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAsignacionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('asignacion', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('fechaasignacion');
            $table->string('fechalimite');
            $table->string('descripcion');
            $table->string('estado');
            $table->bigInteger('idasignador')->unsigned()->nullable();
            $table->bigInteger('idasignado')->unsigned()->nullable();
            $table->bigInteger('idcorrespondencia')->unsigned()->nullable();
            $table->bigInteger('idetapa')->unsigned()->nullable();

            $table->foreign('idasignador')->references('id')->on('personal')->delete('cascade');
            $table->foreign('idasignado')->references('id')->on('personal')->delete('cascade');
            $table->foreign('idcorrespondencia')->references('id')->on('correspondencia')->delete('cascade');
            $table->foreign('idetapa')->references('id')->on('etapa')->delete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('asignacion');
    }
}
