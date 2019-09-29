# TaskGroup-ToDo-App

That is an example of semi-advanced ToDo App with TaskGroups (categories).

It contains the functionalities of:
- TaskGroup add/remove/edit operations,
- UserTasks add/remove/edit operations.

## Installation

You should have [node](https://nodejs.org/en/download/) runtime installed on your machine.
Use the [npm] (https://www.npmjs.com/) to install dependencies.

In the main directory

```bash
npm install
```

Next it is necessary to run local json-server.

1. Go to addons/fake-json-server and run

```bash
npm install
```

2. Navigate to /server-files and to start server on existing static file enter in the console:

```bash
json-server --p 8080 --watch <name-of-file.json>
```

If there is a problem with json-server command probably you need to run

```bash
npm install json-server -g
```

## Usage

```bash
npm start
```

That command starts the whole application.

## Side Notes

1. 

------------------------------------------

# TaskgroupTodoApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
