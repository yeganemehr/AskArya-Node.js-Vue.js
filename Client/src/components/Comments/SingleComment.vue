<template>
  <section>
    <div class="card">
      <div class="d-flex align-items-end">
        <b-avatar
          href="/dashboard"
          size="4.2em"
          class="align-center"
        ></b-avatar>

        <h2 class="user-name">
          Arya Doroudian
          <span class="">ارسال دیدگاه </span>
        </h2>
      </div>

      <b-alert show variant="warning">
        <li>دیدگاه شما بعد از تایید در قسمت نظرات نمایش داده خواهد شد.</li>
      </b-alert>

      <b-form-textarea
        id="textarea-rows"
        placeholder="متن مورد نظر خود را وارد کنید ..."
        rows="5"
        class="message-box"
      ></b-form-textarea>

      <div class="pt-4">
        <b-button variant="outline-danger" class="btn">انصراف </b-button>
        <b-button
          @click="$bvToast.show('my-toast')"
          variant="info"
          class="mr-2 btn"
          >ثبت دیدگاه</b-button
        >
      </div>

      <b-toast dir="rtl" id="my-toast" variant="success" solid>
        <template #toast-title>
          <div class="d-flex flex-grow-1 align-items-baseline">
            <i class="fa fa-eye"></i>
          </div>
        </template>
        دیدگاه شما به موفقیت ازسال شد و بعد از تایید در قسمت نظرات نمایش داده
        خواهد شد.
      </b-toast>
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

.user-name {
  font-size: 1.2em;
  text-align: right;
  font-family: IranSansBold;
  margin-right: 1em;

  span {
    display: block;
    font-size: 0.65em;
    color: #707070;
    margin-top: 6px;
  }
}

.alert {
  text-align: right;
  font-size: 0.9em;
  margin-top: 1.2em;

  li {
    padding-bottom: 7px;
  }

  li:last-child {
    padding-bottom: 0 !important;
  }
}

::placeholder {
  font-size: 1em !important;
  padding: 0.9em;
}

.btn {
  font-size: 0.9em;
}

/deep/ .toast {
  font-size: 0.9em !important;
  direction: rtl !important;
  text-align: right !important;
}
</style>
