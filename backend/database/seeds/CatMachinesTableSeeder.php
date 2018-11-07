<?php

use Illuminate\Database\Seeder;

class CatMachinesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('cat_machines')->insert([
            'title' => "Maquina 1",
            'description' => "Maquina 1",
        ]);
        DB::table('cat_machines')->insert([
            'title' => "Maquina 2",
            'description' => "Maquina 2",
        ]);
        DB::table('cat_machines')->insert([
            'title' => "Maquina 3",
            'description' => "Maquina 3",
        ]);
    }
}
