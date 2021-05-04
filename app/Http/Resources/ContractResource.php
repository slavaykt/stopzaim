<?php

namespace App\Http\Resources;

use App\Models\ContractPayment;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Log;

class ContractResource extends JsonResource
{
  private function paymentsCopy()
  {
    $payments = [];
    $today = Carbon::now();
    try {
      foreach ($this->payments->sortBy('Дата') as $payment) {
        if (!isset($currDate)) {
          $currDate = $today;
          $paymentDate = Carbon::parse($payment['Дата']);
        } else {
          $diffInMonth = Carbon::parse($payment['Дата'])->DiffInMonths($paymentDate);
          $year = $currDate->month === 12 ? $currDate->year + 1 : $currDate->year;
          $month = $currDate->month + $diffInMonth;
          if ($month > 12) {
            $month -= 12;
          }
          $day = min($today->day, cal_days_in_month(CAL_GREGORIAN, $month, $year));
          $currDate = Carbon::createFromDate($year, $month, $day);
          $paymentDate = Carbon::parse($payment['Дата']);
        }
        $p = [];
        $p['id'] = null;
        $p['Дата'] = $currDate->format('Y-m-d');
        $p['Сумма'] = $payment['Сумма'];
        $payments[] = $p;
      }
    } catch (\Throwable $th) {
      logger($th->getMessage());
    }

    return $payments;
  }

  public function toArray($request)
  {
    return [
      'id' => $request->copy ? null : $this->id,
      'Дата' => $request->copy ? Carbon::now()->format('Y-m-d\TH:i') : Carbon::parse($this->Дата)->format('Y-m-d\TH:i'),
      'Номер' => $request->copy ? 0 : $this->Номер,
      'Клиент' => $this->client,
      'Сумма' => $this->Сумма,
      'Комментарий' => $this->Комментарий,
      'ВидДокумента' => 'Договор',
      'ГрафикПлатежей' => $request->copy ? $this->paymentsCopy() : ContractPaymentResource::collection($this->payments->sortBy('Дата')),
      'registered' => $request->copy ? 0 : $this->registered,
      'schema' => [
        'ГрафикПлатежей' => new ContractPaymentResource(new ContractPayment),
      ],
    ];
  }
}
