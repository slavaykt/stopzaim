<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class onRegisterSaving
{
  use Dispatchable, InteractsWithSockets, SerializesModels;

  public $startDate;

  public $model;

  public $data;

  public function __construct($startDate, $model, $data)
  {
    $this->startDate = $startDate;
    $this->model = $model;
    $this->data = $data;
  }

  public function broadcastOn()
  {
    return new PrivateChannel('channel-name');
  }
}
