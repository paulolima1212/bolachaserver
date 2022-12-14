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
  Route.delete('/orders/:id', 'OrdersController.destroy').middleware('auth')

  Route.post('/options', 'OptionsController.store')
  Route.get('/options', 'OptionsController.show')
  Route.get('/options/:id', 'OptionsController.showOne')
  Route.delete('/options/:id', 'OptionsController.destroy').middleware('auth')

  Route.post('/calls_serices', 'CallServicesController.store')
  Route.get('/calls_serices', 'CallServicesController.show')
  Route.get('/calls_serices/:id', 'CallServicesController.showOne')
  Route.delete('/calls_serices/:id', 'CallServicesController.destroy')

  Route.post('/categories', 'CategoriesController.store')
  Route.get('/categories', 'CategoriesController.show')
  Route.get('/categories/:id', 'CategoriesController.showOne')
  Route.delete('/categories/:id', 'CategoriesController.destroy').middleware('auth')

  Route.post('/stocks', 'StocksController.store').middleware('auth')

  Route.post('/extras', 'ExtrasController.store').middleware('auth')
}).prefix('_api/v1/cookie')
