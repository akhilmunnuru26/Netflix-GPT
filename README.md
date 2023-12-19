create-react-app
installed tailwind-css
- useRef Hook for reference of email,password,fullName
- created src --> utils --> validate.js in that implemented validation logic
- used regex for email,password,fullName
- created a project in firebase,enable google Analytics and fire base hoisting feature, installed firebase cli using npm given by firebase
- created utils --> firebase.js and added default template in the file
--> npm install -g firebase-tools
--> Firebase Login -> command: firebase login 
--> Intialize Firebase -> command: firebase init and select hosting
-->  in hositing select public directory -> build, hosting to firebase (optionally) github option
--> Firebase Deploy -> command: firebase deploy
--> Implemented Sign up API & logic using firebase
--> IMplemented Sign In API & logic  using firebase
--> Setup the redux store, Created userSlice and added it to store,provided the store to app
--> Updated user's name, built signout button and feature
--> Fetch movies from TMDb 
--> Bug Fix update user name
--> Bug fix routing redirection if login cannot access login page vice versa
--> Implemented Hygiene pratice unsubscribe authonstatechange event listener when the component unmounts
--> Create a utils --> constants.js file and add hardcoded values to the const
--> created an account,registered application in TMDB,in Documentation movie list --> now playing --> called now playing api 
--> created a custom hook folder src --> hooks --> useNowPlayingMovies.js and added fetching logic in it.
--> Always maintain modular coding i,e spliting the code in small junks
--> Added popular,upcoming,top rated movies api's and slices.
--> built toggle feature of searchGpt 
--> Added language constants and language slice to redux store and implemented multilanguagal search bar of GptSearch Bar.




# Features 
- Login page
    -sign in /sign up form
    
    

After Authentication
(Browse - page)
    - Header
    - Main Movie
    --> Trailer in Background
    --> Movie Description with play buttons
    --> Movie Suggestions * N with vertical scrolling

NetflixGPT page
--> Search Bar Page
-->Movie Suggestions

