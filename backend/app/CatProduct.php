<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CatProduct extends Model
{
    use SoftDeletes;
    protected $table = "cat_products";
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
     * Get the model that owns the Products.
     */
    public function model()
    {
        return $this->belongsTo('App\CatModel', 'cat_model_id');
    }
}
