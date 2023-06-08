<script>
  import { auth, provider } from '$lib/firebaseAuth';
  import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
  // import firebase from '$lib/firebase.js';

  import {user, isLoggedIn, openLoginDiv} from '$lib/stores';

  async function onGoogleLoginBtnClcicked() {
    console.log('googl');
    await signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user)
        $user = result.user
        $isLoggedIn = true
        openLoginDiv.set(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error(error);
        console.log(errorCode);
        console.log(errorMessage);
        console.log(email);
        console.log(credential);
      })
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
    width: 90vw;
    position: fixed;
    left: calc(50vw - 45vw);
    top: 35vh;
    background-color: rgba(256, 256, 256, 1);
    margin: 0;
    padding-top: 25px;
    padding-bottom: 25px;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
    z-index: 100;
    font-family: Pretendard;
    font-weight: 700;
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