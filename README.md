# Inventory Management Client

Welcome to the Inventory Management Client Repository! This project is a React web application designed for efficient inventory management. It allows you to interact with a backend API to manage various aspects of your inventory. The application leverages DevExtreme DataGrids and popups for data interaction, integrates i18n for translation support, and features a dedicated selling page to display and filter products by categories.

## Table of Contents
- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Features](#features)
- [Usage](#usage)
- [Localization](#localization)
- [Selling Page](#selling-page)
- [Context](#context)
- [Contributing](#contributing)
- [Screens](#screens)

## Introduction
The Inventory Management Client is a React-based application that offers a comprehensive user interface to interact with a backend API. It aims to simplify inventory management tasks by providing CRUD operations, visualization through DevExtreme components, multi-language support via i18n, and a specialized selling page to facilitate efficient product categorization.

## Technologies Used
- **React**: A powerful JavaScript library for building user interfaces.
- **DevExtreme**: High-performance UI components tailored for data-centric applications.
- **i18n**: A library for managing translations and internationalization in the application.

## Getting Started
To begin using the Inventory Management Client, follow these steps:

1. Clone this repository: `git clone https://github.com/foaudkajj/inventory-management-client.git`
2. Navigate to the project directory: `cd inventory-management-client`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`

## Features
- **Create**: Add new inventory items through intuitive popups and the DevExtreme DataGrid.
- **Read**: View existing inventory items presented in an organized DataGrid format.
- **Update**: Edit and update details of inventory items directly within the DataGrid.
- **Delete**: Remove unnecessary inventory items using the DataGrid.
- **Localization**: Provide multi-language support with the i18n library.

## Usage
1. **Create**: Access the "Add" button on the appropriate page to display a popup. Fill in required details and click "Save" to create a new inventory item.

2. **Read**: Explore various application pages to visualize existing inventory items using the DevExtreme DataGrid.

3. **Update**: Click on an inventory item in the DataGrid to open a popup for editing. Apply changes and click "Save" to update the entry.

4. **Delete**: In the DataGrid, select one or multiple items and click "Delete" to remove them.

## Localization
Implement multi-language support using the i18n library. Easily switch between languages to access application content in your preferred language.

## Selling Page
Discover the dedicated selling page, which efficiently displays products and their respective categories. Use the provided filters to streamline product exploration.

## Context
The application utilizes React context to manage global state. This allows for efficient data sharing between components and facilitates a more organized and maintainable codebase.

## Contributing
Contributions are encouraged! To enhance the application's functionality or address issues, follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/new-feature`
3. Implement and test your changes.
4. Commit your modifications: `git commit -m "Add new feature"`
5. Push your branch: `git push origin feature/new-feature`
6. Create a Pull Request, outlining your changes.

## Screens 

- **Selling Page**

![image](https://github.com/foaudkajj/inventory-management-client/assets/94835822/092f0470-f3d9-49cf-9ebd-c432e9afa08c)

  - **Before the sale Payment Method chooser popup**

![image](https://github.com/foaudkajj/inventory-management-client/assets/94835822/067c0113-8eec-4bc9-b36f-0858b5d8ed04)

- **Filtered Products by Categories**

![image](https://github.com/foaudkajj/inventory-management-client/assets/94835822/2672c261-c029-4239-8181-f74b7f63317e)

- **You can change the language**

![image](https://github.com/foaudkajj/inventory-management-client/assets/94835822/d0cc4c2c-00cf-44b5-a578-106144231950)

- **Other pages to get insert modify and remove data**
  
![image](https://github.com/foaudkajj/inventory-management-client/assets/94835822/c25ede41-1119-4f1c-90b6-9423f801b640)


Happy coding!
