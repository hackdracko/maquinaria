<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CatModel extends Model
{
    use SoftDeletes;
    protected $table = "cat_models";
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
     * Get the product for the Product.
     */
    public function products()
    {
        return $this->hasMany('App\CatModel');
    }
}
