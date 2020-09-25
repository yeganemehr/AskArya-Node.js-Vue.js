<template>
  <!-- Topbar Section -->
  <div class="d-none d-md-block row py-5">
    <div class="d-flex justify-content-around">
      <router-link class="d" to="/courses">
        <base-button class="animation-on-hover custom-button" type="primary">
          <i class="fas fa-university pl-2"></i> دوره های آموزشی</base-button
        >
      </router-link>

      <router-link class="d" to="/courses">
        <base-button class="animation-on-hover custom-button" type="success">
          <i class="fas fa-headset pl-2"></i> پشتیبانی</base-button
        >
      </router-link>

      <router-link class="d" to="/courses">
        <base-button class="animation-on-hover custom-button" type="warning">
          <i class="fas fa-headset pl-2"></i> کلاس های حضوری
        </base-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.custom-button {
  padding: 3em 8em;
  font-size: 20px;
}
</style>
