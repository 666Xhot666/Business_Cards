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
  $('.downloadCSV').click((e) => {
    e.preventDefault()
    window.location.href = '/api/users.csv'
  })

  $.get('/api/users', (data) => {
    const { users } = data
    if (users) {
      users.map((user) => {
        let card = $('<div></div>').addClass('card-item')
        let cardAvatar = $('<div></div>').addClass('card-avatar left')
        let img = $('<img>').attr({ src: `${user.avatar}` })
        let cardContent = $('<div></div>').addClass('card-content')
        let contentTitle = $('<div></div>')
          .addClass('title')
          .text(`${user.first_name} ${user.last_name}`)
        let email = $('<div></div>').addClass('email').text(`${user.email}`)
        $('.cards-list').append(
          card.append(
            cardAvatar.append(img),
            cardContent.append(contentTitle),
            email
          )
        )
      })

      $('.card-action').css({ opacity: '1' })
    } else {
      const errorMessage = $('<div></div>').addClass('errorMessage')
      const text = $('<h4></h4>').text(
        'Can`t load Users. Please reload the page, or try again later'
      )
      $('.cards-list').append(errorMessage.append(text))
    }
  }).fail(() => {
    const errorMessage = $('<div></div>').addClass('errorMessage')
    const text1 = $('<h4></h4>').text('Oops, something went wrong!!!')
    const text2 = $('<h4></h4>').text(
      'Can`t load Users. Please reload the page, or try again later'
    )
    $('.cards-list').append(errorMessage.append(text1, text2))
  })
  $('#load-more').click(() => {
    page += 1
    $.get(`/api/users?page=${page}`, (data) => {
      const { users } = data
      if (!users) {
        let span = $('<p></p>').text('All users Loaded')
        $('#load-more').remove()
        $('.card-action').append(span)
      } else {
        users.map((user) => {
          let card = $('<div></div>').addClass('card-item')
          let cardAvatar = $('<div></div>').addClass('card-avatar left')
          let img = $('<img>').attr({ src: `${user.avatar}` })
          let cardContent = $('<div></div>').addClass('card-content')
          let contentTitle = $('<div></div>')
            .addClass('title')
            .text(`${user.first_name} ${user.last_name}`)
          let email = $('<div></div>').addClass('email').text(`${user.email}`)
          $('.cards-list').append(
            card.append(
              cardAvatar.append(img),
              cardContent.append(contentTitle),
              email
            )
          )
        })
      }
    }).fail(() => {
      const errorMessage = $('<div></div>').addClass('errorMessage')
      const text1 = $('<h4></h4>').text('Ooops, something went wrong!!!')
      const text2 = $('<h4></h4>').text(
        'Can`t load Users. Please reload the page, or try again later'
      )
      $('.cards-list').append(errorMessage.append(text1, text2))
    })
  })
})
