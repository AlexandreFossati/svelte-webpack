<script>
  let value = 0;
  const increaseValue = () => {
    value += 1;
  };
</script>

<button on:click={increaseValue}>You have clicked {value} times.</button>

<style>
  button {
    background-color: lightgreen;
  }
</style>