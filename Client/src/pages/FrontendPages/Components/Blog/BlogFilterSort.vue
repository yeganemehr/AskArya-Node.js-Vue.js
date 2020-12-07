<template>
  <section class="card">
    <h2>مرتب‌سازی بر اساس</h2>

    <hr class="mt-0 py-2" />
    <form class="text-right">
      <label class="item d-flex align-items-center"
        ><input type="radio" class="radio" /> جدید‌ترین
      </label>

      <label class="item d-flex align-items-center"
        ><input type="radio" /> قدیمی‌ترین
      </label>

      <label class="item d-flex align-items-center"
        ><input type="radio" /> پربازدیدترین
      </label>
    </form>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.card {
  padding: 2em;
}

h2 {
  text-align: right;
  font-size: 1.2em;
  font-family: IranSansBold;
}

.item {
  font-size: 0.9em;
  width: 100%;
  padding-bottom: 8px;
  padding-right: 0.4em;
}

/deep/ input[type='radio'] {
  margin-left: 0.5em !important;
  width: 1.2em;
  height: 1.2em;
}
</style>
