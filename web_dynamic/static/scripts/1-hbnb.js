$(document).ready(function () {
  $('.amenities input').change(function () {
    const id = [];
    const name = [];
    $('.amenities input:checked').each(function () {
      id.push( $(this).attr('data-id') );
      name.push( $(this).attr('data-name'));
    });
    $('.amenities H4').text(name);
  });
});
