<template>
  <div class="login" :style="'background-image:url('+ Background +');'">
    <div class="login-register">
      <div class="contain">
        <div class="big-box" :class="{active:isLogin}">
          <div v-if="isLogin" class="big-contain">
            <div class="btitle">账户登录</div>
            <div class="bform">
              <input v-model="form.username" type="username" placeholder="用户名">
              <input v-model="form.password" type="password" placeholder="密码">
            </div>
            <button class="bbutton" @click="login">登录</button>
          </div>
          <div v-else class="big-contain">
            <div class="btitle">创建账户</div>
            <div class="bform">
              <input v-model="form.username" type="text" placeholder="用户名">
              <input v-model="form.password" type="password" placeholder="密码">
              <input v-model="form.phone" type="phone" placeholder="手机号">
              <input v-model="form.email" type="email" placeholder="邮箱">
            </div>
            <button class="bbutton" @click="register">注册</button>
          </div>
        </div>
        <div class="small-box" :class="{active:isLogin}">
          <div v-if="isLogin" class="small-contain">
            <div class="stitle">酷顽音乐</div>
            <p class="scontent">你好朋友</p>
            <button class="sbutton" @click="changeType">注册</button>
          </div>
          <div v-else class="small-contain">
            <div class="stitle">酷顽音乐</div>
            <p class="scontent">欢迎回来</p>
            <button class="sbutton" @click="changeType">登录</button>
          </div>
        </div>
      </div>
    </div>
  </div></template>

<script>
import Background from '@/assets/image/background.jpg'
export default {
  name: 'LoginRegister',
  data() {
    return {
      Background: Background,
      isLogin: true,
      emailError: false,
      passwordError: false,
      existed: false,
      form: {
        username: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    changeType() {
      this.isLogin = !this.isLogin
      this.form.username = ''
      this.form.email = ''
      this.form.password = ''
    },
    login() {
      const self = this
      if (self.form.username === '' || self.form.password === '') {
        this.$msg.notify({
          content: 'username and password can not be empty',
          type: 'error'
        })
      } else {
        this.$store.dispatch('user/login', self.form).then(() => {
          this.$router.push({ path: this.redirect || '/' })
        }).catch(err => {
          this.$msg.notify({
            content: err.data.message,
            type: 'error'
          })
        })
      }
    },
    register() {
      const self = this
      if (self.form.username === '' || self.form.password === '') {
        this.$msg.notify({
          content: 'username and password can not be empty',
          type: 'error'
        })
      } else {
        this.$store.dispatch('user/register', self.form).then(() => {
          this.$router.push({ path: this.redirect || '/' })
        }).catch(err => {
          this.$msg.notify({
            content: err.data.message,
            type: 'error'
          })
        })
      }
    }
  }
}
</script>

<style scoped="scoped">
	.login {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		border: 1px solid black;
        background-size: contain;
        background-position: center;
	}
	.login-register{
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
	}
	.contain{
		opacity: 0.95;
		width: 30%;
		height: 50%;
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		background-color: #e5eeee;
		border-radius: 20px;
		box-shadow: 0 0 3px #dddbdb,
					0 0 6px #dddbdb;
	}
	.big-box{
		width: 70%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 30%;
		transform: translateX(0%);
		transition: all 1s;
	}
	.big-contain{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.btitle{
		font-size: 1.5em;
		font-weight: bold;
		color: rgb(47, 55, 56);
	}
	.bform{
		width: 100%;
		height: 40%;
		padding: 2em 0;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
	.bform .errTips{
		display: block;
		width: 50%;
		text-align: left;
		color: red;
		font-size: 0.7em;
		margin-left: 1em;
	}
	.bform input{
		width: 50%;
		height: 30px;
		border: none;
		outline: none;
		border-radius: 10px;
		padding-left: 2em;
		background-color: #e5eeee;
	}
	.bbutton{
		width: 20%;
		height: 40px;
		border-radius: 24px;
		border: none;
		outline: none;
		background-color: #45585a;
		color: #dddbdb;
		font-size: 0.9em;
		cursor: pointer;
	}
	.small-box{
		width: 30%;
		height: 100%;
		background: linear-gradient(135deg,#45585a,#4b5d5f);
		position: absolute;
		top: 0;
		left: 0;
		transform: translateX(0%);
		transition: all 1s;
		border-top-left-radius: inherit;
		border-bottom-left-radius: inherit;
	}
	.small-contain{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.stitle{
		font-size: 1.5em;
		font-weight: bold;
		color: #dddbdb;
	}
	.scontent{
		font-size: 0.8em;
		color: #dddbdb;
		text-align: center;
		padding: 2em 4em;
		line-height: 1.7em;
	}
	.sbutton{
		width: 60%;
		height: 40px;
		border-radius: 24px;
		border: 1px solid #dddbdb;
		outline: none;
		background-color: transparent;
		color:#dddbdb;
		font-size: 0.9em;
		cursor: pointer;
	}

	.big-box.active{
		left: 0;
		transition: all 0.5s;
	}
	.small-box.active{
		left: 100%;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		border-top-right-radius: inherit;
		border-bottom-right-radius: inherit;
		transform: translateX(-100%);
		transition: all 1s;
	}
</style>
