<template>
  <div class="background">
    <div class="container">
      <h1 class="title text-center my-0 pt-5">تماس با ما</h1>
      <p class="subtitle text-center pt-3">
        راه ارتباطی ما فقط از این سه طریق می باشد.
      </p>

      <div class="iconSection">
        <p>
          <a href="https://t.me/AskAryaSomething" class="li-ic"
            >AskAryaSomething@</a
          >
          <i class="fab fa-telegram pr-4 icon"></i>
        </p>
        <p class="pt-1">
          <a href="mailto:info@ask-arya.com" class="fb-ic">info@ask-arya.com</a>
          <i class="fa fa-envelope pr-4 icon"></i>
        </p>
        <p class="pt-1">
          <a href="tel:+989032227796" class="fb-ic">09032227796</a>
          <i class="fa fa-phone pl-4 icon phone-icon"></i>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'اسک آریا | تماس با ما',
    titleTemplate: 'اسک آریا | تماس با ما',

    htmlAttrs: {
      lang: 'fa',
      amp: true,
    },

    meta: [
      // OpenGraph data (Most widely used)
      { property: 'og:title', content: 'اسک آریا' },
      { property: 'og:site_name', content: 'اسک آریا' },
      { property: 'og:type', content: 'website' },
      {
        property: 'og:url',
        content: 'https://www.ask-arya.com/',
      },
      {
        property: 'og:image',
        content:
          'https://www.ask-arya.com/img/Ask Arya LOGO 2019 - 200x200 - OPT.png',
      },
      {
        property: 'og:description',
        content:
          'ما از سريع ترین روش و متد آموزشی استفاده میکنیم که با استانداردهای آموزشی اروپا طراحی شده، تا یادگیری برای شما آسانتر و موثر تر واقع شود.',
      },
      { itemprop: 'name', content: 'اسک آریا' },
      {
        itemprop: 'description',
        content:
          'ما از سريع ترین روش و متد آموزشی استفاده میکنیم که با استانداردهای آموزشی اروپا طراحی شده، تا یادگیری برای شما آسانتر و موثر تر واقع شود.',
      },
    ],
    link: [{ rel: 'canonical', href: 'https://www.ask-arya.com/' }],
  },
};
</script>

<style lang="scss" scoped>
.background {
  background: url(/img/frontend/SVG-Background-4.svg) no-repeat;
  background-size: cover;
  background-position: center;
  height: 90vh;
  position: inherit;
}

.title {
  font-size: 3em;
  font-family: IranSansBold;
  color: rgb(255, 255, 255) !important;
}

.subtitle {
  font-size: 1.2em;
  color: rgb(235, 235, 235) !important;
}

.iconSection {
  padding: 4rem 0;
}

.iconSection a,
.iconSection i,
.iconSection p {
  color: rgb(255, 255, 255) !important;
  padding: 10px 0;
  font-size: 1.5em;
  text-align: left;
}

.phone-icon {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}

.iconSection a:hover {
  color: rgb(251, 255, 0) !important;
}

@media (max-width: 768px) {
  .background {
    background: linear-gradient(225deg, #d223e9f6, #5c6bf7f1);
    height: 80vh;
  }
  .iconSection a,
  .iconSection i,
  .iconSection p {
    font-size: 1.4em;
    text-align: left;
  }
  .subtitle {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.8) !important;
  }
}
</style>
