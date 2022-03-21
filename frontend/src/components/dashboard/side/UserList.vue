<template>
<div class="user-list-container">
  <div class="list">
    <div class="item">
      <img class="image" src="https://randomuser.me/api/portraits/men/40.jpg" />
      <div class="chat-info">
        <div class="name">
          Test İsim
        </div>
        <div class="last-message"> Bu son mesaj</div>
      </div>
      <div class="other-info">
        <div class="time">12:52</div>
        <div class="total-unread-message">
          4
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "UserList"
}
</script>

<style lang="scss" scoped>
.list{
  .item{
    display: flex;
    padding: 15px;
    border-radius: 5px;

    .image{
width: 50px;
      height: 50px;
      border-radius: 100%;
    }

    .chat-info{
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 20px;

      .name{
        font-size: 18px;
      }

      .last-message{
        font-size: 14px;
        color: #616161;
      }
    }
    .other-info{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-color: yellow;
    }
  }
}
</style>