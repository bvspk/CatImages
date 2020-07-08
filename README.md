### Displaying Cat Images Based on Categories ------------
```
Description: This app will be useful for listing out the CatImages based on Category id  available at  https://docs.thecatapi.com/.
In this application you can browse through different CatImages by different categories. Clicking on each category, app will be display the Cat Images. 
This Application has been built using Angular 9.1.1 as front end JS framework with possible best practices.
Angular is a progressive framework with a small size of around ~42kb , easy to understand and scale large application.
It uses Angular cli as a Standard Tooling for Angular application Development.
```

### Tools / Plugins used
```
Used Karma & Jasmine for Unit testing.
Used VScode as IDE for coding
Used Bootstrap 4.0 for design
```

### Installations -------------
## Angular
```
This has some advantages.
Please refer below urls

https://angular.io/

https://angular.io/docs

```
## Project setup (loading/importing all required packages)
Note: npm was installed on your system through a Node.js version manager.

## Follow below steps to run the application

## open project folder in command prompt and run below command to install dependent modules / packages
```
npm install
Note: Run in a separate Node Js terminal or cmd.
```
## Once installation is complete run below command in the same folder to see the application running
```
ng serve
```
## open any browser and navigate to http://localhost:4200 to see the application


## Below command Compiles and minifies application for production deployment
```
ng build
```
## Below command Test
```
ng Test
```

### Project Guidelines -----

1) File Naming Convention, 
   Method Naming Convention, 
   Component Naming Convention,
   variable, object declaration : camelCase : TypeCasting
   Example : imageCategory, getRandomImage(), getImageCategories etc. 

2) Folder Naming Convention, Components directives in angular : kabab-case
   Example : app-header, <app-header />

3) Coding Standards  
   a. kabab-case:
      folder names, angular component directives, etc.
   b. camelCase:
      Angular component file names, js variables, objects, functions, css classes etc
   c. PascalCase:
      importing npm packages, components, services etc. 
	  
	 Dependencies :
   1. perfectscroll bar library:  npm install ngx-perfect-scrollbar -- save(For Multi Images)
   2. ngx-Avatar: npm install ngx-avatar --save (Highlight the first name)
   3. FlexLayout: npm install @angular/flex-layout (for resonsive)
   4. angular material : npm install @angular/material

Total application is responsive developed by using angular material.
