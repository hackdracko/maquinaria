<?php

use Illuminate\Database\Seeder;

class CatProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('cat_products')->insert([
            'title' => str_random(10),
            'description' => str_random(10),
            'cat_model_id' => 1,
        ]);
        DB::table('cat_products')->insert([
            'title' => str_random(10),
            'description' => str_random(10),
            'cat_model_id' => 1,
        ]);
        DB::table('cat_products')->insert([
            'title' => str_random(10),
            'description' => str_random(10),
            'cat_model_id' => 1,
        ]);
    }
}
