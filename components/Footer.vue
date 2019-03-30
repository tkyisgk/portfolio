<template lang="pug">
  footer
    ul.snsList
      li.snsList-item
        a(
          class="sns tw"
          href="https://twitter.com/web_des_igner"
          target="_blank"
        )
      li.snsList-item
        a(
          class="sns fb"
          href="https://www.facebook.com/tky.isgk"
          target="_blank"
        )
      li.snsList-item
        a(
          class="sns git"
          href="https://github.com/tkyisgk"
          target="_blank"
        )
      li.snsList-item
        a(
          class="sns fiveHund"
          href="https://500px.com/takuyaishigaki"
          target="_blank"
        )
    small &copy; 2019 TAKUYA ISHIGAKI

</template>

<style lang="scss" scoped>
footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 76px 0;
  width: 100%;
  height: 280px;
  background: rgba(0, 0, 0, .6);
}

.snsList {
  display: flex;
  &-item {
    margin: 0 10px;
    .sns {
      display: block;
      width: 40px;
      height: 30px;
      background-repeat: no-repeat;
      background-position: center;
      transition: transform .4s ease;
      &.tw {
        background-image: url(/assets/img/icon/icon-twitter.svg);
        background-size: 22px auto;
      }
      &.fb {
        background-image: url(/assets/img/icon/icon-facebook.svg);
        background-size: 13px auto;
      }
      &.git {
        background-image: url(/assets/img/icon/icon-github.svg);
        background-size: 24px auto;
      }
      &.fiveHund {
        background-image: url(/assets/img/icon/icon-500px.svg);
        background-size: 40px auto;
      }
      &:hover {
        transform: translateY(-5px);
      }
    }
  }
}

small {
  margin: 42px 0 0;
  font-size: 1.2rem;
  font-family: $accent-font-family;
  letter-spacing: 0.25em;
}

// * -------------------
// * sp layout
// * -------------------

@include mq($breakpoint: sm) {
  footer {
    height: 234px;
  }
}

</style>
