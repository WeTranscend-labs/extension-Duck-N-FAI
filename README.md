
# Duck’N’FAI - Extension

## Project Overview
The **Duck’N’FAI Extension** is a browser-based extension designed to enhance the user experience of the DuckStrike platform. It enables quick wallet access, real-time notifications, and seamless cryptocurrency transactions directly within the browser. The extension integrates blockchain technology and AI features to allow users to interact efficiently with the Duck’N’FAI platform without leaving their browser.

## Deployment
To deploy this project locally, you can use the following steps to set up the environment and launch the application.

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/WeTranscend-labs/extension-Duck-N-FAI.git
    cd extension-Duck-N-FAI
    ```
2. Install dependencies:
    ```bash
	npm install
    ```
3. Build your extension:
   ```bash
   npm run build
   ```
4. Load the extension:
    
    -   For Chrome/Chromium-based browsers, navigate to `chrome://extensions/`.
    -   Enable **Developer Mode**.
    -   Click **Load unpacked** and select the `dist` folder inside your project.
    -   The Duck’N’FAI extension will now appear in the browser toolbar.
5. Use the extension:
    
    -   Click on the Duck’N’FAI extension icon in the toolbar to interact with the platform directly from your browser.


## Technologies Used

The **Duck’N’FAI Extension** utilizes a range of modern technologies to ensure a seamless, fast, and optimized user experience. Below are the key technologies and libraries used in this project:

-   **Vite**: A next-generation, fast build tool and development server that provides a lightning-fast development experience with features such as hot module replacement (HMR).
    
-   **React**: A JavaScript library for building user interfaces, providing the core functionality for rendering UI components and managing application state.
    
-   **TypeScript**: A superset of JavaScript that adds static typing, enhancing the development experience with better tooling and error checking.
    
-   **Tailwind CSS**: A utility-first CSS framework that allows for rapid UI development with minimal custom styles, enabling responsive, maintainable, and customizable designs.
    
-   **Radix UI**: A set of low-level UI primitives that provide the building blocks for creating accessible and customizable components, such as modals, popups, and tooltips.
    
-   **Framer Motion**: A powerful animation library that adds smooth, interactive animations to the app for an engaging user experience.
    
-   **Viem**: A library for interacting with the Ethereum blockchain, handling wallet connections, signing transactions, and reading smart contract data.
    
-   **Axios**: A promise-based HTTP client for making requests to external APIs and handling responses with ease.
    
-   **Lucide React**: A set of open-source, customizable, and high-quality SVG icons to enhance the UI design.
    
-   **PostCSS**: A tool for transforming CSS with plugins, enabling features like autoprefixing, minification, and CSS optimizations.
    
-   **ESLint**: A tool for identifying and fixing problems in JavaScript and TypeScript code to maintain code quality and avoid errors.
    

These technologies work together to deliver a powerful, scalable, and user-friendly extension that integrates with blockchain and AI-powered features.


## Project Structure
```
.  
├── public/                   # Contains static assets such as images, icons, and other publicly accessible resources.  
├── src/                      
│   ├── components/            # Contains reusable UI components for building the user interface.  
│   ├── config/                # Stores configuration files and constants for the app, including settings and API keys.  
│   ├── lib/                   # Contains utility functions and helper libraries that assist in core app functionality.  
│   └── services/              # Holds API services and other business logic to manage communication with external sources.  
├── App.tsx                    # The main component that renders the app structure and is used to manage routing and layout.  
├── content.tsx                # Contains specific content or page rendering logic for parts of the extension.  
├── main.tsx                   # The entry point of the React app where components are bootstrapped and rendered.  
└── index.html                 # The HTML template that is used to serve the extension in the browser.  


```

## Contributing

Contributions are welcome! If you'd like to contribute to Duck’N’FAI, please fork the repository, make your changes, and submit a pull request. We appreciate your help!

## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.





