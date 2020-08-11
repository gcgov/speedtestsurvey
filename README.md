# Speed Test Survey

A data collection tool built by Garrett County Government for the advancement of broadband expansion in unserved and underserved areas.

## Requirements
* PHP >=7.3.0
* MongoDB
* An API Key for https://geo.ipify.org/ will be required for submitting the survey. This API provides ISP names from client IP addresses. The survey will not function without this API.
* An API Key for Google GeoCoding will be required if you wish to geocode the addresses that are submitted. https://developers.google.com/maps/documentation/geocoding/get-api-key

## Set up instructions
* After cloning or extracting the project, run `composer install` to install the project dependencies. (More about Composer, a PHP package manager here https://getcomposer.org/)
* Set up a web server with PHP. The public root should point to /www/. Once you are able to successfully load index.php, you will have to configure the front end and the backend
* Edit /www/script/config.js
    * Set `ipifyApiKey` to the API key you received from https://geo.ipify.org/
    * Set `speedTestUrl` to use the correct host name for your install. (ie. `http://www.garrettcounty.org/test/`)
* **At this point you should be able to demo the survey successfully! To save your results, continue to the next steps.**
* Edit `/app/config.php`
    * Set your MongoDB parameters to match the Mongo install you will use. If you use the database implementation tool below, you will only need to set the password property in this file.
        * For ease of implementation, you can use the script in `/app/db/1-createuser.js` to create a new Mongo database and user. 
        Before running that Mongo script, set your administrative username and password on line 3 and set a new password for your survey database on line 10. 
        To run that script, in your console, change directory into the db folder and then enter the following command `mongo 1-createuser.js`. This will create 
        the survey database and add a user that only has access to that database.
* **At this point you should be able to demo the survey and successfully save your results. To geocode the addresses saved in your database, continue.**
* Edit `/app/config.php`
    * Set `googleApiKey` to the API key you received from https://developers.google.com/maps/documentation/geocoding/get-api-key
* Edit `/app/geocode.bat`
    * Change the PHP executable path and the file path to match your server.
    * Running this script will update your documents in Mongo DB with a latitude and longitude 


## Exporting data
* Mongo DB Charts is a powerful tool that can provide heat mappping and analysis ![Mongo charts](/example/mongodb-charts.png)
* Script `/app/db/export-data-to-csv.bat` can be used to dump to the data to a spreadsheet format