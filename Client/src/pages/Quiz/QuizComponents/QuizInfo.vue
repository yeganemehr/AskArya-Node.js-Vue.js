<template>
  <section class="container">
    <div class="row d-flex justify-content-between align-items-center pb-3">
      <p class="quiz-title">زمان آینده استمراری</p>

      <div class="timer">
        <!-- COUNTDOWN TIMER GOES HERE -->
        <h3>01:32</h3>
      </div>
    </div>

    <!-- <div>
      <h3 class="question-number">
        سوال
        <span>1</span> از
        <span>6</span>
      </h3>
    </div>-->

    <div class="progress mt-auto mb-4">
      <!-- PLEASE USE THIS PROGRESS BAR - vue-black-dashboard-pro/documentation/components/progress.html  -->
      <div
        class="progress-bar"
        role="progressbar"
        style="width: 10%;"
        aria-valuenow="10"
        aria-valuemin="0"
        aria-valuemax="100"
      >10%</div>
    </div>

    <!-- <quiz-navigation /> -->
  </section>
</template>

<script>



<style lang="scss" scoped>

</style>
