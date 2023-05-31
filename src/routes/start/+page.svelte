<script>
  let photoURL = null;

  function handlePhotoCapture(event) {
    const file = event.target.files[0];
    
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
    <input type="file" accept="image/*" capture="camera" onchange={handlePhotoCapture} />
  {/if}
</main>

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }
</style>