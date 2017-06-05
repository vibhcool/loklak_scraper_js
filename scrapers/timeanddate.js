
var BaseLoklakScrapper = require('./base');

class LocationAndDateScrapper extends BaseLoklakScrapper {

  constructor() {
	super('LocationAndDate', 'http://www.timeanddate.com/worldclock/results.html?query=');
  }

  argumentSanityCheck(args) {
	super.argumentSanityCheck(args);

	if (args.length <= 2) {
		console.error('Atleast one argument required.');
		process.exit(-1);
	}

	return true;
  }

  onInit() {
	this.REQUEST_URL = this.BASE_URL + this.SLICED_PROC_ARGS[0];
	this.request();
  }

  scrape($) {
    var locationwisetime = [];
    var loc_list = {};
    var loc_array = [];
    var tag, location, time, loc;
    var htmlTime = $("table").find('tr');
	  
    htmlTime.each(function (index, element) {
    //$("#smwi")
    tag = $(element).find("td");
    if( tag.text() != "") {
      loc = {};

      location = tag.text();
      tag = tag.next();
      time = tag.text();
      location = location.replace(time,"");

      loc["location"] = location;
      loc["time"] = time;
      loc_array.push(loc);
    } else {
      tag = tag.next();
    }

    });

    loc_list["search"] = loc_array;
    loc_list["url"] = this.REQUEST_URL;
    locationwisetime.push(loc_list);
    console.log(JSON.stringify(locationwisetime));
  }
}

module.exports = LocationAndDateScrapper;

new LocationAndDateScrapper();
/*
/* Usage : timeanddate.js London
           timeanddate.js 
 

const request = require('request-promise-native');
const cheerio = require('cheerio');


var url;
var html;
var $;

if (process.argv.length === 3) {
  query = process.argv[2];
  terms = ['all'];
}

url = "http://www.timeanddate.com/worldclock/results.html?query=" + query;

request(url, function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
    process.exit(-1);
  }
  html = body;
  scrapeTimeAndDate()
});


function scrapeTimeAndDate() {
  $ = cheerio.load(html);
  var loc_list = {};
  var htmlTime = $("table");
  var tag, location, time;
  var locationwisetime = [];
  var count = 0;

  $('table').find('tr').each(function (index, element) {

  tag = $(element).find("td");
  if( tag.text() != "") {
    location = tag.text();
    tag = tag.next();
    time = tag.text();
    location = location.replace(time,"");

    loc_list["location"] = location;
    loc_list["time"] = time;
    locationwisetime.push(loc_list);
    count++;
    loc_list = {};
  } else {
  tag = tag.next();
  }
    

});
  loc_list["count"] = count;
  locationwisetime.push(loc_list);
  console.log(locationwisetime);
}

*/
