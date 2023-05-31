<script>
  let image = null;

  async function takePhoto() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoElement = document.createElement('video');
      videoElement.srcObject = stream;
      await videoElement.play();

      const canvas = document.createElement('canvas');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      canvas.getContext('2d').drawImage(videoElement, 0, 0, canvas.width, canvas.height);

      const photoURL = canvas.toDataURL('image/png');
      image = photoURL;
      
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  }
</script>

<main>
  {#if image}
    <img src={image} alt="Captured Photo" />
  {:else}
    <button on:click={takePhoto}>Take photo</button>
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