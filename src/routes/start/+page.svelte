<script>
  let photoURL = null;
  let test = null;
  let file = null;
  let fileInput = null;
  $: photoURL, test, file, photoInfoList;

  let photoInfoList = [];

  const rgbToHex = (arr) => {
    // Convert each RGB component to a two-digit hexadecimal string
    var hexR = arr[0].toString(16).padStart(2, '0');
    var hexG = arr[1].toString(16).padStart(2, '0');
    var hexB = arr[2].toString(16).padStart(2, '0');
    // Combine the hexadecimal components and return the result
    return '#' + hexR + hexG + hexB;
  }

  const handlePhotoCapture = (event) => {
    console.log(fileInput);
    file = event.target.files[0];
    console.log(URL.createObjectURL(file));
    console.log(file);
    
    if (file) {
      const image = new Image();
      const canvas = document.createElement("canvas");
      const context = canvas.getContext('2d');

      photoURL = URL.createObjectURL(file);

      console.log(photoURL);
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

        photoInfoList.push({
          photoURL: photoURL,
          photoColor: photoColor,
          photoTexture: ["cotton", 'poly']
        })
        photoInfoList = photoInfoList;
      }
    }
  }
</script>

<div class="wrap">
  <div id="startHeader">
    <img src="/arrow/leftArrow.svg" alt="" id="backArrow">
    <div id="title">시작하기</div>
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

      {#each photoInfoList as singlePhoto, i}
        <div class="singleList">
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

  <input type="file" accept="image/*" capture="camera" on:change={handlePhotoCapture} bind:this={fileInput}/>
  <div id="test">test</div>
  <div>{photoURL}</div>
  <div>{file}</div>
  <div>{test}</div>
  <div>{fileInput}</div>
</div>

<style>
  .wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    font-family: 'Roboto';
    font-weight: 600;
  }
  #startHeader {
    display: flex;
    align-items: center;
    width: 100vw;
    height: 5vh;
    padding-left: 3vw;
    gap: 10vw;
  }
  #backArrow {
    height: 3vh;
  }
  #title {
    font-size: 5vw;
  }
  #listComponent {
    width: 100vw;
    height: 90vh;
    display: flex;
    background-color: #EEEEFE;
    box-sizing: border-box;
  }

  #listWrap {
    width: 100%;
    background-color: white;
    margin: 3vw;
    border-radius: 5vw;
    /* box-sizing: border-box; */
    overflow-y: scroll;
  }
  #listTitle {
    font-size: 25px;
    display: flex;
    justify-content: center;
    padding: 10px 0;

    background-color: #372A6E;
    color: white;
    font-family: Pretendard;
    font-weight: 600;
  }

  #listHeader {
    height: 30px;
    display: grid;
    grid-template-columns: 2fr 3fr 9fr 50px;
    border-bottom: 1px solid #524690;
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
</style>