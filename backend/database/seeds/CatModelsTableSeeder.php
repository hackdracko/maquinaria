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
            'title' => "STP22-13/CorN",
            'description' => "STP22-13/CorN",
        ]);
        DB::table('cat_models')->insert([
            'title' => "STP22-14/CorN",
            'description' => "STP22-14/CorN",
        ]);
        DB::table('cat_models')->insert([
            'title' => "STP22-15/CorN",
            'description' => "STP22-15/CorN",
        ]);
    }
}
