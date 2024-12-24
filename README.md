# Khata Book

**Khata Book** is a personal accounting web application that allows users to manage their financial records with features like adding, editing, and viewing transactions. Built using **Node.js**, **EJS**, and **MongoDB**, this app provides a clean and intuitive interface to manage finances efficiently.

---

## Features

- **User Authentication**: Secure login and signup with email and password.
- **Personal Accounts Tracking**: Keep track of transactions with features to add, view, edit, and delete records.
- **Sorting & Filtering**: Sort entries by date or newest to view transaction history.
- **Dark/Light Mode**: Toggle between night and day modes for better accessibility.
- **Account Sharing**: Share your financial records with others securely.
- **Responsive Design**: Fully responsive UI for use on all devices.
- **Session Management**: Secure session handling with encrypted cookies.

---

## Technologies Used

- **Node.js**: Backend JavaScript runtime.
- **Express**: Web framework for routing and server management.
- **MongoDB & Mongoose**: NoSQL database to store transaction data and user information.
- **EJS**: Templating engine to dynamically render HTML views.
- **Passport.js**: Authentication middleware for managing user sessions.
- **Express-session**: Session management for secure user login.
- **Flash Messages**: User-friendly feedback for successful or failed actions.
- **CSS**: Styling of the user interface.
  
---

## Prerequisites

Before running the application locally or deploying it, make sure you have the following:

- [Node.js](https://nodejs.org) (v14 or higher)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (for production database)
- [Git](https://git-scm.com/)
  
---

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/Shadab-2604/Khata-book.git
cd Khata-book
```

### Install Dependencies

Make sure to install the required dependencies:

```bash
npm install
```

### Set Up Environment Variables

Create a `.env` file in the root directory of the project and add the following:

```env
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.mongodb.net/khata?retryWrites=true&w=majority
SESSION_SECRET=your-secret-key
PORT=3000
```

- Replace `your-username` and `your-password` with your MongoDB Atlas credentials.
- The `SESSION_SECRET` should be a random string for session security.

### Run the Application Locally

Start the application:

```bash
npm start
```

Visit `http://localhost:3000` to view the application in your browser.

---

## Folder Structure

```
├── config/                # Passport configuration and other config files
├── models/                # MongoDB models for users, transactions, etc.
├── routes/                # Express routes for handling different pages
├── views/                 # EJS view templates
├── public/                # Static files (CSS, images, JavaScript)
├── .env                   # Environment variables (not to be committed)
├── package.json           # Project dependencies and scripts
├── server.js              # Main server file
└── README.md              # This file
```

---

## Contributing

We welcome contributions! If you find any bugs or want to add features, feel free to open a pull request. Please ensure you follow the guidelines for clean and maintainable code.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes and commit (`git commit -am 'Add feature'`).
4. Push to your forked repository (`git push origin feature/your-feature-name`).
5. Open a pull request to the main repository.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

- **MongoDB Atlas** for providing the database hosting.
- **Passport.js** for user authentication.
- **Express.js** for the powerful routing capabilities.
- **EJS** for the templating engine that makes dynamic rendering easy.
