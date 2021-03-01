window.addEventListener('load', () => 
{
    let lat, long; 

    let tzone = document.getElementById('location-timezone');
    let tdegree = document.getElementById('temperature-dregee');
    let tdescription = document.getElementById('temperature-description');

    let span = document.getElementById('change');
    let tsection = document.getElementById('temperature-section');

    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(position => 
            {
                lat = position.coords.latitude;
                long = position.coords.longitude;
                const proxy = 'https://cors-anywhere.herokuapp.com/';
                const api = `${proxy}https://api.darksky.net/forecast/3f2a43d17df9f78fe4cc7b6d8983fe35/${lat}, ${long}`;

               fetch(api)
               .then(data => data.json())
               .then(data => {

                //Reestructuración de objeto, donde se le asigna un valor a una variable con valores del JSON.

            
                const { summary, temperature, icon, description } = data.currently;


                //Mostly Cloudy = Mayormente Nublado
                //Partly Cloudy = Parcialmente Nublado
                //Clear = Despejado

                //console.log(data.currently);


                let celsius = (temperature - 32) * (5 / 9);

                

                //Llamada a la función 

                seticon(icon, document.getElementById('icon1'));

                // llamada al dom

                dom(summary, temperature, data);


                //Cambiar a celsius

                change(celsius,temperature);
                
        });

    });

    }

    function seticon(icon, iconID)
    {
        const skycons = new Skycons({ color:"white" });
         
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();

        skycons.play();

        return skycons.set(iconID, Skycons[currentIcon]);
    }

    function dom(summary, temperature, data)
    {
        tzone.textContent = data.timezone;
        tdegree.textContent = Math.floor(temperature);
        //tdescription.textContent = summary;

        
        switch(summary)
        {
            case 'Mostly Cloudy':
            summary_translate = "Mayormente nublado"; 
            tdescription.textContent =  summary_translate;
            break;

            case 'Partly Cloudy': 
            summary_translate = "Parcialmente nublado";
            tdescription.textContent =  summary_translate;
            break;

            case 'Clear':
            summary_translate = "Despejado";
            tdescription.textContent =  summary_translate;
            break;

            default: 
            summary_translate = "Despejado";
            tdescription.textContent =  summary_translate;
            break;
        }
        
        
    }

    function change(celsius, temperature)
    {
                        
        tsection.addEventListener('click', () => {

            if(span.textContent === "F")
            {
                span.textContent = "C";
                tdegree.textContent = Math.floor(celsius);
            }
            else
            {
                span.textContent = "F";
                tdegree.textContent = Math.floor(temperature);
            }

    });

    }

    

});