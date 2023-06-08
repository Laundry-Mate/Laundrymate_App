<script>
  import Clothes from "$lib/components/clothes.svelte";
  import { selectedClothes, openClothes, photoInfoList } from '$lib/stores';


  let photoURL = null;
  let test = null;
  let file = null;
  let fileInput = null;
  $: photoURL, test, file;

  const encodeImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
        resolve(base64String);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }

  const rgbToHex = (arr) => {
    // Convert each RGB component to a two-digit hexadecimal string
    var hexR = arr[0].toString(16).padStart(2, '0');
    var hexG = arr[1].toString(16).padStart(2, '0');
    var hexB = arr[2].toString(16).padStart(2, '0');
    // Combine the hexadecimal components and return the result
    return '#' + hexR + hexG + hexB;
  }

  const handlePhotoCapture = async (event) => {
    console.log(fileInput);
    file = event.target.files[0];
    console.log(URL.createObjectURL(file));
    console.log(file);
    
    if (file) {

      try {
        const base64 = await encodeImageToBase64(file);

        console.log(base64);
        const response = await fetch('/api/ocr', {
            method: 'POST',
            body: JSON.stringify({ base64 }),
            headers: {
                'content-type': 'application/json'
            }
        });

        const total = await response.json();

        console.log(total);
      } catch (e) {
        console.error(e)
      }

      const image = new Image();
      const canvas = document.createElement("canvas");
      const context = canvas.getContext('2d');

      photoURL = URL.createObjectURL(file);


      // console.log(photoURL);
      image.src = photoURL;

      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;

        context.drawImage(image, 0, 0);
        let pixelData = [
          Array.from(context.getImageData(image.width / 2, 0, 1, 1).data).slice(0, 3),
          Array.from(context.getImageData(0, image.height / 2, 1, 1).data).slice(0, 3),
          Array.from(context.getImageData(image.width - 1, image.height / 2, 1, 1).data).slice(0, 3),
          Array.from(context.getImageData(image.width / 2, image.height - 1, 1, 1).data).slice(0, 3),
        ]
        console.log(pixelData);

        pixelData = pixelData.reduce((acc, currentArray) => {
          return acc.map((value, index) => value + currentArray[index]);
        });

        pixelData = pixelData.map(x => Math.round(x / 4));

        console.log(pixelData);
        const photoColor = rgbToHex(pixelData);
        console.log(pixelData);

        const photoInfo = {
          photoURL: photoURL,
          photoColor: photoColor,
          photoTexture: ["cotton", 'poly']
        }

        photoInfoList.update((prev) => ([...prev, photoInfo]))

        selectedClothes.set(photoInfo);
        openClothes.set(true);
      }
    }
  }
</script>

<div class="wrap">
  <div id="startHeader">
    <a href="/">
      <img src="/arrow/leftArrow.svg" alt="" id="backArrow">
    </a>
    <img src="/icon/Logo-hor.png" alt="" id="headerLogo">
  </div>
  <div id="listComponent">
    <div id="listWrap">
      <div id="listTitle">현재 등록된 옷 목록</div>
      <div id="listHeader">
        <div>번호</div>
        <div>색깔</div>
        <div>재질 종류</div>
        <div>이미지</div>
      </div>

      {#each $photoInfoList as singlePhoto, i}
        <div class="singleList" on:click={() => {
          openClothes.set(true);
          selectedClothes.set(singlePhoto);
        }}>
          <div id="elementIndex">{i + 1}</div>
          <div id="colorWrap">
            <div id="colorPreview"
            style={`background-color: ${singlePhoto.photoColor};`}>

            </div>
          </div>
          <div id="textureWrap">{singlePhoto.photoTexture}</div>
          <div id="imageWrap">
            <img src={`${singlePhoto.photoURL}`} alt="">
          </div>
        </div>
      {/each}
    </div>
  </div>

  <div id="bannerContainer">
    <div id="bannerDivWrap">
      <div class="cameraBtn" id="labelCameraWrap">
        <label for="labelCamera">라벨로 옷 인식하기</label>
        <input type="file" id="labelCamera" accept="image/*" capture="camera" on:change={handlePhotoCapture} bind:this={fileInput}/>
      </div>
      <div class="cameraBtn" id="textureCameraWrap">
        <label for="textureCamera">옷감으로 옷 인식하기</label>
        <input type="file" id="textureCamera" accept="image/*" capture="camera" on:change={handlePhotoCapture} bind:this={fileInput}/>
      </div>
      <div class="cameraBtn" id="applyBtn">
        빨래 하기!
        <!-- <label for="textureCamera">옷감으로 옷 인식하기</label>
        <input type="file" id="textureCamera" accept="image/*" capture="camera" on:change={handlePhotoCapture} bind:this={fileInput}/> -->
      </div>
    </div>
  </div>
  {#if $openClothes}
    <Clothes />
  {/if}
</div>

<style>
  .wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    font-family: 'Roboto';
    font-weight: 600;
    background-color: #F7F3FE;
  }

  #startHeader {
    display: flex;
    align-items: center;
    width: 100vw;
    height: 5vh;
    padding-left: 3vw;
    padding-top: 1vh;
    gap: 10vw;
  }
  #backArrow {
    height: 3vh;
  }
  #headerLogo {
    width: 60vw;
    margin-left: 5vw;
  }
  #listComponent {
    width: 100vw;
    height: 90vh;
    display: flex;
    box-sizing: border-box;
  }

  #listWrap {
    width: 100%;
    background-color: white;
    margin: 3vw;
    border-radius: 5vw;
    /* box-sizing: border-box; */
    overflow-y: scroll;
    border: 1px solid #372A6E;
  }
  #listTitle {
    font-size: 25px;
    display: flex;
    justify-content: center;
    padding: 10px 0;

    background-color: #40128B;
    color: white;
    font-family: Pretendard;
    font-weight: 600;
  }

  #listHeader {
    height: 30px;
    display: grid;
    grid-template-columns: 2fr 3fr 9fr 50px;
    border-bottom: 1px solid #40128B;
    font-family: Pretendard;
    font-weight: 700;
  }

  #listHeader div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .singleList {
    height: 60px;
    display: grid;
    grid-template-columns: 2fr 3fr 9fr 50px;
    border-bottom: 1px solid #524690;
  }

  #elementIndex, #imageWrap, #colorWrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #textureWrap {
    display: flex;
    align-items: center;
  }

  #colorPreview {
    width: 30px;
    height: 30px;
    border-radius: 10px;
  }

  #imageWrap img {
    height: 40px;
    border-radius: 10px;
  }
  #bannerContainer {
    width: 100vw;
    height: 15vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #40128B;
    border-top-left-radius: 5vw;
    border-top-right-radius: 5vw;
  }

  #bannerDivWrap {
    width: 100vw;
    overflow: auto;
    display: flex;
    gap: 10vw;
    padding: 0 30vw;
    scroll-snap-type: x mandatory;
  }
  #bannerDivWrap::-webkit-scrollbar {
    display: none;
  }
  .cameraBtn {
    width: 60vw;
    height: 7vh;
    border-radius: 5vh;
    scroll-snap-align: center;
    flex-shrink: 0;
    border: 1px solid #40128B;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Pretendard;
    font-size: 23px;
    font-weight: 800;
    position: relative;
  }
  #labelCameraWrap:after {
    content: '';
    position: absolute;
    top: calc(50% - 1.5vw);
    right: -12vw;
    width: 12vw;
    height: 3vw;
    background-color: white;
  }


  .cameraBtn input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip:rect(0,0,0,0);
    border: 0;

  }
  #applyBtn {
    background-color: #FFE79B;
    color: #40128B;
  }
</style>