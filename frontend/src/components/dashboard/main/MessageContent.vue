<template>
  <div class="message-content-container">
    <div class="message-list">
      <div class=""></div>
      <div tabindex="1" class="message image receiver">
        <span><img src="https://randomuser.me/api/portraits/men/40.jpg"></span>
        <div class="time">12:51</div>
      </div>
      <div tabindex="1" class="message image receiver">
        <span><img src="https://www.gettyimages.pt/gi-resources/images/Homepage/Hero/PT/PT_hero_42_153645159.jpg"></span>
        <div class="time">12:51</div>
      </div>
      <div tabindex="1" class="message image receiver">
        <span><img src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Eiffel_Tower_Vertical.JPG"></span>
        <div class="time">12:51</div>
      </div>



      <div tabindex="1" class="message text receiver">
        <span>testa sda sdas das dasd asda sa sd</span>
        <div class="time">12:51</div>
      </div>
      <div tabindex="1" class="message text receiver">
        <span>testa sda sdas das dasd asda sasd ada d asda sd</span>
        <div class="time">12:51</div>
      </div>
      <div class="message text receiver">
        <span>testa sda </span>
        <div class="time">12:51</div>
      </div>
      <div tabindex="1" class="message text giver">
        <span>testa sda </span>
        <div class="time">12:51</div>
      </div>
      <div tabindex="1" class="message text receiver">
        <span>testa sda sdas das dasd asda sa sd</span>
        <div class="time">12:51</div>
      </div>
      <div tabindex="1" class="message text receiver">
        <span>testa sda sdas das dasd asda sasd ada d asda sd</span>
        <div class="time">12:51</div>
      </div>
      <div class="message text receiver">
        <span>testa sda </span>
        <div class="time">12:51</div>
      </div>
      <div tabindex="1" class="message text giver">
        <span>testa sda </span>
        <div class="time">12:51</div>
      </div>
      <div tabindex="1" class="message text receiver">
        <span>testa sda sdas das dasd asda sa sd</span>
        <div class="time">12:51</div>
      </div>
      <div tabindex="1" class="message text receiver">
        <span>testa sda sdas das dasd asda sasd ada d asda sd</span>
        <div class="time">12:51</div>
      </div>
      <div class="message text receiver">
        <span>testa sda </span>
        <div class="time">12:51</div>
      </div>
      <div tabindex="1" class="message text giver">
        <span>testa sda </span>
        <div class="time">12:51</div>
      </div>
      <div tabindex="1" class="message text receiver">
        <span>testa sda sdas das dasd asda sa sd</span>
        <div class="time">12:51</div>
      </div>
      <div tabindex="1" class="message text receiver">
        <span>testa sda sdas das dasd asda sasd ada d asda sd</span>
        <div class="time">12:51</div>
      </div>
      <div class="message text receiver">
        <span>testa sda </span>
        <div class="time">12:51</div>
      </div>
      <div tabindex="1" class="message text giver">
        <span>testa sda </span>
        <div class="time">12:51</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageContent'
};
</script>

<style lang="scss" scoped>
.message-content-container {
  height: 100%;

  .message-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow-y: auto;
    padding: 20px;
    height: 500px; //todo:!

    .message {
      padding: 13px;
      margin: 7px 0;
      width: 80%;

      &:focus .time {
        display: block;
      }

      &.text{
        font-size: 14px;
        background-color: white;
      }

      &.image{
        background-size: cover;
      }

      .time {
        text-align: right;
        font-size: 11px;
        color: #5e5e5e;
        margin-top: 5px;
        display: none;
      }

      &.receiver {
        border-radius: 0 20px 20px 20px;
      }

      &.giver {
        border-radius: 20px 0 20px 20px;
        align-self: flex-end;
        background-color: $default-purple;
        color: white;

        .time {
          color: white;
        }
      }
    }
  }
}
</style>
