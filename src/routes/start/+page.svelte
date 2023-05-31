<script>
  let stream = null;

  async function turnOnCamera() {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Do something with the camera stream, e.g., display it in a video element
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  }

  function turnOffCamera() {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      stream = null;
    }
  }
</script>

<main>
  {#if stream}
    <video autoplay={true} on:destroy={turnOffCamera}></video>
  {:else}
    <button on:click={turnOnCamera}>Turn on camera</button>
  {/if}
</main>

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  video {
    max-width: 100%;
    max-height: 100%;
  }
</style>