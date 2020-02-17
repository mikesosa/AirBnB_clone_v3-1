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
        console.log(res);
      } else {
        $('#api_status').removeClass('available');
      }
    });
/*
  fetch('http://0.0.0.0:5001/api/v1/places_search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: '{}'
  })
    .then(res => res.json())
    .then(res => {
      if (res.status === 'OK') {
        // $('#api_status').addClass('available');
        console.log(res);
        const title = '<ARTICLE><div class="title"><h2>';
        const price = '<div class="price_by_night">';
        const info = '<div class="information"><div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i><br />';
        const roomsNumber = '<div class="number"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />';
        const bath = '<div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />';
        const description = '<div class="description">';
        for (const place of res) {
          $('places').append(
            title + place.name + '</h2>',
            price + place.price_by_night + '</div></div>',
            info + place.max_guest + ' Guess</div>',
            roomsNumber + place.number_rooms + ' Bedrooms</div>',
            bath + place.number_bathrooms + ' Bathroom</div></div>',
            description + place.description + '</div></ARTICLE>'
          );
        }
      } else {
        console.log('Failed');
      }
    }); */
});
