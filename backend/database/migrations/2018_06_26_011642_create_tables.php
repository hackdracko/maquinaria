<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /*
        * CREATING TABLE CAT_TURNS
        * */
        Schema::create('cat_turns', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title', 50);
            $table->string('description', 100);
            $table->timestamps();
            $table->softDeletes();
        });
        /*
        * CREATING TABLE CAT_MACHINES
        * */
        Schema::create('cat_machines', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title', 50);
            $table->string('description', 100);
            $table->timestamps();
            $table->softDeletes();
        });
        /*
        * CREATING TABLE CAT_UNITS
        * */
        Schema::create('cat_units', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title', 50);
            $table->string('description', 100);
            $table->timestamps();
            $table->softDeletes();
        });
        /*
        * CREATING TABLE CAT_TYPES
        * */
        Schema::create('cat_types', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title', 50);
            $table->string('description', 100);
            $table->string('cicles', 100);
            $table->tinyInteger('type');
            $table->timestamps();
            $table->softDeletes();
        });
        /*
        * CREATING TABLE CAT_MODELS
        * */
        Schema::create('cat_models', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title', 50);
            $table->string('description', 100);
            $table->timestamps();
            $table->softDeletes();
        });

        /*
        * CREATING TABLE CAT_PRODUCTS
        * */
        Schema::create('cat_products', function (Blueprint $table) {
            $table->increments('id');
            $table->string('code', 50);
            $table->string('title', 50);
            $table->string('description', 100);
            $table->integer('cat_model_id')->unsigned();
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::table('cat_products', function($table) {
            $table->foreign('cat_model_id')->references('id')->on('cat_models');
        });
        /*
        * CREATING TABLE CAT_PROCESS
        * */
        Schema::create('cat_process', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title', 50);
            $table->string('description', 100);
            $table->timestamps();
            $table->softDeletes();
        });
        /*
        * CREATING TABLE STOCK
        * */
        Schema::create('stock', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->integer('unit_id')->unsigned();
            $table->integer('type_id')->unsigned();
            $table->string('lote', 100);
            $table->string('delivery_person', 250);
            $table->string('observation', 250);
            $table->tinyInteger('quantity');
            $table->tinyInteger('type');
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::table('stock', function($table) {
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('unit_id')->references('id')->on('cat_units');
            $table->foreign('type_id')->references('id')->on('cat_types');
        });
        /*
        * CREATING TABLE PROCESS
        * */
        Schema::create('process', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('stock_id')->unsigned();
            $table->integer('cat_product_id')->unsigned();
            $table->string('description', 250);
            $table->string('lote', 100);
            $table->string('op', 100);
            $table->tinyInteger('status');
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::table('process', function($table) {
            $table->foreign('stock_id')->references('id')->on('stock');
            $table->foreign('cat_product_id')->references('id')->on('cat_products');
        });
        /*
        * CREATING TABLE PROCESS TRACKING
        * */
        Schema::create('process_tracking', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('process_id')->unsigned();
            $table->integer('cat_process_id')->unsigned();
            $table->integer('cat_machine_id')->unsigned();
            $table->integer('cat_turn_id')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->integer('unit_id')->unsigned();
            $table->string('description', 250);
            $table->string('observations', 250);
            $table->tinyInteger('quantity');
            $table->tinyInteger('merma');
            $table->tinyInteger('total_quantity');
            $table->tinyInteger('status');
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::table('process_tracking', function($table) {
            $table->foreign('process_id')->references('id')->on('process');
            $table->foreign('cat_process_id')->references('id')->on('cat_process');
            $table->foreign('cat_machine_id')->references('id')->on('cat_machines');
            $table->foreign('cat_turn_id')->references('id')->on('cat_turns');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('unit_id')->references('id')->on('cat_units');
        });
        /*
        * CREATING TABLE EVIDENCES
        * */
        Schema::create('evidences', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('process_tracking_id')->unsigned();
            $table->string('filename', 250);
            $table->tinyInteger('type');
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::table('evidences', function($table) {
            $table->foreign('process_tracking_id')->references('id')->on('process_tracking');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        /*
         * DROP ALL FOREIGN KEYS
         * */
        Schema::table('stock', function($table)
        {
            $table->dropForeign('user_id');
            $table->dropForeign('unit_id');
            $table->dropForeign('type_id');
        });
        Schema::table('process', function($table)
        {
            $table->dropForeign('stock_id');
            $table->dropForeign('cat_product_id');
        });
        Schema::table('process_tracking', function($table)
        {
            $table->dropForeign('cat_process_id');
            $table->dropForeign('cat_machine_id');
            $table->dropForeign('cat_turno_id');
            $table->dropForeign('user_id');
            $table->dropForeign('unit_id');
        });
        Schema::table('evidences', function($table)
        {
            $table->dropForeign('process_tracking_id');
        });
        /*
         * DROP CAT_TURNS
         * */
        Schema::dropIfExists('cat_turns');
        /*
         * DROP CAT_MACHINES
         * */
        Schema::dropIfExists('cat_machines');
        /*
         * DROP CAT_UNITS
         * */
        Schema::dropIfExists('cat_units');
        /*
         * DROP CAT_UNITS
         * */
        Schema::dropIfExists('cat_types');
        /*
         * DROP CAT_PRODCUTS
         * */
        Schema::dropIfExists('cat_products');
        /*
         * DROP CAT_PROCESS
         * */
        Schema::dropIfExists('cat_process');
        /*
         * DROP PROCESS
         * */
        Schema::dropIfExists('process');
        /*
         * DROP PROCESS_TRACKING
         * */
        Schema::dropIfExists('process_tracking');
        /*
         * DROP EVIDENCES
         * */
        Schema::dropIfExists('evidences');
    }
}
