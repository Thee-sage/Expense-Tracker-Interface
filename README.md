# Expense Tracker Component

## Overview

The Expense Tracker Component is a dynamic, user-friendly interface designed for managing financial transactions. Built with React, Next.js, and styled using Tailwind CSS, this component offers an intuitive way to track and categorize expenses, income, and transfers. It features responsive design, a currency converter, and a category selection menu, providing a seamless user experience.

## High-Level Accomplishments

- **Dynamic Transaction Management:** Implemented a flexible transaction form that handles expenses, income, and transfers. Users can add, edit, and categorize transactions with ease.

- **Responsive Design:** Ensured that the interface is fully responsive using Tailwind CSS, adapting seamlessly to different screen sizes and devices.

- **Category and Currency Management:** Integrated a dropdown menu for category selection and a real-time currency converter. Users can filter transactions by category and select currencies for accurate expense tracking.

- **Date Picker Integration:** Included a date picker for users to select and view transactions based on specific dates, enhancing the functionality of the tracker.

## Technical Description

### Structure and State Management

- **React Functional Component:** Developed using React functional components and hooks (useState, useEffect, useRef) for state management and lifecycle control.

- **State Variables:**
  - `selected`: Tracks the current type of transaction (expenses, income, or transfer).
  - `date`: Manages the selected date for transactions.
  - `currencies`: Holds the list of available currencies fetched from an API.
  - `showOptions` and `showCategoryOptions`: Control visibility of options menus.
  - `searchTerm`: Stores the current search query for categories.
  - `isAmountValid` and `isFormComplete`: Validate form inputs and manage form completion state.

### Features and Interactions

- **Transaction Data Handling:**
  - `transactionData`: Manages the details of a transaction including description, account, amount, currency, category, and date.
  - `handleInputChange()`: Updates transaction data based on user input.
  - `handleAddTransaction()`: Adds a new transaction if the form is complete.

- **Category and Currency Management:**
  - **Categories:** Implemented a dropdown for category selection and a search feature to filter categories.
  - **Currencies:** Fetches and displays available currencies using the Open Exchange Rates API.

- **Date Picker:**
  - Utilizes `react-calendar` for date selection, allowing users to choose and display transactions by date.

- **Responsive UI:**
  - Styled with Tailwind CSS for a modern and responsive design that adapts to different devices and screen sizes.

### Getting Started

This project is a Next.js application created with `create-next-app`. To get started:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate into the project directory:
   ```bash
   cd <project-directory>
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application in action.

### Learn More

To dive deeper into Next.js, check out the following resources:
- [Next.js Documentation](https://nextjs.org/docs) - Comprehensive guide to Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - Interactive tutorial to get hands-on experience with Next.js.

You can also explore the [Next.js GitHub repository](https://github.com/vercel/next.js/) and contribute to the project.

### Deployment

You can view the live application at [Expense Tracker](https://recreationaldesign2byabhijeetsingh.vercel.app/).

For deployment, the easiest way is to use Vercel. For detailed deployment instructions, refer to the [Next.js deployment documentation](https://nextjs.org/docs/deployment).
