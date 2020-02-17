$(document).ready(function () {
  $('.amenities input').change(function () {
    const id = [];
    const name = [];
    $('.amenities input:checked').each(function () {
      id.push($(this).attr('data-id'));
      name.push($(this).attr('data-name'));
    });
    $('.amenities H4').text(name);
  });

  fetch('http://0.0.0.0:5001/api/v1/status/')
    .then(res => res.json())
    .then(res => {
      if (res.status === 'OK') {
        $('#api_status').addClass('available');
        // console.log(res);
      } else {
        $('#api_status').removeClass('available');
      }
    });

  fetch('http://0.0.0.0:5001/api/v1/places_search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: '{}'
  })
    .then(res => res.json())
    .then(res => {
      // console.log(res)
      if (res) {
        // $('#api_status').addClass('available');
        // console.log(res);
        const title = '<ARTICLE><div class="title"><h2>';
        const price = '<div class="price_by_night">';
        const info = '<div class="information"><div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i><br />';
        const roomsNumber = '<div class="number"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />';
        const bath = '<div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />';
        const description = '<div class="description">';
        for (const place of res) {
          $('.places').append(
            title + place.name + '</h2>' +
            price + place.price_by_night + '</div></div>' +
            info + place.max_guest + ' Guess</div>' +
            roomsNumber + place.number_rooms + ' Bedrooms</div>' +
            bath + place.number_bathrooms + ' Bathroom</div></div>' +
            description + place.description + '</div></ARTICLE>'
          );
        }
      } else {
        console.log('Failed');
      }
    });

  let urlApi = 'http://0.0.0.0:5001/api/v1/places_search';
  let dict = {}
  // Here we get all the checked amenities and store them in dict
  $('input[type=checkbox]').click(function () {
    console.log(this);
    if (this.checked) {
      dict[$(this).data('id')] = $(this).data('name');
      console.log("entra");
    } else {
      delete dict[$(this).data('id')];
      if (dict.length === 0) {
        $('.amenities h4').text('&nbsp;');
      }
    }
    $('.amenities h4').text(Object.values(dict));
  });

  // Here we just simply send a request with the dict data
  $('button').click(function () {
    // let x = JSON.stringify({ 'amenities': Object.keys(dict)})
    // console.log(x)
    $('SECTION.places article').remove();
    $.ajax({ url: urlApi,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ 'amenities': Object.keys(dict)}),
      success: function (data) {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          let place = data[i];
          // console.log(data[i]);
          $('.places').append('<article><div class="title"><h2>' +
            place.name + '</h2><div class="price_by_night">' +
            place.price_by_night +
            '</div></div><div class="information"><div class="max_guest">' +
            '<i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' +
            place.max_guest + 'Guests </div><div class="number_rooms">' +
            '<i class="fa fa-bed fa-3x" aria-hidden="true"></i> <br/>' +
            place.number_rooms + 'Bedrooms </div> <div class="number_bathrooms">' +
            '<i class="fa fa-bath fa-3x" aria-hidden="true"></i><br/>' +
            place.number_bathrooms + 'Bathroom </div></div>' +
            '<div class="user"></div>' +
            '<div class="description">' +
            place.description + '</div></article>'
          );
        }
        if (data.length === 0) {
          $('.places').append('<article>2 SPECIFIC. NO RESULTS</article>');
        }
      }
    });
  });

});
