/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  //student records
  Route.get('/students', 'StudentsController.index')
  Route.get('/students/:id', 'StudentsController.getStudent')

  Route.post('/students', 'StudentsController.store')

  // behaviour score
  Route.put('/students/:id/behavior_score', 'StudentsController.updateBehaviorScore')

  // Goals
  Route.post('/students/:id/goals', 'StudentsController.addGoal')
  Route.put('/students/:id/goals/:goal_index/status', 'StudentsController.updateGoalStatus')
  Route.post('/students/:id/goals/:goal_index/evidence', 'StudentsController.addEvidence')
}).prefix('/api')