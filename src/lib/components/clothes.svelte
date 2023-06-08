<script>
  import { selectedClothes, openClothes, photoInfoList } from '$lib/stores';
  import { slide, fly, fade } from 'svelte/transition';

  console.log($selectedClothes);
</script>

<!-- <div id="dimPage" transition:fade="{{delay: 0}}"> -->
<div id="dimPage">
  <!-- <div id="title">인식 완료!</div> -->
  <div id="wrap" transition:fly="{{y: '50vh', delay: 300}}">
    <div id="imgWrap">
      <img src={$selectedClothes.photoURL} alt="">
    </div>
    <div id="clothesInfoWrap">
      <div id="clothesColorWrap">
        <div class="clothesInfoTitle">인식된 색상</div>
        <div id="clothesColor">
          <div id="colorDiv" style={`width: 4vh;height:4vh; background-color:${$selectedClothes.photoColor}`}></div>
          <div id="colorText">{$selectedClothes.photoColor}</div>
        </div>
      </div>
      <div id="clothesTextureWrap">
        <div class="clothesInfoTitle">인식된 재질</div>
        <div id="clothesTexture">
          {#each $selectedClothes.photoTexture as texture}
            <span>{texture}</span>
          {/each}
        </div>
      </div>
    </div>

    <div id="btnWrap">
      <div id="cancelBtn" on:click={() => {
        $photoInfoList.pop();
        $photoInfoList = $photoInfoList;
        openClothes.set(false);
      }}>사진 취소하기</div>
      <div id="startBtn" on:click={() => openClothes.set(false)}>사진 등록하기</div>
    </div>

  </div>
</div>

<style>
  #dimPage {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
  }
  #title {
    font-size: 15vw;
    margin-top: 5vh;
    color: white;
  }
  #wrap {
    width: 100vw;
    height: 70vh;
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    border-top-left-radius: 10vw;
    border-top-right-radius: 10vw;
  }
  #imgWrap {
    overflow: hidden;
    border-top-left-radius: 10vw;
    border-top-right-radius: 10vw;
    position: relative;
  }
  #imgWrap img {
    height: 70vh;
    width: 100vw;
  }

  #clothesInfoWrap {
    height: 50vh;
    width: 90vw;
    box-sizing: border-box;
    border-radius: 10vw;
    display: flex;
    justify-content: space-between;
    margin-top: 2vh;
    box-sizing: border-box;
  }
  #clothesColorWrap, #clothesTextureWrap {
    width: 40vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1vh;
    font-family: Pretendard;
    font-weight: 700;
  }
  #clothesColorWrap {
    height: 10vh;
  }
  #clothesTextureWrap {
    height: 20vh;
  }
  #clothesColor, #clothesTexture {
    width: 100%;
    flex: 1;
    border-radius: 5vw;
  }
  #clothesColor {
    border: 3px solid #EDE4FC;
    display: flex;
    align-items: center;
    gap: 4vw;
    padding-left: 4vw;
    box-sizing: border-box;
  }
  #clothesTexture {
    background-color: #EDE4FC;
  }
  #btnWrap {
    border-top: 2px solid #cdcdcd;
    padding-top: 2vh;
    padding-bottom: 2vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    gap: 10vw;
  }

  #cancelBtn, #startBtn {
    height: 7vh;
    width: 35vw;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Pretendard;
    font-weight: 700;
    font-size: 2.2vh;
    border-radius: 1vw;
  }
  #cancelBtn {
    border: 1px solid #40128B;
    color: #40128B;
  }

  #startBtn {
    background-color: #40128B;
    color: white;
  }

</style>