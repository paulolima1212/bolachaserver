import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/users', 'UsersController.store')
  Route.post('/users/sessions', 'SessionsController.store')
  Route.delete('/users/sessions', 'SessionsController.destroy').middleware('auth')

  Route.post('/categories/options', 'CategoriesOptionsController.store')
  Route.post('/extras/categories', 'ExtrasCategoriesController.store')

  Route.post('/products', 'ProductsController.store').middleware('auth')
  Route.get('/products', 'ProductsController.show')
  Route.get('/products/:id', 'ProductsController.showOne')
  Route.delete('/products/:id', 'ProductsController.destroy').middleware('auth')

  Route.post('/orders', 'OrdersController.store')
  Route.get('/orders', 'OrdersController.show')
  Route.get('/orders/:id', 'OrdersController.showOne')
  Route.delete('/orders/:id', 'OrdersController.destroy')
}).prefix('_api/v1/cookie')
