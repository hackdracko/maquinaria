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
            'title' => "Matutino",
            'description' => "Turno de la Mañana",
        ]);
        DB::table('cat_turns')->insert([
            'title' => "Vespertino",
            'description' => "Turno de la Tarde",
        ]);
        DB::table('cat_turns')->insert([
            'title' => "Diurno",
            'description' => "Turno de la Noche",
        ]);
    }
}
