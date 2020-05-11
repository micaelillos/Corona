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
        "url": "https://api.covid19api.com/summary",
        "method": "GET",
    }
    
    $.ajax(settings).done(function (response) {
        countries = response.Countries;
       let TotalConfirmed = response.Global.TotalConfirmed;
       let TotalDeaths = response.Global.TotalDeaths;
       let TotalRecovered = response.Global.TotalRecovered;
       $('#global').append('<h1> Total Cases: <span>' + TotalConfirmed + '</span></h1>');
       $('#global').append('<h1> Total Deaths: <span> ' + TotalDeaths +  '</span> </h1>');
       $('#global').append('<h1> Total Recovered: <span>' + TotalRecovered + '</span> </h1>');
       $('#global').append('<h1> Death Rate: <span>' + parseFloat((TotalDeaths/TotalConfirmed) * 100).toFixed(2) + ' % </span></h1>');

       /// country
       $('#title').append(countries[105].Country);
         cc = countries[105].CountryCode;
         $('#image').append('<img src="https://www.countryflags.io/' + cc + '/flat/64.png">')
         CountryTotalConfirmed = countries[105].TotalConfirmed;
         CountryTotalDeaths = countries[105].TotalDeaths;
         CountryTotalRecovered = countries[105].TotalRecovered;
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
           if(country.Country.toUpperCase()  === name.toUpperCase() || name.toUpperCase() === country.CountryCode){
               printCountry(key);
           }
          });
        
    });

    function printCountry(id){
        CountryTotalConfirmed = countries[id].TotalConfirmed;
         CountryTotalDeaths = countries[id].TotalDeaths;
         CountryTotalRecovered = countries[id].TotalRecovered;

        $('#title').empty();
         $('#title').append(countries[id].Country);

         $('#image').empty();
         cc = countries[id].CountryCode;
         $('#image').append('<img src="https://www.countryflags.io/' + cc + '/flat/64.png">')

         ///
         $('#stats').empty();

         $('#stats').append('<h1> Total Cases: <span>' + CountryTotalConfirmed + '</span></h1>');
         $('#stats').append('<h1> Total Deaths: <span> ' + CountryTotalDeaths +  '</span> </h1>');
         $('#stats').append('<h1> Total Recovered: <span>' + CountryTotalRecovered + '</span> </h1>');
         $('#stats').append('<h1> Death Rate: <span>' + parseFloat((CountryTotalDeaths/CountryTotalConfirmed) * 100).toFixed(2) + ' % </span></h1>');
    }




    };
})();