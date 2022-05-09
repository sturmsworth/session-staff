# Developer notes

# Year updates must be made on this system after 2024.

Admin tables need to be updated each year after 2024.
This needs to be done inside the Google Firebase console
https://console.firebase.google.com - when logged in with sis_admin@senate.virginia.gov)

From the Firebase Developer Console

1. select "session-staff-hooks"
2. in the menu located on the left side select "Firestore Database"
3. select "yearsList"
4. Click "Add Document"
5. For the document ID just click on "Auto-ID"
6. In the blank Field below the Document ID type in "year" - make sure this is all lowercase
7. keep the Type "string"
8. in the blank "Value" field type in the year you're adding (example: 2025)
9. Click save

# To update the downloadble PDF Forrms:

From the Firebase Developer Console

1. select "session-staff-hooks"
2. in the menu located on the left side select "Storage"
3. click the "forms/" folder
4. use the GUI interface checkboxes to delete any necessary older forms.
5. Click "Upload file" and select the new PDF you're trying to upload
   - PLEASE MAKE SURE YOU'RE UPLOADING ONLY PDF FILES
   - MAKE SURE THE PDF FIELDS ARE FILLABLE
6. Once the file is successfully update, please click the file and a menu will appear on the right.
7. Where it says "Name" on the menu, a link should appear that you can click. Click it.
8. This will open your document with the applicable URL in a new tab in your browser.
9. Copy the URL from the address bar in your browser.
10. Inside the folder structure for the application navigate to the following and open the file:
    - ./src/utils/constants.js
11. on line 226 of constants.js you will find an array of objects titled "formURLs"
12. locate the object of the form you're trying to update
    - example:
      - name: "dd" - is the name property of the Direct Deposit form
      - or you can refer to the printedName property of the object for more details.
13. In the "href" property past the new URL into it. Make sure it's between the quotation marks.
14. Save the file.

# BOILERPLATE REACT INFO BELOW

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
