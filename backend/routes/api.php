<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('authorize', 'API\PassportController@login');
Route::post('register', 'API\PassportController@register');
Route::group(['middleware' => 'auth:api'], function () {
    Route::resource('/user', 'UserController');
    Route::resource('/model', 'CatModelController');
    Route::resource('/rol', 'RolController');
    Route::get('/product/combo', 'CatProductController@comboProducts');
    Route::resource('/product', 'CatProductController');
    Route::get('/unit/combo', 'CatUnitController@comboUnits');
    Route::resource('/unit', 'CatUnitController');
    Route::get('/type/combo', 'CatTypeController@comboTypes');
    Route::resource('/type', 'CatTypeController');
    Route::resource('/machine', 'CatMachineController');
    Route::resource('/process', 'CatProcessController');
    Route::resource('/turn', 'CatTurnController');
    Route::get('/stock/entries', 'StockController@entries');
    Route::get('/stock/departures', 'StockController@departures');
    Route::get('/stock/comboDepartures', 'StockController@comboDepartures');
    Route::resource('/stock', 'StockController');
});

/*Route::post('authorize', 'API\PassportController@login');
Route::post('register', 'API\PassportController@register');
Route::post('/validate-token', function (Request $request) {
    return ['account' => array_add($request->user(), 'role', 'administrador')];
})->middleware('auth:api');

//Route::post('validate-token', 'API\PassportController@validateToken');

Route::group(['middleware' => 'auth:api'], function () {
    Route::resource('users', 'UserController');
    Route::resource('clients', 'ClientController');
    Route::get('/office/clients', 'OfficeController@comboClients');
    Route::resource('offices', 'OfficeController');
    Route::get('/tickets/clients', 'TicketController@comboClients');
    Route::get('/tickets/offices/{id}', 'TicketController@comboOffices');
    Route::get('/tickets/users', 'TicketController@comboUsers');
    Route::get('/tickets/test', 'TicketController@test');
    Route::resource('tickets', 'TicketController');
});*/

/*Route::group(['middleware' => 'web', 'prefix' => 'frontend'], function()
{

});*/
