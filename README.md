# Getting Started

This guide provides instructions for setting up and using the application effectively.

### Install Dependencies

To install the required packages, run the following command in your terminal:

```sh
npm install
```

### Start the Development Server

Launch the development server with:

```sh
npm run dev
```

### Example usage in iframe

You can embed the application in an iframe for easy integration. Here’s an example:

```sh
<iframe
  src="http://localhost:5173/python-playground/?task1=print%20hello%20world&task2=define%202%20variable"
  style="width: 100%; height: 100vh; border: none;"
></iframe>
```

### Instructions:
- Place your data.csv and readme.txt files in the public folder.
- Replace http://localhost:5173 with the actual URL of your server.
- Create a task list as a string and pass it as URL parameters (e.g., task1, task2, etc.). The application will automatically fetch and display all specified tasks in the "Tasks to Do" list.
- Editor will show default theme if mentioned theme is not found in the application.
