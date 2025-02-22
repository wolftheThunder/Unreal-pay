<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMeetingsTable extends Migration
{
    public function up()
    {
        Schema::create('meetings', function (Blueprint $table) {
            $table->id();
            $table->string('meeting_with');
            $table->dateTime('meeting_date');
            $table->text('description')->nullable();
            $table->boolean('completed')->default(false); 
            $table->timestamps();
        });
    }
    

    public function down()
    {
        Schema::dropIfExists('meetings');
    }
}
