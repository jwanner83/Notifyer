let role = undefined
let room = undefined

$(document).ready(function () {
  $(".loading-overlay").fadeIn()

  setTimeout(function () {
    $(".loading-overlay").fadeOut()
    collect()
  }, 800)
})

function collect() {
  let collector = $(".collector")

  if (role === undefined) {
    collector.css("display", "grid")

    $(".role-title").fadeIn()
    $(".role-collector").fadeIn()
  } else {
    $(".role-title").fadeOut()
    $(".role-collector").fadeOut()

    if (room === undefined) {
      $(".room-title").fadeIn()
      $(".room-collector").fadeIn()
    } else {
      $(".room-title").fadeOut()
      $(".room-collector").fadeOut()
    }
  }
}

function setRole (r) {
  role = r
  collect()
}