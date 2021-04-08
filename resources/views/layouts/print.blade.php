<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <title>{{ config('app.name', 'Laravel') }}</title>

  <!-- Scripts -->
  <script src="{{ asset('js/app.js') }}" defer></script>

  <!-- Fonts -->
  <link rel="dns-prefetch" href="//fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

  <!-- Styles -->
  <link href="{{ asset('css/app.css') }}" rel="stylesheet">

  <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>

  <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
    integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
    crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
    integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
    crossorigin="anonymous"></script>

  <style type="text/css">
    p {
      text-indent: 2rem
    }

    .error {
      color: red
    }

    .listItem {
      text-indent: 2rem
    }

    .firstCell {
      border-bottom-style: none !important;
    }

    .lastCell {
      border-top-style: none !important;
    }

    .innerCell {
      border-bottom-style: none !important;
      border-top-style: none !important;
    }

    @media print {
      .pageBreak {
        page-break-after: always;
      }
    }

    ol {
      list-style: none;
      counter-reset: item;
    }

    ol {
      padding-left: 0;
    }

    ol ol ol {
      padding-left: 2rem;
    }

    ol>li {
      display: block;
    }

    ol>li::before {
      content: counters(item, ".") ". ";
      counter-increment: item
    }

    ol.mainList >li {
      padding-top: 1.5rem;
      text-align: center;
      font-weight: bold;
    }

    ol ol>li {
      padding-top: 0;
      text-align: left;
      font-weight: normal;
    }
  </style>
</head>

<body>
  <div id="app">
    <main class="py-2">
      @yield('content')
    </main>
  </div>
  <script type="text/javascript">
    $(document).ready(function () {
      $("p").each(function (i) {
        $(this).attr("id", `p${i}`);
      });
      $("p").on('dblclick', function () {
        let edit_field = $(`<textarea class="w-100 border-0" rows="5" data="elastic"></textarea>`);
        const id_number = $(this).attr("id").slice(1);
        edit_field.attr("id", `edit${id_number}`);
        edit_field.text($(this).text());
        const elem_height = parseInt($(this).css('height'), 10);
        edit_field.css({
          'height': `${elem_height + 50}px`,
          'overflow': 'hidden',
          'background-color': '#f2e2df'
        });
        edit_field.insertAfter(this);
        $(this).hide();
        $(document).mouseup(backdrop($(this).attr("id"), edit_field.attr("id")));
      })
    });

    function backdrop(sourceid, editid) { // событие клика по веб-документу
      return function (e) {
        const source = $('#' + sourceid)
        const div = $('#' + editid);
        if (!div.is(e.target)) // если клик был не по нашему блоку
        {
          source.text(div.val());
          div.hide(); // скрываем его
          source.show();
        }
      }
    }
  </script>
</body>

</html>