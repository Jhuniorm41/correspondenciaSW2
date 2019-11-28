<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Asignacion extends Model
{
    use softDeletes;
    protected $table = 'asignacion';
}
