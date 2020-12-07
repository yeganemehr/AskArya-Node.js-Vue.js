<template>
  <section>
    <div class="card">
      <h2>دسته مقاله</h2>

      <hr class="mt-0 py-2" />
      <form class="text-right">
        <label class="item"
          ><input type="checkbox" /> ایلتس
          <b-badge class="float-left" variant="light">4</b-badge>
        </label>

        <label class="item"
          ><input type="checkbox" /> گرامر
          <b-badge class="float-left" variant="light">4</b-badge>
        </label>

        <label class="item"
          ><input type="checkbox" /> واژگان
          <b-badge class="float-left" variant="light">3</b-badge>
        </label>

        <label class="item"
          ><input type="checkbox" /> اﺻﻄﻼح
          <b-badge class="float-left" variant="light">10</b-badge>
        </label>

        <label class="item"
          ><input type="checkbox" /> مهارت شنیداری
          <b-badge class="float-left" variant="light">8</b-badge>
        </label>

        <label class="item"
          ><input type="checkbox" /> مهارت گفتاری
          <b-badge class="float-left" variant="light">12</b-badge>
        </label>

        <label class="item"
          ><input type="checkbox" /> مهارت خواندن
          <b-badge class="float-left" variant="light">9</b-badge>
        </label>

        <label class="item"
          ><input type="checkbox" /> مهارت نوشتن
          <b-badge class="float-left" variant="light">2</b-badge>
        </label>
      </form>
    </div>
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

/deep/ input[type='checkbox'] {
  margin-left: 0.5em !important;
}

@supports (-webkit-appearance: none) or (-moz-appearance: none) {
  input[type='checkbox'],
  input[type='radio'] {
    --active: #ed4b6f;
    --active-inner: #fff;
    --focus: 2px #ed4b6e17;
    --border: #b4b4b485;
    --border-hover: #ed4b6e94;
    --background: #fff;
    --disabled: #f6f8ff;
    --disabled-inner: #e1e6f9;
    -webkit-appearance: none;
    -moz-appearance: none;
    height: 21px;
    outline: none;
    display: inline-block;
    vertical-align: top;
    position: relative;
    margin: 0;
    cursor: pointer;
    border: 1px solid var(--bc, var(--border));
    background: var(--b, var(--background));
    transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;
    &:after {
      content: '';
      display: block;
      left: 0;
      top: 0;
      position: absolute;
      transition: transform var(--d-t, 0.3s) var(--d-t-e, ease),
        opacity var(--d-o, 0.2s);
    }
    &:checked {
      --b: var(--active);
      --bc: var(--active);
      --d-o: 0.3s;
      --d-t: 0.6s;
      --d-t-e: cubic-bezier(0.2, 0.85, 0.32, 1.2);
    }
    &:hover {
      &:not(:checked) {
        &:not(:disabled) {
          --bc: var(--border-hover);
        }
      }
    }
    &:focus {
      box-shadow: 0 0 0 var(--focus);
    }
    &:not(.switch) {
      width: 21px;
      &:after {
        opacity: var(--o, 0);
      }
      &:checked {
        --o: 1;
      }
    }
  }
  input[type='checkbox'] {
    &:not(.switch) {
      border-radius: 7px;
      &:after {
        width: 5px;
        height: 9px;
        border: 2px solid var(--active-inner);
        border-top: 0;
        border-left: 0;
        left: 7px;
        top: 4px;
        transform: rotate(var(--r, 20deg));
      }
      &:checked {
        --r: 43deg;
      }
    }
  }
}

.badge {
  font-size: 0.85em;
  font-family: IranSans !important;
  border-radius: 10px;
}

// @media all and (max-width: 1000px) and (min-width: 678px) {
//   .card {
//     margin-left: 1.4em !important;
//     margin-right: 1.4em !important;
//   }
// }

// @media (max-width: 680px) {
//   .item {
//     font-size: 0.8em;
//   }
// }
</style>
