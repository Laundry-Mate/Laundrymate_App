<script>

  let photoURL = null;
  let test = null;
  let file = null;
  let fileInput = null;
  $: photoURL, test, file;

  function handlePhotoCapture(event) {
    console.log(fileInput);
    file = fileInput.current.files[0]
    console.log(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        photoURL = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
</script>

<main>
  {#if photoURL}
    <img src={photoURL} alt="Captured Photo" />
  {:else}
    <input type="file" accept="image/*" capture="camera" onchange={handlePhotoCapture} bind:this={fileInput}/>
    <div id="test">test</div>
  {/if}
  <div>{photoURL}</div>
  <div>{file}</div>
  <div>{test}</div>
  <div>{fileInput}</div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }
  #test {
    width: 10px;
    background-color: #cdcdcd;
  }
</style>