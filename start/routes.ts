import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/users', 'UsersController.store')
  Route.post('/users/sessions', 'SessionsController.store')
  Route.delete('/users/sessions', 'SessionsController.destroy').middleware('auth')
}).prefix('_api/v1/cookie')
