<?php

use Illuminate\Database\Seeder;
use App\Personal;

class PersonalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = $this->personales();
        foreach ($data as $row) {
            Personal::create($row);
        }
    }

    public function personales() {
        return [
            [
                'ci' => '123123',
                'nombre' => 'juan',
                'cargo' => '1'
            ]
        ];
    }
}
