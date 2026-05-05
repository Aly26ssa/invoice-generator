# 🧾 Invoice Generator
A web-based invoice generator app with multiple template types and printing options. Fill in your business details, client info, and line items to instantly generate a professional, printable invoice with no account required.
 
<img width="1537" height="921" alt="invoice-generator" src="https://github.com/user-attachments/assets/d195da51-4a65-49a6-bdf4-70098c7c5949" />
 
## ✨ Features
 
* **Custom Invoice Fields**: Enter business name, client details, invoice number, and due date with ease.
* **Line Item Management**: Add, edit, and remove line items with automatic subtotal and total calculations.
* **Multiple Template Types**: Choose from different invoice layouts to match your style or brand.
* **PDF Export**: Download your invoice as a polished PDF file using jsPDF and html2canvas.
* **Print Support**: Print invoices directly from the browser with print-optimized styling.
* **Modern UI**: Clean, responsive interface with a smooth user experience.
## 🛠️ Tech Stack
 
* **React 19**: Component-based UI library for building dynamic, interactive interfaces.
* **TypeScript**: Strongly typed codebase for reliability and maintainability.
* **Vite**: Lightning-fast build tool with instant Hot Module Replacement (HMR).
* **jsPDF**: Client-side PDF generation for downloadable invoices.
* **html2canvas**: Converts the invoice preview to a canvas for accurate PDF rendering.
* **CSS3**: Custom styling with variables, Flexbox, and print media queries.
## 🚀 Getting Started
 
To run this project locally on your machine, follow these steps:
 
1. Clone the repository
```
git clone https://github.com/Aly26ssa/invoice-generator.git
```
 
2. Navigate to the project directory
```
cd invoice-generator
```
 
3. Install dependencies
```
npm install
```
 
4. Launch the application
```
npm run dev
```
 
   * The app will be available at `http://localhost:5173` by default.
   * To preview a production build, run `npm run build` followed by `npm run preview`.
## 📂 Project Structure
 
```
invoice-generator/
├── public/                 # Static assets
├── src/                    # Application source code
│   ├── components/         # Reusable React components (form fields, line items, templates)
│   ├── assets/             # Images and icons
│   ├── App.tsx             # Root application component
│   └── main.tsx            # Application entry point
├── .gitignore              # Git ignored files
├── index.html              # Main HTML entry point
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── README.md               # Project documentation
```
 
## 📝 License
 
This project is open source and available under the __[MIT License](https://github.com/Aly26ssa/invoice-generator/blob/main/LICENSE)__.
 
