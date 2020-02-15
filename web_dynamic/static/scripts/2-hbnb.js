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
});
