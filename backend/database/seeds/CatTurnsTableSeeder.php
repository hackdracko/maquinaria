<?php

use Illuminate\Database\Seeder;

class CatTurnsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('cat_turns')->insert([
            'title' => str_random(10),
            'description' => str_random(10),
        ]);
        DB::table('cat_turns')->insert([
            'title' => str_random(10),
            'description' => str_random(10),
        ]);
        DB::table('cat_turns')->insert([
            'title' => str_random(10),
            'description' => str_random(10),
        ]);
    }
}
