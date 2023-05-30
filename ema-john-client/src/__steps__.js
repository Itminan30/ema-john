/**
 * Hosting in Firebase:
 * --------------------
 * Do only once in a pc:
 * 1. npm install -g firebase-tools
 * 2. firebase login
 * ---------------------
 * For Each Project:
 * 1. firebase init
 * 2. select "Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys"
 * 3. if a firebase project exist for the working project then select "Use an existing project" and select the firebase project
 * 4. Ans the qustion: "What do you wand to use as your pulic directory?": if using vite the ans will be: dist, in case of using create-react-app
 *    the ans will be: build
 * 5. "Configure as a single-page app?" ans will be: y
 * 6. "set up automatic bulds and deploys with GitHub?" ans will be: n
 * 7. "file dist/index.html already exists. Overwrite?" ans will be: y
 * ----------------------
 * For every time deploy:
 * 1. npm run build
 * 2. firebase deploy
 * **/ 