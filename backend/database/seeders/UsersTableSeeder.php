<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Amr',
            'email' => 'amr@example.com',
            'password' => bcrypt('amr@example'),
        ]);
    }
}
