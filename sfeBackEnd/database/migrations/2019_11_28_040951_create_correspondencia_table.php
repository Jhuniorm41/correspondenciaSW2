<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCorrespondenciaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('correspondencia', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('cite');
            $table->string('fecharegistro');
            $table->string('tipo');
            $table->string('estado');
            $table->string('asunto');
            $table->bigInteger('idprioridad')->unsigned()->nullable();
            $table->bigInteger('idempresa')->unsigned()->nullable();
            $table->timestamps();

            $table->foreign('idprioridad')->references('id')->on('prioridad')->delete('cascade');
            $table->foreign('idempresa')->references('id')->on('empresa')->delete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('correspondencia');
    }
}
