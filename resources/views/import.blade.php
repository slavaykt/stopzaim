@extends('layouts.app')

@section('content')
<form action="{{route('import.upload')}}" method="post" enctype="multipart/form-data">
  {{csrf_field()}}
  <div class="form-group">
    <input class="form-control mw-25" type="file" name="exchange">
  </div>

  <button class="btn btn-primary" type="submit"> Загрузка</button>
</form>
@endsection