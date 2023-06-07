<script>
  import { auth, provider } from '$lib/firebaseAuth';
  import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
  // import firebase from '$lib/firebase.js';

  import {user, isLoggedIn, openLoginDiv} from '$lib/stores';

  async function onGoogleLoginBtnClcicked() {
    await signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user)
        $user = result.user
        $isLoggedIn = true
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log('error');
        console.log(errorCode);
        console.log(email);
        console.log(errorMessage);
        console.log(credential);
      })
  }
  async function logOut(){
    signOut(auth)
  }

  onAuthStateChanged(auth,(currUser) => {
    if (currUser) {
      $user = currUser
      $isLoggedIn = true
      
    } else {
      $isLoggedIn = false
      $user = currUser
      // ...
    }
  });

</script>

<div id="dimPage"></div>
<div id="loginWrap">
  <div id="loginHeader">
    <div id="loginTitle">
      로그인 하기
    </div>
    <button id="removeDivBtn" on:click={() => openLoginDiv.set(false)}>&#10005;</button>
  </div>

  <div id="socialLogin">
    <div id="googleLogin" 
      on:click={onGoogleLoginBtnClcicked}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
        <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
          <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
          <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
          <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
          <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
        </g>
      </svg>
      Google 계정으로 로그인
    </div>
    <div id="twitterLogin">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" width="24px" height="24px">
        <g id="surface353699323">
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(1.176471%,66.274512%,95.686275%);fill-opacity:1;" d="M 23.699219 4.480469 C 22.839844 4.859375 21.914062 5.113281 20.9375 5.234375 C 21.929688 4.644531 22.695312 3.707031 23.050781 2.597656 C 22.125 3.140625 21.097656 3.539062 20.003906 3.75 C 19.128906 2.824219 17.882812 2.25 16.5 2.25 C 13.851562 2.25 11.699219 4.378906 11.699219 7.007812 C 11.699219 7.378906 11.742188 7.742188 11.824219 8.09375 C 7.835938 7.894531 4.296875 5.996094 1.929688 3.117188 C 1.515625 3.820312 1.28125 4.644531 1.28125 5.515625 C 1.28125 7.164062 2.125 8.621094 3.414062 9.476562 C 2.628906 9.453125 1.886719 9.234375 1.238281 8.882812 C 1.238281 8.898438 1.238281 8.917969 1.238281 8.9375 C 1.238281 11.246094 2.894531 13.167969 5.089844 13.605469 C 4.6875 13.714844 4.265625 13.777344 3.828125 13.777344 C 3.515625 13.777344 3.214844 13.742188 2.921875 13.6875 C 3.53125 15.574219 5.304688 16.953125 7.40625 16.996094 C 5.761719 18.269531 3.691406 19.03125 1.441406 19.03125 C 1.054688 19.03125 0.671875 19.011719 0.296875 18.964844 C 2.425781 20.3125 4.949219 21.101562 7.660156 21.101562 C 16.488281 21.101562 21.320312 13.847656 21.320312 7.558594 C 21.320312 7.351562 21.3125 7.144531 21.304688 6.945312 C 22.246094 6.277344 23.058594 5.4375 23.699219 4.480469 "/>
        </g>
      </svg>
      Twitter 계정으로 로그인
    </div>
  </div>
</div>

<style>
  #dimPage {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
  }

  #loginWrap {
    width: 80vw;
    height: 40vh;
    position: fixed;
    left: calc(50vw - 40vw);
    top: 20vh;
    background-color: rgba(256, 256, 256, 1);
    margin: 0;
    padding-top: 25px;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
    z-index: 100;
    font-family: Pretendard;
  }
  #loginHeader {
    width: 100%;
    display: flex;
    position: relative;
    justify-content: center;
  }
  #loginTitle {
    font-size: 38px;
  }
  #removeDivBtn {
    width: 30px;
    height: 30px;
    color: #cdcdcd;
    font-size: 22px;
    font-weight: 900;
    background-color: white;
    border: none;
    padding: 0;
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -5px;
    right: 20px;
  }
  #removeDivBtn:hover {
    color: #888;
  }
  #socialLogin {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  #googleLogin, #twitterLogin {
    width: 75vw;
    height: 40px; 
    border: 1px solid #bdb4c0;  
    border-radius: 30px;
    padding: 3px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  #googleLogin:hover, #twitterLogin:hover {
    background-color: #fcf6fe;
    border: 1px solid #f2d7fe;  
    transition-duration: 0.3s;
  }
  #googleLogin svg, #twitterLogin svg{
    margin-right: 20px;
  }
</style>