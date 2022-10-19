## Installation steps

This project uses selenium and nodejs to crawl chotot.com.

1. Install Chromedriver form [Here](https://www.selenium.dev/documentation/webdriver/getting_started/install_drivers/)

2. Add to the Environmental variables from [Here](https://www.selenium.dev/documentation/webdriver/getting_started/install_drivers/#2-the-path-environment-variable)

3. Install Node packages using ```npm install```

4. To run the project, type ```npm start```

```P.S``` The selenium uses approximately 3 sec to fetch one phone data. So, 50000 records would take approximately 41 hours. I tried running for 50000 but the ```chotot.com``` started not to respond to SSL handshakes and timeout were occured.


## Self Evaluation

First I played around for for half an hour, and found out that the phone element needs to be clicked. So, in my head normal fetch and html parse won't work. I started to build the solution around the idea. 
I decided to use selenium for interaction with the and nodejs for storing phone records.


Later I realized that the phone must be stored in Javascript code or in hidden elements. There I found out there are hidden elements with value ```tel:01123456789```. If I could improve the performance,
I would drop off selenium and make direct http request from node and parse the HTML then the fetch the phone, name, etc.
