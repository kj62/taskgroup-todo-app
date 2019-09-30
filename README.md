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
The important thing is the port number 8080 - the app URLs are based on it.

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

1. Date format has been left due to lack of implementation time. The simple string has been used for now.
	Normally, the ngx-bootstrap datepicker would be used.

2. Code probably could be more DRY, but because of the small app size and lack of implementation time it has not been restructured.

3. Unit tests are not implemented, because the developer has been 100% focused on the app functionality.

4. Styling could be done in SCSS, but plain CSS has been chosen.

5. Probably the additional interface between REST API functions and the components could be written (indirect communication interface),
	but the app is small and does not requires it.
	
6. Task groups has additional field 'id'. That field is necessary for json-server to identify the resource.
	When creating new Task Group the 'id' of stringifyied Date.now() value is assigned.

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
