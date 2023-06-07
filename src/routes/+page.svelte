<script>
  import { user, isLoggedIn, openLoginDiv } from '$lib/stores';
  import Login from '$lib/components/login.svelte';

  const onLoginClick = () => {
    openLoginDiv.set(true);
  }
</script>

<div class="wrap">
  <div id="header" on:click={onLoginClick}>
    로그인
  </div>
  <div id="title">앱 이름</div>
  <a href="/start" id="startBtnAnchor">
    <div id="startBtn">시작</div>
  </a>
  <div id="menuWrap">
    <div class="menuBtn" id="historyBtn">세탁 히스토리</div>
    <div class="menuBtn" id="tipBtn">세탁 팁</div>
  </div>
  {#if $openLoginDiv}
    <Login />
  {/if}
</div>

<style>
  .wrap {
    width: 100vw;
    height: 100vh;
    background-color: #eee;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
  }
  #title {
    margin: 10vh auto;
    color: #555;
    font-size: 10vw;
    font-weight: 500;
  }
  #startBtnAnchor {
    all: unset;
  }
  #startBtn {
    width: 75vw;
    height: 75vw;
    border: 3vw solid white;
    border-radius: 50%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #menuWrap {
    width: 90vw;
    background-color: #ddd;
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
    background-color: white;
    border-radius: 5vw;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #555;
  }
</style>

