<?php

use Illuminate\Database\Seeder;

class CatProcessTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('cat_process')->insert([
            'title' => str_random(10),
            'description' => str_random(10),
        ]);
        DB::table('cat_process')->insert([
            'title' => str_random(10),
            'description' => str_random(10),
        ]);
        DB::table('cat_process')->insert([
            'title' => str_random(10),
            'description' => str_random(10),
        ]);
    }
}
