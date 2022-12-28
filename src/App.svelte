<script>
  import i18n from './assets/i18n.json';

  let value = 0;
  const increaseValue = () => {
    value += 1;
  };

  console.log(i18n);
</script>

<button on:click={increaseValue}>You have clicked {value} times.</button>

<style>
  button {
    background-color: lightgreen;
  }
</style>