import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/users', 'UsersController.store')
  Route.post('/users/sessions', 'SessionsController.store')
  Route.delete('/users/sessions', 'SessionsController.destroy').middleware('auth')

  Route.post('/categoires/options', 'CategoriesOptionsController.store')

  // Route.post('')
}).prefix('_api/v1/cookie')
