<script>
  import { auth, provider } from '$lib/firebaseAuth';
  import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
  // import firebase from '$lib/firebase.js';

  import {user, isLoggedIn, openLoginDiv, openLoggedInDiv } from '$lib/stores';

  async function logOut(){
    signOut(auth);
    openLoggedInDiv.set(false);
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
    <div id="loginTitle">회원 정보</div>
    <button id="removeDivBtn" on:click={() => openLoggedInDiv.set(false)}>&#10005;</button>
  </div>
  <div id="loginInfo">
    <div id="profileImg">
      <img src={`${$user.photoURL}`} alt="">
    </div>
    <div id="userName">{$user.displayName}</div>
  </div>
  <div id="logoutBtnWrap" on:click={logOut}>로그아웃</div>

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
  #loginTitle {
    font-size: 7vw;
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
    font-size: 4.5vw
  }
  #loginHeader {
    width: 100%;
    display: flex;
    position: relative;
    justify-content: center;
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
  #loginInfo {
    display: flex;
    gap: 20px;
    align-items: center;
  }
  #profileImg {
    width: 10vw;
    height: 10vw;
  }
  #logoutBtnWrap {
    background-color: #ffb7ae;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1vh 5vw;
    border-radius: 1vw;
  }

</style>