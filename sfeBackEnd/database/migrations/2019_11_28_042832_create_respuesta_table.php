<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRespuestaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('respuesta', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('fecharespuesta');
            $table->string('detalle');
            $table->string('observacion');
            $table->bigInteger('idasignacion')->unsigned()->nullable();
            $table->foreign('idasignacion')->references('id')->on('asignacion')->delete('cascade');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('respuesta');
    }
}
