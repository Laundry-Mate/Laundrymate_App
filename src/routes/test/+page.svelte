<script>
  import {photoInfoList} from '$lib/stores.js';
  import { AccordionItem, Accordion } from 'flowbite-svelte'
  import { onMount } from 'svelte';

  function hexToRGB(hex) {
    // Remove the '#' symbol if present
    hex = hex.replace('#', '');

    // Convert the hex values to decimal
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);

    return { r, g, b };
  }

  function combineVertically(arr) {
    var result = [];
    var subarrayLength = arr[0].length;
    for (var i = 0; i < subarrayLength; i++) {
      var combined = [];
      for (var j = 0; j < arr.length; j++) {
        combined.push(arr[j][i]);
      }
      result.push(combined);
    }
    return result;
  }

  let result = [];
  $: result;
  
  onMount(() => {
    let data = []

    $photoInfoList.forEach((e) => {
      console.log(e);
      data.push({
        fabric_type: e.photoTexture[0],
        r: hexToRGB(e.photoColor).r,
        b: hexToRGB(e.photoColor).b,
        g: hexToRGB(e.photoColor).g,
      })
    })

    console.log(data);

    // Extract the row names from the first object
    const rowNames = Object.keys(data[0]);

    // Convert the array to CSV format with row names
    const csvContent = [rowNames.join(',')].concat(
        data.map(row => rowNames.map(name => row[name]).join(','))
      ).join('\n');

    console.log(csvContent);
    console.log(typeof(csvContent));

    const fetchServer = async () => {
      const response = await fetch('http://localhost:80/double', {
        method: 'POST',
        body: csvContent,
        headers: {
            'content-type': 'application/json'
        }
      });

      result = await response.json();

      const laundryRes = new Array(result.length);
      console.log(laundryRes);

      result.forEach((e, i) => {
        result[i].clothes = [];
        const reMix = combineVertically(e.indices);
        // console.log(reMix);
        // console.log(data);
        reMix.forEach((clothes) => {
          data.forEach((clothesData, clothesIndex) => {
            console.log(clothesData);
            console.log(clothes);
            if (clothesData["fabric_type"] === clothes[0] && clothesData.r === clothes[1] && clothesData.g === clothes[2] && clothesData.b === clothes[3]) {
              console.log('1');
              result[i].clothes.push(clothesIndex);
            }
          })
        })
      })
      console.log(result);
      console.log($photoInfoList);
    }

    fetchServer();
  })

  console.log($photoInfoList);

</script>

<div id="wrap">
  <div id="startHeader">
    <img src="/icon/Logo-hor.png" alt="" id="headerLogo">
  </div>
  <div id="title">결과</div>
  <div id="resultWrap">
    <Accordion>
      {#each result as way, i}
        <AccordionItem>
          <span slot="header">{i + 1}: {way["average_wash_temperature"]}도, 건조: {way["dehydration"] === 'X' ? '' : '약하게'}</span>
          {#each way.clothes as clothe}

            <div class="singleList">
              <div id="elementIndex">{clothe + 1}</div>
              <div id="colorWrap">
                <div id="colorPreview"
                style={`background-color: ${$photoInfoList[clothe].photoColor};`}>

                </div>
              </div>
              <div id="textureWrap">{$photoInfoList[clothe].photoTexture}</div>
              <div id="imageWrap">
                <img src={`${$photoInfoList[clothe].photoURL}`} alt="">
              </div>
            </div>
          {/each}
        </AccordionItem>
      {/each}
    </Accordion>
  </div>
</div>


<style>
  #wrap {
    width: 100vw;
    height: 100vh;
    background-color: #F7F3FE;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #test {
    width: 30vw;
    height: 30vh;
    background-color: aliceblue;
  }
  #title {
    display: flex;
    justify-content: center;
    font-family: Pretendard;
    font-size: 10vw;
    font-weight: 700;
    margin: 4vh 0;
  }

  #resultWrap {
    background-color: white;
    width: 90vw;
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