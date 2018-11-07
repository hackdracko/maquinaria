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
            'code' => 'TW0001',
            'title' => 'Esta es la tapa 1',
            'description' => 'DJ Añejo 1',
            'cat_model_id' => 1,
        ]);
        DB::table('cat_products')->insert([
            'code' => 'TW0002',
            'title' => 'Esta es la tapa 2',
            'description' => 'DJ Añejo 2',
            'cat_model_id' => 2,
        ]);
        DB::table('cat_products')->insert([
            'code' => 'TW0003',
            'title' => 'Esta es la tapa 3',
            'description' => 'DJ Añejo 3',
            'cat_model_id' => 3,
        ]);
    }
}
