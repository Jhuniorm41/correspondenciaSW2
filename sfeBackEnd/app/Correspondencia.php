<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Correspondencia extends Model
{
    use softDeletes;
    protected $table = 'correspondencia';
}
