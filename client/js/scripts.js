let page = 1
$(document).ready(() => {
  $(window).scroll(() => {
    if (this.scrollY > 30) {
      $('.navbar').addClass('sticky')
      $('.goTop').fadeIn()
    } else {
      $('.navbar').removeClass('sticky')
      $('.goTop').fadeOut()
    }
  })
  $('.goTop').click(() => {
    scroll(0, 0)
  })

  $.get('/api/user?credentials=dGVzdEBnbWFpbC5jb206MHlXKkooaiV6TA==', (data) => {
    const { customer } = data
    if (customer) {
        let card = $('<div></div>').addClass('card-item')
        // let cardAvatar = $('<div></div>').addClass('card-avatar left')
        // let img = $('<img>').attr({ src: `${user.avatar}` })
        let cardContent = $('<div></div>').addClass('card-content')
        let contentTitle = $('<div></div>')
          .addClass('title')
          .text(`${customer.first_name} ${customer.last_name}`)
        let email = $('<div></div>').addClass('email').text(`${customer.email}`)
        let loyalty = $('<div></div>').addClass('email').text(`isLoyalty: ${customer.c_isLoyalty}`)
        $('.cards-list').append(
          card.append(
            cardContent.append(contentTitle),
            email,
            loyalty
          )
        )
      // $('.card-action').css({ opacity: '1' })
    } else {
      const errorMessage = $('<div></div>').addClass('errorMessage')
      const text = $('<h4></h4>').text(
        'Can`t load Users. Please reload the page, or try again later'
      )
      $('.cards-list').append(errorMessage.append(text))
    }
  }).fail((error) => {
    const errorMessage = $('<div></div>').addClass('errorMessage')
    const text1 = $('<h4></h4>').text('Oops, something went wrong!!!')
    const text2 = $('<h4></h4>').text(error.responseJSON.message)
    $('.cards-list').append(errorMessage.append(text1, text2))
  })
})
