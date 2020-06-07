(function () {
    document.addEventListener('deviceready', onDeviceReady);
    function onDeviceReady() {

        let countries;
        let cc;
        let CountryTotalConfirmed;
        let CountryTotalDeaths;
        let CountryTotalRecovered;
       
    ///
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://corona-virus-stats.herokuapp.com/api/v1/cases/countries-search?limit=220",
        "method": "GET",
    }
    
    $.ajax(settings).done(function (response) {
        countries = response.data.rows;
       let TotalConfirmed = response.data.rows[0].total_cases;
       let TotalDeaths = response.data.rows[0].total_deaths;
       let TotalRecovered = response.data.rows[0].total_recovered;
       $('#global').append('<h1> Total Cases: <span>' + TotalConfirmed + '</span></h1>');
       $('#global').append('<h1> Total Deaths: <span> ' + TotalDeaths +  '</span> </h1>');
       $('#global').append('<h1> Total Recovered: <span>' + TotalRecovered + '</span> </h1>');
       $('#global').append('<h1> Death Rate: <span>' + parseFloat((eval(TotalDeaths.replace(/,/g, '')/TotalConfirmed.replace(/,/g, ''))) * 100).toFixed(2) + ' % </span></h1>');

       /// country
       $('#title').append(countries[1].country);
         cc = countries[1].country_abbreviation;
         $('#image').append('<img src="https://www.countryflags.io/' + cc + '/flat/64.png">')
         CountryTotalConfirmed = countries[1].total_cases;
         CountryTotalDeaths = countries[1].total_deaths;
         CountryTotalRecovered = countries[1].total_recovered;
         $('#stats').append('<h1> Total Cases: <span>' + CountryTotalConfirmed + '</span></h1>');
         $('#stats').append('<h1> Total Deaths: <span> ' + CountryTotalDeaths +  '</span> </h1>');
         $('#stats').append('<h1> Total Recovered: <span>' + CountryTotalRecovered + '</span> </h1>');
         $('#stats').append('<h1> Death Rate: <span>' + parseFloat((CountryTotalDeaths/CountryTotalConfirmed) * 100).toFixed(2) + ' % </span></h1>');
    });
       
    //
    $('#country').click(() => {
        let name =   $('#input').val();
        console.log(name.toUpperCase());
        $('#input').val('');
        console.log(countries);
        $.each(countries, function( key, country ) {
           if(country.country.toUpperCase()  === name.toUpperCase() || name.toUpperCase() === country.country_abbreviation){
               printCountry(key);
           }
          });
        
    });

    function printCountry(id){
        CountryTotalConfirmed = countries[id].total_cases;
         CountryTotalDeaths = countries[id].total_deaths;
         CountryTotalRecovered = countries[id].total_recovered;

        $('#title').empty();
         $('#title').append(countries[id].country);

         $('#image').empty();
         cc = countries[id].country_abbreviation;
         $('#image').append('<img src="https://www.countryflags.io/' + cc + '/flat/64.png">')

         ///
         $('#stats').empty();

         $('#stats').append('<h1> Total Cases: <span>' + CountryTotalConfirmed + '</span></h1>');
         $('#stats').append('<h1> Total Deaths: <span> ' + CountryTotalDeaths +  '</span> </h1>');
         $('#stats').append('<h1> Total Recovered: <span>' + CountryTotalRecovered + '</span> </h1>');
         $('#stats').append('<h1> Death Rate: <span>' + parseFloat((CountryTotalDeaths.replace(/,/g, '')/CountryTotalConfirmed.replace(/,/g, '')) * 100).toFixed(2) + ' % </span></h1>');
    }




    };
})();
