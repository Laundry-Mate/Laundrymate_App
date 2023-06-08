<script>
  import { user, isLoggedIn, openLoginDiv, selectedClothes, openLoggedInDiv } from '$lib/stores';
  import Login from '$lib/components/login.svelte';
  import { ButtonGroup, Button, GradientButton } from 'flowbite-svelte';
  import { onMount } from 'svelte';
  import LoggedIn from '$lib/components/loggedIn.svelte';


  const onLoginClick = () => {
    if ($isLoggedIn) {
      openLoggedInDiv.set(true);
    } else {
      openLoginDiv.set(true);
    }
  }
  const onSettingClick = () => {

  }
  onMount(() => {
    selectedClothes.set({});
  })
</script>

<div class="wrap">
  <header>
    <!-- <div id="settingBtn" on:click={onSettingClick}>
      <img src="/icon/settings-line-pur.svg" alt="">
    </div> -->

    <div id="loginBtn" on:click={onLoginClick}>
      <img src="/icon/user-fill-pur.svg" alt="">
    </div>

  </header>
  <div id="title">
    <img src="/icon/Logo3.png" alt="">
  </div>
  <div id="startBtnWrap">
    <img src="/icon/laundryMachine.png" alt="" id="mainIcon">
    <!-- <div id="startBtn">
      <a href="/start" id="startBtnAnchor">
        시작
      </a>
    </div> -->
  </div>
  <div id="menuWrap">
    <div class="menuBtn" id="historyBtn">
      <a href="/history"> HISTORY </a>
    </div>
    <div class="menuBtn" id="tipBtn">
      <a href="/start"> START </a>
    </div>
  </div>

  {#if $openLoginDiv}
    <Login />
  {/if}
  {#if $openLoggedInDiv}
    <LoggedIn />
  {/if}
</div>

<style>
  .wrap {
    width: 100vw;
    height: 100vh;
    background-color: #E3D5FA;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    position: relative;
  }
  header {
    width: 100vw;
    display: flex;
    justify-content: end;
    padding: 3vw;
    box-sizing: border-box;
  }
  #settingBtn, #loginBtn {
    width: 15vw;
    height: 15vw;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }
  #loginBtn {
    background-color: white;

  }
  #settingBtn img, #loginBtn img {
    width: 10vw;
  }
  #title {
    margin: 0 auto 5vh;
    color: #555;
  }
  #title img {
    width: 70vw;
  }
  #startBtnWrap {
    width: 100vw;
    height: 50vh;
    position: relative;
  }
  #mainIcon {
    position: absolute;
    width: 100vw;
    left: 0vw;
    opacity: 0.1;
  }

  #startBtn {
    width: 60vw;
    height: 60vw;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    border-radius: 50%;
    top: 13vh;
    left: calc(50vw - 30vw);
    /* background-color: #CD8AFF; */
  }
  #startBtnAnchor {
    all: unset;
    font-size: 7vh;
    font-family: Pretendard;
    font-weight: 600;
    /* color:  */
  }


  #menuWrap {
    width: 90vw;
    /* background-color: #ddd; */
    padding: 5vw;
    box-sizing: border-box;
    position: absolute;
    bottom: 5vh;
    display: flex;
    justify-content: space-between;
  }
  .menuBtn {
    width: 35vw;
    height: 7vh;
    border: 2px solid #40128B;
    border-radius: 5vw;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #40128B;
    font-family: Archivo Black;
    font-size: 4vw;
    letter-spacing: 0.5vw;
  }
</style>

