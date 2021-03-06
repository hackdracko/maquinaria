<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CatTurn extends Model
{
    use SoftDeletes;
    protected $table = "cat_turns";
    protected $primaryKey = "id";
    protected $fillable = [
        '*'
    ];
    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];
}
