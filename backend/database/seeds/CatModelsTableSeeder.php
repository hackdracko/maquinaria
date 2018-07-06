<?php

use Illuminate\Database\Seeder;

class CatModelsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('cat_models')->insert([
            'title' => str_random(10),
            'description' => str_random(10),
        ]);
        DB::table('cat_models')->insert([
            'title' => str_random(10),
            'description' => str_random(10),
        ]);
        DB::table('cat_models')->insert([
            'title' => str_random(10),
            'description' => str_random(10),
        ]);
    }
}
