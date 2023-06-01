<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<h3 align="center">Pizza-Order-Project</h3>

  <p align="center">
    Application allows users to configure, place and view pizza orders
    <br />
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
      <ul>
        <li><a href="#Login Page">Login Page</a></li>
        <li><a href="#Order Page">Order Page</a></li>
      </ul>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Projects makes use of prebuilt apis to gain authorization token, submit-orders, obtain existing orders, and delete an existing order. Accessability of pages is made available via nav-bar at the top of the screen to allow easy navigation for the purposes of this POC application.


### Built With

* [![Angular][Angular.io]][Angular-url]

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* Install [Node.js](https://nodejs.org/en/)
* install npm
  ```sh
  npm install npm@latest -g
  ```
* Install Angular CLI
  ```sh
  npm install angular -g @angular/cli
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/luuis9am/heb-pizza-order.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Run Application
   ```sh
   ng serve
   ```


<!-- USAGE EXAMPLES -->
## Usage

### Login Page
Upon accessing aplication you are directed to the login-page. Here you are able to submit login credentials to obtain a token that will be utilized when using the order-page features. Successful login is greeted with a snackbar message with a welcome message and redirection to the orders page. Unsuccessful login is shown with an error snackbar.


### Place Order Page
On the order-page you are able to configure and submit a new pizza order. In order to use a token is required via successful login.
- Pizza Order submition are required to have a crust, flavor, size and table number selected. Upons submittance the order becomes viewable on the 'My Orders' table.
- My Orders table reflects current orders on page-load and is able to delete specific orders via usage of the delete button icon.

### View Current Orders Page
On current-orders page you are able to view current orders, filter, sort and delete existing orders. 


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
