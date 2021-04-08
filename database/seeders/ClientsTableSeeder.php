<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\ClientBankAccount;
use App\Models\ClientChild;
use App\Models\ClientCreditor;
use App\Models\ClientExecutiveDocument;
use App\Models\ClientTax;
use App\Models\Company;
use Illuminate\Database\Seeder;

class ClientsTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    Client::factory()
    ->count(100)
    ->has(ClientChild::factory()->count(2),'children')
    ->has(ClientBankAccount::factory()->count(7),'bankAccounts')
    ->has(ClientCreditor::factory()->count(5),'creditors')
    ->has(ClientExecutiveDocument::factory()->count(4),'executiveDocuments')
    ->has(ClientTax::factory()->count(2),'taxes')
    ->create();
  }
}
