<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Stock extends Model
{
    use SoftDeletes;
    protected $table = "stock";
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
    /**
     * Get the User
     */
    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }
    /**
     * Get the Unit
     */
    public function unit()
    {
        return $this->belongsTo('App\CatUnit', 'unit_id');
    }
    /**
     * Get the Type
     */
    public function type()
    {
        return $this->belongsTo('App\CatType', 'type_id');
    }
}
