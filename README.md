# OlympicGamesStarter

This is an Angular 14 project exclusively developed to track statistics of the Olympic Games that have taken place in recent years and to monitor the performance of different countries that have participated using analytical tools such as graphs.

## Where to start

Go to the project root directory and generate the node_module by running the following command (`npm install`).

Once the installation is complete, simply execute the following command (`npm start`) to launch the project and navigate to the following URL `http://localhost:4200/`.

You will find:

- all services and models in the core folder
- all components in the pages folder
- the olympic.json file in the assets/mock folder

<details>
  <summary>Development organization</summary>

## Kanban

<img src='Assets/Images/Kanban.png' width='500'/>

After reading the specifications, we create a ticket for each required functionality of the application. The first numbering is based on a part of the application and the second concerns its content.

This means that one ticket corresponds to one branch.

Of course, the number of tickets varies depending on the development (addition of functionalities, encountered bugs, and necessary improvements).

This results in the following tree structure as the development progresses.

<img src='Assets/Images/branch-git.png' width='500'/>

It is important to write a commit message explaining the modifications made.

</details>

<details>
  <summary>The resources</summary>

You will notice through the project architecture that all external resources to the components are located in the core folder:

- The services are used to share logic between the components of the application and therefore can be injected into other classes to maintain the application over time, since they act as support for the components. In the context of the application, it is mainly used to access the list of objects present in the JSON file.

- The models are used to describe the structure of the application's data in order to perform typing on TypeScript classes. They also serve as support to facilitate code comprehension since they describe the structure of the data used, and they can also prevent type and data errors.

</details>

<details>
  <summary>Angular</summary>

This framework is popular for the SPA (Single Page Application), which allows offering a unique user experience since the interface is generated by loading dynamic or asynchronous content, unlike a classic website that generates its content all at once.

<img src='Assets/Images/SPA_vs-website.png' width='500'/>

## RxJS

RxJS is a reactive programming library that is often used with Angular. It allows for managing asynchronous data flows such as user interface events or HTTP requests.

The main challenge of application development relies on RxJS Observables to emit data sources synchronously or asynchronously, allowing any component to receive data at any desired time, such as during the use of a service.

Of course, to receive information, the Observable will subscribe to receive the desired data and thus leak from memory, which is where Subjects and Subscriptions come in to perform unsubscription.

By combining these elements, it is possible to create controlled data streams and perform tasks such as managing subscriptions, managing errors, and terminating data streams cleanly and efficiently.

</details>

<details>
  <summary>Development documentations</summary>

| Technology |                  Link                  |
| :--------- | :------------------------------------: |
| Angular    |        https://angular.io/docs         |
| Bootstrap  |   https://getbootstrap.com/docs/5.2    |
| Chart.js   |  https://www.chartjs.org/docs/3.4.0/   |
| ng2-charts | https://valor-software.com/ng2-charts/ |

</details>
