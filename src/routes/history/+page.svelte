<script>
  import { AccordionItem, Accordion } from 'flowbite-svelte'
  const exist = true;

</script>


<div class="wrap">
  <div id="historyHeader">
    <a href="/">
      <img src="/arrow/leftArrow.svg" alt="" id="backArrow">
    </a>
    <img src="/icon/Logo-hor.png" alt="" id="headerLogo">
  </div>
  <div id="historyTitle">Laundry History</div>
  <div id="historyMainWrap">
    {#if exist}
      <Accordion>
        <AccordionItem>
          <span slot="header" class="text-base flex gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"/></svg>
            <span> My Header 1</span>
          </span>
          <p class="mb-2 text-gray-500 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sint explicabo...</p>
          <p class="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a href="/" target="_blank" rel="noreferrer" class="text-blue-600 dark:text-blue-500 hover:underline">get started</a> and start  websites even faster with components on top of Tailwind CSS.</p>
        </AccordionItem>
        <AccordionItem>
          <span slot="header" class="text-base flex gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"/></svg>
            <span> My Header 2</span>
          </span>
          <p class="mb-2 text-gray-500 dark:text-gray-400"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sintexplicabo...</p>
        </AccordionItem>
      </Accordion>
    {:else}
      <div id="noHistoryWrap">
        <div>세탁 히스토리가 없습니다!</div>
        <div id="startLaundryBtn">
          <a href="/start">
            세탁 하러가기
          </a>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2vh;
    height: 100vh;
    font-family: 'Roboto';
    font-weight: 600;
    background-color: #F7F3FE;
    padding-bottom: 5vw;
  }

  #historyHeader {
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
  #historyTitle {
    font-size: 6vw;
    color: #40128B;
  }
  #historyMainWrap {
    width: 90vw;
    flex: 1;
    background-color: white;
  }
  #noHistoryWrap {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 6vw;
    font-family: Pretendard;
    font-weight: 700;
    color: #40128B;
    gap: 1vh;
  }
  #startLaundryBtn {
    background-color: #CFB7F6;
    padding: 1vh 3vw;
    font-size: 4vw;
    color: black;
    border-radius: 2vw;
  }
</style>