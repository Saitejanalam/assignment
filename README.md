## Auditor Form

1. **Create a new React Native project:**
    ```
    npx @react-native-community/cli init assignment
    ```
    > use the above command to install latest react-native application.

2.  **Make sure you have latest java and Android studio SDK setup:**
    > currently im using openjdk 17.0.12 2024-07-16 

3. **Install packages and dependencies:**

    - To use `SafeAreaView`, install `react-native-safe-area-context`:
      ```
      npm install react-native-safe-area-context
      ```

    - For progress steps, install the following:
      ```
      npm install react-native-progress-steps react-native-svg
      ```
      > `react-native-progress-steps` depends on `react-native-svg`.

    - For Navigations, intall the following:
    ```
    npm install @react-navigation/bottom-tabs @react-navigation/native @react-navigation/stack react-native-reanimated
    ```

    - To use `Local Storage`, install `@react-native-async-storage/async-storage`:
      ```
      npm install @react-native-async-storage/async-storage
      ```

    - To use `Dropdown`, install `@react-native-picker/picker`:
      ```
      npm install @react-native-picker/picker
      ```

    - To use `Rating`, install `react-native-ratings`:
      ```
      npm install react-native-ratings
      ```

    - To use `WebView`, install `react-native-webview`:
      ```
      npm install react-native-webview
      ```

    - To use `Icons`, install `react-native-vector-icons`:
      ```
      npm install react-native-vector-icons
      ```
      > and also add the following code at end of page in android/app/build.gradle: ```apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")```


4. **Run the project on Android:**
    ```
    npm run android
    ```
    > make sure emulator or any android device is connected.

## Folder Structure

    - `App.js`: Main component that starts the whole app.
    - `src`:  This folder is the main container of all the code inside the application.
        - `components`:
            - `common`: common components such as Rating, Options, Comments and Summary.
            - `screens`: Audit Form, Audit History and Privacy Policy.
        - `constants`: Colors to handle the application primary color.
        - `navigation`: Application navigations.
        - `useContext`: userContext such as user and username.
    - `index.js`: Entry point of the application as per React-Native standards.

## Add Generated Icons 
    
    - Add Generated icons in ```app/src/main/res/*```