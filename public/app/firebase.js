let firebaseConfig = {
    // enter your firebase credentials here.
    apiKey: "AIzaSyA8DCr2EFoIyQ6qXyXvV2LFWcXOZr496OQ",
    authDomain: "news-blogging-website.firebaseapp.com",
    projectId: "news-blogging-website",
    storageBucket: "news-blogging-website.appspot.com",
    messagingSenderId: "29940418852",
    appId: "1:29940418852:web:eba27760166485a76a4bb1"
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
let auth = firebase.auth();

const logoutUser = () => {
    auth.signOut();
    location.reload();
}